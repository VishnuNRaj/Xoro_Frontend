import React, { useEffect } from 'react'
import { getCookie, useToast, useEssentials } from '../../Functions/CommonFunctions'
import { getVideos } from '../../Store/UserStore/Video-Management/VideoSlice'
import { setUser } from '../../Store/UserStore/Authentication/AuthSlice'
import { Offcanvas } from '../Components/Canvas';
import Preloader from '../Components/Preloader';
import VideoFile from './VideoFile';

const Videos: React.FC = () => {
    const { auth, navigate, dispatch, video } = useEssentials()
    const { loading } = auth
    const { Videos, loadingVideo } = video
    useEffect(() => {
        const token: string | undefined = getCookie('token')
        const random = Math.floor(1)
        dispatch(getVideos({ token, skip: 0, random })).then((state: any) => {
            console.log(state.payload)
            if (state.payload.user) dispatch(setUser(state.payload.user))
            else if(state.payload.status === 202) navigate('/login')
        })
    }, [])
    return (
        <div className='w-full h-auto'>
            <div className="w-full h-[70px]">
                <Offcanvas />
            </div>
            {loading || loadingVideo && <Preloader />}
            <div className="w-full flex items-center justify-center mt-10">
                <div className='w-[80%] grid md:grid-cols-3 sm:grid-cols-1 gap-6'>
                    {Videos && Videos.map((video) => (
                        <div className='w-full'>
                            <VideoFile video={video} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}



export default Videos