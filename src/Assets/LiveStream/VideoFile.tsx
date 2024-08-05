import React from 'react';
import ChatLoader from '../Chat/ChatLoader';
import { useLiveGrid } from './Hooks';
import { LiveInterface } from '../../Store/UserStore/CommonManagements/interfaces';
import 'video.js/dist/video-js.css';

interface Props {
    video: LiveInterface;
}

const VideoFile: React.FC<Props> = ({ video }) => {
    const {
        isLoading,
        videoRef,
        navigate,
        setState,
        state
    } = useLiveGrid({ video });

    return (
        <div className="flex bg-gray-800 border-2 border-gray-600 flex-col rounded-md w-full h-full" onClick={() => navigate(`/live/${video.Key}`)}>
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
                        {video.Completed ? (
                            <video
                            src={video.Video}
                            className='w-full h-full object-cover'
                        ></video>
                        ) : (
                            <video
                            ref={videoRef}
                            src={video.Video}
                            className='video-js vjs-default-skin w-full h-full object-cover'
                        ></video>
                        )}
                    </div>
                )}
            </div>
            <div className="flex flex-row mt-2 ml-4">
                <img
                    src={video.channel[0]?.Logo}
                    alt="channel_logo"
                    className="rounded-full h-8 w-8 mt-1 object-cover"
                />
                <div className="w-[80%]">
                    <span className="text-white text-ellipsis break-words font-semibold max-w-full text-sm px-2 line-clamp-1">
                        {video.Caption === '' ? "No Captions Given" : video.Caption}
                    </span>
                    <span className="text-gray-200 font-semibold text-xs px-2">{video.channel[0]?.Name}</span>
                    <span className="text-gray-300 font-medium text-xs pl-2">
                        {video.Views} views • {video.Completed ? 'Recorded' : 'Live'}
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
    );
}

export default VideoFile;
