import React, { useEffect } from 'react'
import { Offcanvas } from '../Components/Canvas'
import { AuthUser } from '../../Store/UserStore/Authentication/AuthSlice';
import Preloader from '../Components/Preloader';
import { useEssentials, getCookie } from '../../Functions/CommonFunctions';


const Home: React.FC = () => {
    const { dispatch, navigate, auth } = useEssentials()
    const { loading } = auth;

    useEffect(() => {
        const token = getCookie('token')
        if (token) {
            dispatch(AuthUser({ token })).then((state: any) => {
                if (!state.payload.user) {
                    navigate('/login')
                }
            })
        }
    }, [])

    return (
        <>
            {loading && <Preloader />}
            <Offcanvas />
        </>
    )
}

export default Home