import React, { memo, useEffect, useState } from 'react';
import { Dialog } from '@material-tailwind/react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../Store/Store';
import Cookies from 'js-cookie'
import Preloader from '../Components/Preloader';
import { profileSettings } from '../../Store/UserStore/ProfileManagement/profileSlice';
import { setUser } from '../../Store/UserStore/Authentication/AuthSlice';

interface SecureAccountProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SecureAccount: React.FC<SecureAccountProps> = memo(({ open, setOpen }) => {
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()
    const { user, loading } = useSelector((state: RootState) => state.auth)
    const { loadingProfile } = useSelector((state: RootState) => state.profile)
    const [Settings, setSettings] = useState({
        Private: false,
        Notification: false,
        ProfileLock: false
    })
    useEffect(() => {
        if (user) {
            setSettings({
                Private: user.Settings.Private,
                Notification: user.Settings.Notifications,
                ProfileLock: user.ProfileLock
            })
        }
    }, [])
    const handleUpdate = () => {
        const token = Cookies.get('token')
        if (token) {
            const { Private, Notification, ProfileLock } = Settings
            dispatch(profileSettings({ token, Private, Notification, ProfileLock })).then((state: any) => {
                if (!state.payload.user) {
                    navigate('/login')
                }
                dispatch(setUser(state.payload.user))
                setOpen(true)
                if (user) {
                    setSettings({ ...Settings, Private: user.Settings.Private, Notification: user.Settings.Notifications, ProfileLock: user.ProfileLock })
                }
            })
        } else navigate('/login')
    }
    if (loading || loadingProfile) {
        setOpen(false)
        return <Preloader />
    }
    return (
        <div>
            <Dialog open={open} size='xs' className='w-[200px]'>
                <div className='w-full float-left bg-white'>
                    <button onClick={() => setOpen(false)} className='hover:bg-red-700 hover:text-white w-8 h-8 float-right'>
                        <i className='fa fa-times'></i>
                    </button>
                </div>
                <div className='space-y-2 p-4 mx-6 rounded-lg my-3 w-auto bg-gray-600'>
                    <center className='space-x-4'>
                        <label className="inline-flex items-center cursor-pointer ml-3 mt-5">
                            <input type="checkbox" checked={Settings.Private} onChange={() => setSettings({ ...Settings, Private: !Settings.Private })} className="sr-only peer" />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-white">Make Profile Private</span>
                        </label>
                        {/* </center>
                    <center> */}
                        <label className="inline-flex items-center cursor-pointer ml-3">
                            <input type="checkbox" checked={Settings.Notification} onChange={() => setSettings({ ...Settings, Notification: !Settings.Notification })} className="sr-only peer" />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-white">Enable Notifications</span>
                        </label>
                        {/* </center>
                    <center> */}
                        <label className="inline-flex items-center cursor-pointer ml-3">
                            <input type="checkbox" checked={Settings.ProfileLock} onChange={() => setSettings({ ...Settings, ProfileLock: !Settings.ProfileLock })} className="sr-only peer" />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-white">Lock Profile Picture</span>
                        </label>
                    </center>
                    <center className='space-x-3'>
                        <button onClick={handleUpdate} className='p-1 rounded-sm font-semibold px-5 border-2 border-green-600 text-white bg-green-700 '>Save</button>
                        <button onClick={() => {
                            if (user) {
                                setSettings({ ...Settings, Private: user.Settings.Private, Notification: user.Settings.Notifications, ProfileLock: user.ProfileLock })
                            }
                        }} className='p-1 rounded-sm font-semibold px-4 text-white bg-red-700 border-2 border-red-400 '>Cancel</button>
                    </center>
                </div>
            </Dialog>
        </div>
    );
})

export default SecureAccount;
