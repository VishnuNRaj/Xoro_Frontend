import React, { useEffect, useState } from 'react';
import Camera from '../Components/Camera';
import { Offcanvas } from '../Components/Canvas';
import Upload from './Upload';
import { AuthUser } from '../../Store/UserStore/Authentication/AuthSlice';
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../Store/Store';
import { useNavigate } from 'react-router-dom';
import Preloader from '../Components/Preloader';

const UploadCamera: React.FC = () => {
    const { loading } = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()
    const [Media, setMedia] = useState<File[]>([])

    useEffect(() => {
        const token = Cookies.get('token')
        if (token) {
            dispatch(AuthUser({ token })).then((state: any) => {
                if (!state.payload.user) {
                    navigate('/login')
                }
            })
        } else navigate('/login')
    }, [])
    return (
        <div>
            {loading && <Preloader />}
            <div>
                <Offcanvas />
            </div>
            {Media.length === 0 && <div className='mt-56'>
                <Camera setMedia={setMedia} />
            </div>}
            {Media.length > 0 && <div className='mt-56'>
                <Upload Media={Media} setMedia={setMedia} />
            </div>}
        </div>
    )
}

export default UploadCamera;