import React, { useEffect, useState } from 'react';
import Camera from '../Components/Camera';
import Upload from './Upload';
import { AuthUser } from '../../Store/UserStore/Authentication/AuthSlice';
import { useEssentials, getCookie } from '../../Functions/CommonFunctions';

const UploadCamera: React.FC = () => {
    const {navigate,dispatch} = useEssentials()
    const [Media, setMedia] = useState<File[]>([])

    useEffect(() => {
        const token = getCookie('token')
        if (token) {
            dispatch(AuthUser({ token })).then((state: any) => {
                if (!state.payload.user) {
                    navigate('/login')
                }
            })
        } else navigate('/login')
    }, [])
    return (
        <div className=''>
            {Media.length === 0 && <div className='mt-2 animate-slideInFromLeft'>
                <Camera setMedia={setMedia} />
            </div>}
            {Media.length > 0 && <div className='mt-2 w-full animate-slideInFromLeft'>
                <Upload Media={Media} setMedia={setMedia} />
            </div>}
        </div>
    )
}

export default UploadCamera;