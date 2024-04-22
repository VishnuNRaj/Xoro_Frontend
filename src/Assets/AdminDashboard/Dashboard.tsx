import React, { useEffect } from 'react';
import { OffcanvasAdmin } from '../Components/AdminHeader';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../Store/Store';
import { useDispatch, useSelector } from 'react-redux';
import Preloader from '../Components/Preloader';
import Cookies from 'js-cookie';
import { adminVerifyAuth } from '../../Store/AdminStore/Authentication/AuthSlice';

const Dashboard: React.FC = () => {
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()
    const { loading, admin } = useSelector((state: RootState) => state.admin)
    useEffect(() => {
        const token = Cookies.get('admin')
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