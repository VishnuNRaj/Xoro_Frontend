import { SetStateAction, useEffect, useRef, useState } from "react";
// import { useSocket } from "../../Socket"
import { toast } from "sonner";
import config from "../../Configs/config";
import { io, Socket } from "socket.io-client";
import { getCookie, useEssentials } from "../../Functions/CommonFunctions";
import { createLive, getLiveVideo, getLiveVideos } from "../../Store/UserStore/CommonManagements/CommonService";
import { Comments, LiveInterface } from "../../Store/UserStore/CommonManagements/interfaces";
import { AuthUser, setUser } from "../../Store/UserStore/Authentication/AuthSlice";
import { useSocket } from "../../Socket";
import { useParams } from "react-router-dom";
import videojs from "video.js";
import Player from "video.js/dist/types/player";


export interface createLive {
    Caption: string;
    RelatedTags: string;
    Thumbnail: File | null;
    Description: string;
    Restriction: number;
    Tags: string;
    tags: string[];
}

export const useCreateLive = ({ setLive }: { setLive: React.Dispatch<SetStateAction<createLive>> }) => {
    const [data, setData] = useState<createLive>({
        Caption: "",
        Description: "",
        RelatedTags: "",
        Restriction: 14,
        Thumbnail: null,
        Tags: "",
        tags: []
    })
    const inputRef = useRef<HTMLInputElement | null>(null)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length > 0 && files[0].type.startsWith("image/")) {
            setData({ ...data, Thumbnail: files[0] })
        } else toast.error("Select an Image as Thumbnail")
    }
    const handleSubmit = () => {
        if (data && data.Thumbnail) {
            setLive(data)
        } else {
            toast.error("Invalid Credentials");
        }
    }
    const handleRelated = (name: string) => {
        setData({ ...data, RelatedTags: name })
    }
    const handleRestriction = (value: number) => {
        setData({ ...data, Restriction: value })
    }
    const setTagUsers = () => {
        if (!data.Tags.startsWith('#') || data.Tags.length < 2 || data.Tags[1] === '#') return;
        const tag = data.Tags.split('#')[1];
        setData({ ...data, tags: [...data.tags, tag], Tags: "" });
    };
    const handleTagsRemove = (idx: number) => {
        setData({ ...data, tags: [...data.tags].filter((_val, index) => index !== idx) })
    }
    return { handleChange, handleSubmit, handleFile, data, handleRelated, handleRestriction, handleTagsRemove, inputRef, setTagUsers }
}

export const useLive = () => {
    const [stream, setStream] = useState<MediaStream | null>(null);
    const { navigate, dispatch } = useEssentials()
    const [liveStream, setLiveStream] = useState<LiveInterface | null>(null)
    const socketRef = useRef<Socket | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const token = getCookie('token');
        if (token) {
            setLoading(true)
            dispatch(AuthUser({ token })).then((state: any) => {
                if (!state.payload.user) {
                    navigate('/login');
                } else setLoading(false)
            });
        } else navigate("/login")
    }, [])
    const [live, setLive] = useState<createLive>({
        Caption: "",
        Description: "",
        RelatedTags: "",
        Restriction: 14,
        Thumbnail: null,
        Tags: "",
        tags: []
    })
    const [started, setStarted] = useState(false)
    const startLive = (streamKey: string) => {
        if (!stream) return;
        socketRef.current?.emit('start-stream', { streamKey });
        setStarted(true)
        mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9' });
        mediaRecorderRef.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
                const reader = new FileReader();
                reader.onload = () => {
                    const arrayBuffer = reader.result as ArrayBuffer;
                    socketRef.current?.emit('stream-data', { streamKey, data: arrayBuffer });
                };
                reader.readAsArrayBuffer(event.data);
            }
        };
        mediaRecorderRef.current.start(500);
    };

    const stopLive = (streamKey: string) => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        socketRef.current?.emit('end-stream', { streamKey });
        setStarted(false)
    };
    const [state, setState] = useState(false)
    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            console.log('Camera stream started');
            setStream(mediaStream);
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    const startScreenShare = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
            console.log('Screen share stream started');
            setStream(mediaStream);
        } catch (error) {
            console.error('Error accessing screen:', error);
        }
    };
    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        if (stream && videoRef.current) {
            console.log('Setting video stream to video element');
            videoRef.current.srcObject = stream;
        }
    }, [stream]);
    useEffect(() => {
        socketRef.current = io(config.SOCKET);
        return () => {
            socketRef.current?.disconnect();
        };
    }, []);
    useEffect(() => {
        if (started) {
            setLoading(false)
            toast.success("Streaming Currently Active", {
                duration: 1500
            })
        } else if (!started && liveStream) {
            setLiveStream(null)
            setLive({
                Caption: "",
                Description: "",
                RelatedTags: "",
                Restriction: 14,
                Thumbnail: null,
                Tags: "",
                tags: []
            })
            toast.success("Live Stream Completed")
        }
    }, [started])
    const sendData = async () => {
        const token: string | undefined = getCookie("token")
        const { Caption, Description, RelatedTags, Restriction, Thumbnail, tags } = live
        if (token && Thumbnail) {
            setLoading(true)
            const response: any = await createLive({ Caption, Description, RelatedTags, Restriction, Thumbnail, Hashtags: tags, token })
            console.log(response)
            if (response.status === 202) return navigate("/login")
            if (response.live) {
                setLiveStream(response.live)
                return response.live.Key
            } else {
                toast.warning(response.message)
                return null;
            }
        }
    }
    return { live, setLive, state, sendData, loading, setState, stream, startScreenShare, startCamera, videoRef, startLive, stopLive, started, liveStream }
}

