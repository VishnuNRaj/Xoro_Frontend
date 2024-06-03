import React, { useEffect, useState } from 'react'
import AddDetails from './AddDetails'
import SelectVideo from './VideoSelect'
import { getCookie, useEssentials } from '../../Functions/CommonFunctions'
import { AuthUser } from '../../Store/UserStore/Authentication/AuthSlice'
import { useProgress } from '../../Functions/ProgressContext'
import Preloader from '../Components/Preloader'
const VideoUpload: React.FC = () => {
    const { dispatch, navigate } = useEssentials()
    const [Video, setVideo] = useState<File | null>(null)
    const [Thumbnail, setThumbnail] = useState<string[]>([])
    const {progress} = useProgress()
    console.log(progress)
    useEffect(() => {
        const token: string | undefined = getCookie('token')
        if (token) {
            dispatch(AuthUser({ token })).then(({payload}:any)=>{
                if(!payload.user) return navigate('/login')
            })
        } else navigate('/login')
    }, [])
    console.log(Video, Thumbnail)
    return (
        <div>
            {progress && <Preloader/>}
            {Thumbnail.length === 0 && <SelectVideo Video={Video} setVideo={setVideo} setThumbnail={setThumbnail} />}
            {Thumbnail.length > 0 && Video && <AddDetails Video={Video} Thumbnail={Thumbnail} setThumbnail={setThumbnail} />}
        </div>
    )
}

export default VideoUpload