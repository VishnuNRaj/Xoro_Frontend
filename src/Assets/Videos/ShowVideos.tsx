import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEssentials, getCookie } from '../../Functions/CommonFunctions';
import { Video } from '../../Store/UserStore/Video-Management/Interfaces';

const ShowVideos: React.FC = () => {
    const { VideoLink } = useParams()
    const { video } = useEssentials()
    const { Videos, loadingVideo } = video
    const [current,setCurrent] = useState<Video | null>(null)
    useEffect(() => {
        const token:string | undefined = getCookie('token');
        
    }, [])
    return (
        <div>ShowVideos</div>
    )
}

export default ShowVideos