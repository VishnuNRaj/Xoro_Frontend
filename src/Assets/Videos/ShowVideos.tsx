import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useEssentials, getCookie, useToast } from '../../Functions/CommonFunctions';
import { Video } from '../../Store/UserStore/Video-Management/Interfaces';
import { getVideo } from '../../Store/UserStore/Video-Management/VideoSlice';
import Preloader from '../Components/Preloader';
import { setUser } from '../../Store/UserStore/Authentication/AuthSlice';

const ShowVideos: React.FC = () => {
    const { VideoLink } = useParams()
    const { navigate, dispatch,video } = useEssentials()
    const {loadingVideo} = video
    const [_videoData, setVideoData] = useState<Video | null>(null)
    useEffect(() => {
        const token: string | undefined = getCookie('token');
        if (!token) navigate("/login")
        if (!VideoLink) navigate("/videos")
        if (token && VideoLink) {
            dispatch(getVideo({ token, VideoLink })).then((response:any)=>{
                console.log(response.payload)
                if(!response.payload.user) navigate("/login")
                if(!response.payload.Video) {
                    useToast("No Video Found","error")
                    navigate("/videos")
                }
                dispatch(setUser(response.payload.user))
                setVideoData(response.payload.Video) 
            })
        }
    }, [])
    return (
        <div>
            {loadingVideo && <Preloader/>}
        </div>
    )
}

export default ShowVideos