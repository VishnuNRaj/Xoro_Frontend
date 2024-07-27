import React, { useEffect } from 'react';
import { OffcanvasAdmin } from '../Components/AdminHeader';
import Preloader from '../Components/Preloader';
import { adminVerifyAuth } from '../../Store/AdminStore/Authentication/AuthSlice';
import { useEssentials, getCookie } from '../../Functions/CommonFunctions';

const Dashboard: React.FC = () => {
    const { navigate, dispatch, Admin } = useEssentials()
    const { loading, admin } = Admin
    useEffect(() => {
        const token: string | undefined = getCookie('admin')
        if (token) {
            dispatch(adminVerifyAuth({ token })).then((state: any) => {
                if (!state.payload.admin) {
                    navigate('/admin/login')
                }
            })
        } else {
            navigate('/admin/login')
        }
    }, [])
    if (loading) {
        return <Preloader />
    }
    return (
        <div>
            <OffcanvasAdmin />
            <center>
                <h1 className='mt-52 text-[30px] font-medium text-white'>Welcome {admin && admin.Name}</h1>
            </center>
        </div>
    );
}

export default Dashboard;