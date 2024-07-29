
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useEssentials, getCookie, useToast } from '../../Functions/CommonFunctions';
import { Video } from '../../Store/UserStore/Video-Management/Interfaces';
import { getVideo } from '../../Store/UserStore/Video-Management/VideoSlice';
import { setUser } from '../../Store/UserStore/Authentication/AuthSlice';
import { Comments } from '../../Store/UserStore/CommonManagements/interfaces';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import Player from 'video.js/dist/types/player';
import config from '../../Configs/config';


export const useVideoPlayer = () => {
    const { VideoLink } = useParams();
    const { navigate, dispatch, video } = useEssentials();
    const { loadingVideo } = video;
    const [videoData, setVideoData] = useState<Video | null>(null);
    const [comments, setComments] = useState<Comments[]>([]);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const playerRef = useRef<Player | null>(null)
    const [dialog,setDialog] = useState(false)

    useEffect(() => {
        const token: string | undefined = getCookie('token');
        if (!token) navigate("/login");
        if (!VideoLink) navigate("/videos");
        if (token && VideoLink) {
            dispatch(getVideo({ token, VideoLink })).then((response: any) => {
                console.log(response)
                if (!response.payload.user) navigate("/login");
                if (!response.payload.Video) {
                    useToast("No Video Found", "error");
                    navigate("/videos");
                }
                dispatch(setUser(response.payload.user));
                setVideoData(response.payload.Video);

                if (videoRef.current) {
                    const player = videojs(videoRef.current, {
                        controls: true,
                        autoplay: true,
                        fluid: true,
                        liveui: true,
                        preload:true,
                        sources: [{
                            src: `${config.SERVER}/videos/${response.payload.Video.Key}/index.m3u8`,
                            type: 'application/x-mpegURL',
                        }],
                    });
                    // player.addClass("aspect-video")
                    playerRef.current = player
                    return () => {
                        player.dispose();
                    };
                }
            });
        } else navigate("/login");
    }, [VideoLink, navigate, dispatch]);
    const handlePlayerClick = (event: React.KeyboardEvent) => {
        event.preventDefault()
        const time = playerRef.current?.currentTime()
        if (time && playerRef.current) {
            if (event.code === 'ArrowRight') {
                playerRef.current.currentTime(time + 10)
            } else if (event.code === 'ArrowLeft') {
                playerRef.current.currentTime(time - 10)
            } else if (event.code === 'Space' || event.code === 'K') {
                playerRef.current.paused() ? playerRef.current.play() : playerRef.current.pause()
            }
        }
    }
    return { videoRef, playerRef, loadingVideo, comments, setComments, videoData,handlePlayerClick,dialog,setDialog }
}