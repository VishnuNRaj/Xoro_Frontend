import React, { useEffect } from 'react'
import { Offcanvas } from '../Components/Canvas'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { AuthUser } from '../../Store/UserStore/Authentication/AuthSlice';
import { AppDispatch, RootState } from '../../Store/Store';
import Preloader from '../Components/Preloader';


const Home: React.FC = () => {
    const { loading } = useSelector((state: RootState) => state.auth)
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        const token = Cookies.get('token')
        if (token) {
            dispatch(AuthUser({ token })).then((state: any) => {
                if (!state.payload.user) {
                    navigate('/login')
                }
            })
        }
    }, [])
    if (loading) {
        return <Preloader />
    }
    return (
        <>
            <Offcanvas />
        </>
    )
}

export default Home