export const useViewLive = () => {
    const [live, setLive] = useState<LiveInterface | null>(null)
    const [loading, setLoading] = useState(true)
    const socket = useSocket()
    const [comments, setComments] = useState<Comments[]>([])
    const { navigate, dispatch, auth } = useEssentials()
    const { key } = useParams()
    const getVideo = async (token: string, key: string) => {
        const response = await getLiveVideo({ token, key })
        if (!response.user) navigate("/login")
        if (!response.live) {
            toast.error(response.message)
            navigate("/live")
        }
        dispatch(setUser(response.user))
        setLive(response.live)
        setSubs(response.live.channel[0].Subsribers.length)
        setLoading(false)
    }
    const [subscribe, setSubscribe] = useState(false)
    const handleSubscribe = () => {
        if (auth.user && live) {
            socket?.emit("subscribeChannel", auth.user._id, live.channel[0]._id)
            setSubs(prev => prev + 1)
            return setSubscribe(true)
        } else return
    }
    const handleUnsubscribe = () => {
        if (auth.user && live) {
            socket?.emit("unsubscribeChannel", auth.user._id, live.channel[0]._id)
            setSubs(prev => prev - 1)
            return setSubscribe(false)
        } else return
    }
    // const [viewer, setViewerCount] = useState(0)
    const [subs, setSubs] = useState(0)
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const playerRef = useRef<Player | null>(null)
    useEffect(() => {
        const token = getCookie("token")
        if (token && key) {
            getVideo(token, key)
        } else if (!key) {
            toast.error("No Live Stream Found")
            return navigate("/live")
        } else navigate("/login");
    }, [key])
    useEffect(() => {
        if (live && videoRef.current) {
            const player = videojs(videoRef.current, {
                controls: true,
                autoplay: true,
                fluid: true,
                liveui: true,
                preload: 'auto',
                controlBar: {
                    playToggle: true,
                    volumePanel: { inline: true },
                    currentTimeDisplay: true,
                    timeDivider: true,
                    durationDisplay: true,
                    progressControl: true,
                    liveDisplay: true,
                    seekToLive: true,
                    remainingTimeDisplay: true,
                    customControlSpacer: true,
                    playbackRateMenuButton: true,
                    chaptersButton: true,
                    descriptionsButton: true,
                    subsCapsButton: true,
                    audioTrackButton: true,
                    pictureInPictureToggle: true,
                    fullscreenToggle: true,
                },
            });
            player.aspectRatio("16:9")
            playerRef.current = player
            playerRef.current.src(`${config.SERVER}/live/${key}/index.m3u8`)
            player.fill(true)
            return () => {
                player.dispose();
            };;
        }
    }, [live])
    useEffect(() => {
        if (socket && live) {
            socket?.emit("join", live._id)
        }
    }, [live, socket])
    return { live, socket, comments, setComments, loading, videoRef, subs, setSubs, subscribe, handleSubscribe, handleUnsubscribe }
}

export const useLiveVideos = () => {
    const [videos, setVideos] = useState<LiveInterface[]>([])
    const [isLive, setisLive] = useState(true)
    const { navigate, auth, dispatch } = useEssentials()
    const [cat, setCat] = useState<string>("")
    const totalRef = useRef<number | null>(null)
    const handleLive = (live: boolean) => {
        setisLive(live)
    }
    const getLive = async (token: string, videos: LiveInterface[]) => {
        try {
            if (!totalRef.current || totalRef.current < videos.length) {
                const ids = videos.length > 0 ? videos.map((val) => val._id) : [];
                const response = await getLiveVideos({ token, isLive, type: cat, videos: ids });
                console.log(response);
                if (!response.user) {
                    navigate("/login");
                    return;
                }
                if (!auth.user) {
                    dispatch(setUser(response.user));
                }
                totalRef.current = response.count;
                setVideos([...videos, ...response.live].filter((val, idx, arr) => arr.indexOf(val) === idx));
            } else toast.warning("No More Videos")
        } catch (error) {
            console.error('Error fetching live videos:', error);
        }
    };

    useEffect(() => {
        const token = getCookie("token");
        if (token) {
            totalRef.current = null
            getLive(token, []);
        }
        else navigate("/login")
    }, [isLive, cat])
    return { cat, videos, setCat, isLive, handleLive }
}

export const useLiveGrid = ({ video }: { video: LiveInterface }) => {
    const [state, setState] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);
    const { navigate } = useEssentials();
    const videoRef = useRef<HTMLVideoElement | null>(null);


    useEffect(() => {
        const videoSource = video.Completed
            ? video.Video
            : `${config.SERVER}/live/${video.Key}/index.m3u8`;
        if (videoRef.current) {
            const player = videojs(videoRef.current, {
                controls: true,
                autoplay: true,
                preload: 'auto',
                sources: [{
                    src: videoSource,
                    type: 'application/x-mpegURL'
                }]
            });

            player.on('canplaythrough', () => {
                setIsLoading(false);
            });

            return () => {
                if (player) {
                    player.dispose();
                }
            };
        }
    }, [video]);

    return { state, isLoading, videoRef, navigate, setState };
}