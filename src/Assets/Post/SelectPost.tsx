import React, { useEffect, useState } from 'react';
import Camera from '../Components/Camera';
import { Offcanvas } from '../Components/Canvas';
import Upload from './Upload';
import { AuthUser } from '../../Store/UserStore/Authentication/AuthSlice';
import Preloader from '../Components/Preloader';
import { useEssentials, getCookie } from '../../Functions/CommonFunctions';

const UploadCamera: React.FC = () => {
    const {navigate,dispatch,auth} = useEssentials()
    const [Media, setMedia] = useState<File[]>([])
    const { loading } = auth;

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
            {loading && <Preloader />}
            <div>
                <Offcanvas />
            </div>
            {Media.length === 0 && <div className='mt-56 animate-slideInFromLeft'>
                <Camera setMedia={setMedia} />
            </div>}
            {Media.length > 0 && <div className='mt-56 animate-slideInFromLeft'>
                <Upload Media={Media} setMedia={setMedia} />
            </div>}
        </div>
    )
}

export default UploadCamera;