import React, { useRef } from 'react'
interface props {
    video: string
}
const VideoPlayer: React.FC<props> = ({ video }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null)
    return (
        <div className='w-full rounded-md'>
            <video crossOrigin="anonymous" className='w-full' ref={videoRef} src={video}></video>
        </div>
    )
}

export default VideoPlayer