import React, { useState,useRef } from 'react';
import { Video } from '../../Store/UserStore/Video-Management/Interfaces';
import { useEssentials } from '../../Functions/CommonFunctions';

interface Props {
    video: Video;
}

const VideoFile: React.FC<Props> = ({ video }) => {
    const [state, setState] = useState<boolean>(false);
    const {navigate} = useEssentials()
    const videoRef = useRef<HTMLVideoElement | null>(null)
    return (
        <div className="flex flex-col rounded-md h-full bg-[#333]" onClick={()=>navigate(`/videos/${video.VideoLInk}`)}>
            <video ref={videoRef} src={video.Video} hidden></video>
            <div className='rounded-md' onMouseOver={() => setState(true)} onMouseOut={() => setState(false)}>
                {!state ? (
                    <img
                        className="w-full rounded-t-md object-cover aspect-video"
                        src={video.Thumbnail}
                        alt="video_thumbnail"
                    />
                ) : (
                    <video src={video.Video} className='aspect-video object-cover' autoPlay muted loop></video>
                )}
            </div>
            <div className="flex flex-row mt-2 ml-4">
                <img
                    src={video.Channel[0].Logo}
                    alt="channel_logo"
                    className="rounded-full h-8 w-8 object-cover"
                />
                <div className="p-2 w-[80%]">
                    <span className="text-white text-ellipsis break-words font-semibold max-w-full text-sm px-2 line-clamp-1">
                        {video.Caption === '' ? "****" : video.Caption} 
                    </span>
                    <span className="text-gray-500 font-base text-xs px-2">{video.Channel[0].Name}</span>
                    <span className="text-gray-500 font-base text-xs pl-2">
                        {video.Reactions[0].Views.length} views • {videoRef.current && Math.floor(videoRef.current.duration)} seconds                        
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
