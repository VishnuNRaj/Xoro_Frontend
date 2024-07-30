import React, { useState, useRef, useEffect } from 'react';
import { Video } from '../../Store/UserStore/Video-Management/Interfaces';
import { useEssentials } from '../../Functions/CommonFunctions';
import ChatLoader from '../Chat/ChatLoader';
import { AnimatePresence, motion } from "framer-motion";

interface Props {
    video: Video;
}

const VideoFile: React.FC<Props> = ({ video }) => {
    const [state, setState] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);
    const [duration, setDuration] = useState<string>("");
    const [watching, setWatching] = useState<number>(0);
    const { navigate } = useEssentials();

    const videoRef = useRef<HTMLVideoElement | null>(null);

    const handleCanPlayThrough = async () => {
        setIsLoading(false);
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const currentTime = videoRef.current.currentTime;
            const duration = videoRef.current.duration;
            setWatching((currentTime / duration) * 100);
        }
    };

    const formatDuration = (seconds: number): string => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        const formatted = [
            hrs > 0 ? `${hrs}h` : '',
            mins > 0 ? `${mins}m` : '',
            secs > 0 ? `${secs}s` : ''
        ].filter(Boolean).join(' ');
        return formatted;
    };

    useEffect(() => {
        if (video.Duration) {
            setDuration(formatDuration(parseFloat(video.Duration)));
        }
    }, [video.Duration]);

    return (
        <AnimatePresence>
            <motion.div
                className="relative group block p-2 h-full w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className="flex bg-gray-800 flex-col rounded-md w-full h-full" onClick={() => navigate(`/videos/${video.VideoLink}`)}>
                    <video className='w-full' src={video.Video} ref={videoRef} hidden></video>
                    <div className='rounded-md bg-gray-800 relative' onMouseOver={() => setState(true)} onMouseOut={() => setState(false)}>
                        {!state ? (
                            <img
                                className="w-full rounded-t-md object-cover aspect-video"
                                src={video.Thumbnail}
                                alt="video_thumbnail"
                            />
                        ) : (
                            <div className='relative aspect-video'>
                                {isLoading && (
                                    <div className='absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
                                        <ChatLoader />
                                    </div>
                                )}
                                <video
                                    ref={videoRef}
                                    src={video.Video}
                                    onCanPlayThrough={handleCanPlayThrough}
                                    className='w-full h-full object-cover'
                                    autoPlay
                                    muted
                                    loop
                                    onTimeUpdate={handleTimeUpdate}
                                ></video>
                                <div className="absolute bottom-0 left-0 h-1 rounded-r-full bg-red-600" style={{ width: `${watching}%` }}>
                                    <button className='absolute -right-2 -top-2.5'><i className='fa fa-circle text-xs text-red-600'></i></button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-row mt-2 ml-4">
                        <img
                            src={video.Channel[0]?.Logo}
                            alt="channel_logo"
                            className="rounded-full h-8 w-8 mt-1 object-cover"
                        />
                        <div className="w-[80%]">
                            <span className="text-white text-ellipsis break-words font-semibold max-w-full text-sm px-2 line-clamp-1">
                                {video.Caption === '' ? "No Captions Given" : video.Caption}
                            </span>
                            <span className="text-gray-200 font-semibold text-xs px-2">{video.Channel[0]?.Name}</span>
                            <span className="text-gray-300 font-medium text-xs pl-2">
                                {video.Views} views • {duration}
                            </span>
                        </div>
                    </div>
                    <style>{`
                        .caption {
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: normal;
                        }
                    `}</style>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

export default VideoFile;
