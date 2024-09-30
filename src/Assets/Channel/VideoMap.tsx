import React from 'react'
import { Video } from '../../Store/UserStore/Video-Management/Interfaces'
import { useEssentials } from '../../Functions/CommonFunctions'

const VideoMap: React.FC<{ shorts: Video[] }> = ({ shorts }) => {
    const { navigate } = useEssentials()
    return (
        <div className='w-full h-full'>
            <div style={{ scrollbarWidth: "none" }} className='w-full h-full overscroll-y-scroll'>
                <div className='grid grid-cols-2 p-2 gap-3 w-full h-full'>
                    {shorts.length > 0 && shorts.map((short) => (
                        <div key={short._id} onClick={() => navigate(`/videos/${short.VideoLink}`)} className='w-full h-[180px] border-2 rounded-lg bg-slate-800'>
                            <div className='h-[140px] rounded-lg w-full bg-gray-700'>
                                <img src={short.Thumbnail ? short.Thumbnail : "/Logo.png"} className='w-full h-full rounded-t-lg' alt="" />
                            </div>
                            <div className='w-full h-[30px] px-2 mt-1 flex items-center justify-center text-white font-semibold'>
                                <h1 className='truncate line-clamp-5'>{short.Caption.length > 0 ? short.Caption : "No Caption Given"}</h1>
                            </div>
                        </div>
                    ))}I
                </div>
            </div>
        </div>
    )
}

export default VideoMap