import React, { useEffect, useState } from 'react'
import { getCookie, useEssentials } from '../../Functions/CommonFunctions'
import { getVideos } from '../../Store/UserStore/Video-Management/VideoSlice'
import { setUser } from '../../Store/UserStore/Authentication/AuthSlice'
import Preloader from '../Components/Preloader';
import VideoFile from './VideoFile';

const Videos: React.FC = () => {
    const { auth, navigate, dispatch, video } = useEssentials()
    const { loading } = auth
    const { Videos, loadingVideo } = video
    const [skip, _setSkip] = useState(0)
    useEffect(() => {
        const token: string | undefined = getCookie('token')
        const random = Math.floor(Math.random())
        dispatch(getVideos({ token, skip, random })).then((state: any) => {
            if (state.payload.user) dispatch(setUser(state.payload.user))
            else if (state.payload.status === 202) navigate('/login')
        })
    }, [])
    return (
        <div className='w-full h-auto'>
            {loading || loadingVideo && <Preloader />}
            <div className="w-full flex items-center justify-center mt-10">
                <div className='w-[90%] grid md:grid-cols-4 sm:grid-cols-1 gap-2'>
                    {Videos && Videos.map((video) => (
                        <div className='w-full' key={video.VideoLink}>
                            <VideoFile video={video} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}



export default Videos