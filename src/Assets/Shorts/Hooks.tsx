import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { getCookie, useEssentials } from '../../Functions/CommonFunctions';
import { getShorts, getShortsVideo, uploadShorts } from '../../Store/UserStore/Shorts-Management/shortSlice';
import { useLocation, useParams } from 'react-router-dom';
import { Shorts } from '../../Store/UserStore/Shorts-Management/interfaces';
import { setUser } from '../../Store/UserStore/Authentication/AuthSlice';
import { Comments } from '../../Store/UserStore/CommonManagements/interfaces';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import config from '../../Configs/config';
import useWindowDimensions from '../../Other/Hooks';
import { useFunctions } from '../UserHome/Hooks';
import { useSocket } from '../../Socket';

export const useUploadShorts = () => {
  const [video, setVideo] = useState<File | null>(null);
  const { dispatch, navigate, shorts } = useEssentials()
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [search, setSearch] = useState("")
  const [data, setData] = useState<{ Caption: string; Tags: string; Context: string }>({
    Caption: '',
    Tags: '',
    Context: '',
  });
  const [tags, setTags] = useState<string[]>([]);
  const clear = (trim: any) => {
    setData({ Caption: '', Context: '', Tags: '' });
    setTags([]);
    setVideo(null);
    setSearch("")
    trim(null)
  };

  const selectVideo = (e: React.ChangeEvent<HTMLInputElement>, setTrim: any) => {
    const { files } = e.target;
    if (files && files.length > 0 && files[0].type.startsWith('video/')) {
      setVideo(files[0]);
      setTrim(files[0])
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const setTagUsers = () => {
    if (!data.Tags.startsWith('#') || data.Tags.length < 2 || data.Tags[1] === '#') return;
    const tag = data.Tags.split('#')[1];
    setTags([...tags, tag]);
    setData({ ...data, Tags: '' });
  };

  const handleContext = (name: string) => {
    setData({ ...data, Context: name })
  }

  const handleUpload = (trim: File, set: any) => {
    if (!trim) return toast.error("Select a Video To Upload");
    const token: string | undefined = getCookie("token")
    if (token) {
      dispatch(uploadShorts({ Caption: data.Caption, Context: data.Context, CommentsOn: true, Private: false, Shorts: trim, Hashtags: tags, token })).then(({ payload }: any) => {
        if (payload.status === 202) return navigate("/login");
        toast[payload.status === 200 ? "success" : "error"](payload.message)
        payload.status === 200 && clear(set)
      })

    }
  };

  const handleRemoveTags = (i: number) => {
    setTags([...tags].filter((_val, idx) => idx !== i))
  }

  return { video, selectVideo, clear, data, inputRef, handleChange, handleContext, setTagUsers, handleUpload, search, setSearch, tags, handleRemoveTags, loading: shorts.loadingShorts };
};

export const useShorts = () => {
  const [shorts, setShorts] = useState<string[]>([]);
  const [video, setVideo] = useState<Shorts | null>(null);
  const [total, setTotal] = useState(0);
  const { dispatch, navigate, auth } = useEssentials();
  const location = useLocation();
  const { id } = useParams();

  const getMoreShorts = async (token: string) => {
    if (total === 0 || total !== shorts.length) {
      try {
        const { payload }: any = await dispatch(getShorts({ shorts, token }));
        if (!payload.user) return navigate("/login");
        if (!auth.user) dispatch(setUser(payload.user));
        setTotal(payload.total);
        const array = payload.shorts.filter((val: string) => !shorts.includes(val));
        if (!id) {
          if (array.length === 0) {
            return;
          }
          console.log(array)
          navigate(`/shorts/${array[0]}`)
        }
        setShorts((prevShorts) => [...prevShorts, ...array]);
      } catch (error) {
        console.error(error);
      }
    } else {
      toast.warning("All Shorts Seen");
    }
  };

  const getVideo = async (token: string, id: string) => {
    try {
      const { payload }: any = await dispatch(getShortsVideo({ token, id }));
      if (!payload.user) return navigate("/login");
      if (!auth.user) dispatch(setUser(payload.user));
      if (!payload.shorts) {
        toast.error(payload.message);
        navigate("/shorts");
        return;
      }
      setShorts((prevShorts) => [...prevShorts, id].filter((value, idx, arr) => arr.indexOf(value) === idx));
      setVideo(payload.shorts);
      if (location.pathname !== "/shorts") {
        navigate(`/shorts/${id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      if (id) {
        getVideo(token, id);
      } else {
        getMoreShorts(token);
      }
    } else {
      navigate("/login");
    }
  }, [id]);

  return { shorts, video, getMoreShorts, id };
};

export const useShortsComponent = ({ video, shorts, id, getMoreShorts }: { video: Shorts | null, shorts: string[], id: string | undefined; getMoreShorts: any }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [dialog, setDialog] = useState(false)
  const { navigate, auth } = useEssentials();
  // const previousScrollTop = useRef(0);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (videoRef.current && video) {
      if (playerRef.current) {
        playerRef.current.src({ src: `${config.SERVER}/shorts/${video?.Key}/index.m3u8`, type: 'application/x-mpegURL' });
        playerRef.current.fill(true)
      } else {
        const player = videojs(videoRef.current, {
          controls: true,
          autoplay: true,
          fluid: true,
          liveui: true,
          loop: true,
          preload: 'auto',
          controlBar: {
            playToggle: false,
            volumePanel: false,
            currentTimeDisplay: false,
            timeDivider: true,
            durationDisplay: true,
            progressControl: true,
            liveDisplay: false,
            seekToLive: false,
            remainingTimeDisplay: false,
            customControlSpacer: true,
            playbackRateMenuButton: true,
            chaptersButton: false,
            descriptionsButton: false,
            subsCapsButton: true,
            audioTrackButton: false,
            pictureInPictureToggle: false,
            fullscreenToggle: false,
          },
        });
        player.aspectRatio("9:16");
        player.fill(true)
        playerRef.current = player;
        player.src({
          src: `${config.SERVER}/shorts/${video?.Key}/index.m3u8`,
          type: 'application/x-mpegURL'
        })
      }
    }
    if (video && auth.user) {
      setSubscribe(video.channel.Subsribers.includes(auth.user._id))
      setSubs(video.channel.Subsribers.length)
    }
  }, [video]);

  const handleKeyDown = (e: KeyboardEvent | React.KeyboardEvent) => {
    if (e.code === "ArrowDown" || e.code === "ArrowUp") {
      const currentIndex = shorts.indexOf(id || "");
      if (e.code === "ArrowDown" && currentIndex < shorts.length - 1) {
        navigate(`/shorts/${shorts[currentIndex + 1]}`);
      } else if (e.code === "ArrowUp" && currentIndex > 0) {
        navigate(`/shorts/${shorts[currentIndex - 1]}`);
      } else if (e.code === "ArrowDown" && currentIndex === shorts.length - 1) {
        const token = getCookie("token");
        if (token) getMoreShorts(token);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [shorts, id]);
  useEffect(() => {
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [video, shorts]);
  const touchStartY = useRef(0);
  const handleTouchStart = (e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = async (e: TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const currentIndex = shorts.indexOf(id || "");
    if (touchStartY.current - touchEndY > 100) {
      if (shorts[currentIndex + 1]) navigate(`/shorts/${shorts[currentIndex + 1]}`)
      const token = getCookie("token")
      if (token) await getMoreShorts(token)
    } else if (touchEndY - touchStartY.current > 100) {
      if (currentIndex === 0) return;
      else if (shorts[currentIndex - 1]) navigate(`/shorts/${shorts[currentIndex + 1]}`)
    }
  };
  const [subs, setSubs] = useState(0)

  const [comments, setComments] = useState<Comments[]>([]);
  const socket = useSocket()
  const [subscribe, setSubscribe] = useState(false)
  const handleSubscribe = () => {
    if (auth.user && video) {
      socket?.emit("subscribeChannel", auth.user._id, video.channel._id)
      setSubs(prev => prev + 1)
      return setSubscribe(true)
    } else return
  }
  const handleUnsubscribe = () => {
    if (auth.user && video) {
      socket?.emit("unsubscribeChannel", auth.user._id, video.channel._id)
      setSubs(prev => prev - 1)
      return setSubscribe(false)
    } else return
  }
  const handleScroll = (e: React.MouseEvent<HTMLDivElement>) => {
    // const currentScrollTop = (e.currentTarget as HTMLDivElement).scrollTop;
    console.log(e)
    alert(1)
    // if (currentScrollTop > previousScrollTop.current) {
    //   // setScrollDirection('down');
    // } else {
    //   alert(2)
    //   // setScrollDirection('up');
    // }
    // previousScrollTop.current = currentScrollTop;
  };

  return { comments, setComments, videoRef, handleKeyDown, handleScroll, dialog, setDialog, subs, subscribe, handleSubscribe, handleUnsubscribe };
};

export const useReactions = ({ comment, post }: { comment: number, post: Shorts }) => {
  const { dislikePost, likePost, removeReaction } = useFunctions({ base: "shorts" })
  const { auth } = useEssentials()
  useEffect(() => {
    setCount({ like: post.reactions[0].Likes.length, dislike: post.reactions[0].Dislikes.length, comment: comment })
    setLike(auth.user?._id ? post.reactions[0].Likes.includes(auth.user._id) : false)
    setDisLike(auth.user?._id ? post.reactions[0].Dislikes.includes(auth.user._id) : false)
  }, [comment])
  const { width } = useWindowDimensions()
  const [count, setCount] = useState<{ like: number, dislike: number, comment: number }>({
    comment: 0,
    dislike: 0,
    like: 0
  })
  const [like, setLike] = useState<boolean>(false)
  const [dislike, setDisLike] = useState<boolean>(false)

  return { width, like, dislike, setLike, setDisLike, dislikePost, likePost, removeReaction, count, setCount }
}

