import React, { memo, useEffect, useState } from 'react';
import { Dialog } from '@material-tailwind/react';
import { useEssentials, getCookie } from '../../Functions/CommonFunctions';
import Preloader from '../Components/Preloader';
import { editProfile, profileSettings } from '../../Store/UserStore/ProfileManagement/ProfileSlice';
import { setUser } from '../../Store/UserStore/Authentication/AuthSlice';

interface SecureAccountProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SecureAccount: React.FC<SecureAccountProps> = memo(({ open, setOpen }) => {
    const { dispatch, navigate, auth, profile } = useEssentials()
    const { user, loading } = auth
    const { loadingProfile } = profile
    const [state, setState] = useState<string>('Edit')
    const [Settings, setSettings] = useState({
        Private: false,
        Notification: false,
        ProfileLock: false
    })
    const [edit, setEdit] = useState<{
        Name?: string;
        Username?: string;
        Gender?: string;
        Age?: number;
        Country?: string;
        Description: string
    }>({
        Country: '',
        Age: 0,
        Gender: '',
        Username: '',
        Name: '',
        Description: ''
    })
    const [Description, setDescription] = useState<string[]>([])
    useEffect(() => {
        if (user) {
            setSettings({
                Private: user.Settings.Private,
                Notification: user.Settings.Notifications,
                ProfileLock: user.ProfileLock
            })
            setDescription(user.Description)
            setEdit({
                Country: user.Country,
                Age: user.Age,
                Gender: user.Gender,
                Username: user.Username,
                Name: user.Name,
                Description: ''
            })
        }
    }, [])
    const handleUpdate = () => {
        const token = getCookie('token')
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
            <Dialog open={open} size='xs' className='bg-[#111]' handler={function (): void {
                throw new Error('Function not implemented.');
            }} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <div className="flex justify-between bg-[#111]">
                    <div className="float-left w-full bg-[#111] ">
                        <button onClick={() => setOpen(false)} className='hover:bg-red-700 hover:text-white w-[50px] h-[50px] float-left'>
                            <i className='fa fa-times'></i>
                        </button>
                        <button onClick={() => setState('Edit')} className={`w-[50px] float-left h-[50px] ${state === 'Edit' ? 'bg-green-700' : 'bg-blue-700'} text-white`}>
                            <i className='fa fa-edit'></i>
                        </button>
                        <button onClick={() => setState('Settings')} className={`w-[50px] float-left h-[50px] ${state === 'Settings' ? 'bg-green-700' : 'bg-blue-700'} text-white`}>
                            <i className='fa fa-gear'></i>
                        </button>
                    </div>
                </div>
                <div className='float-left'>
                    {state === 'Settings' && (
                        <>
                            <div className='space-y-2 p-4 mx-6 min-w-[300px] max-w-full float-left rounded-lg my-3 bg-gray-600'>
                                <center className='space-x-4'>
                                    <label className="inline-flex items-center cursor-pointer ml-3 mt-5">
                                        <input type="checkbox" checked={Settings.Private} onChange={() => setSettings({ ...Settings, Private: !Settings.Private })} className="sr-only peer" />
                                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-white">Make Profile Private</span>
                                    </label>
                                    <label className="inline-flex items-center cursor-pointer ml-3">
                                        <input type="checkbox" checked={Settings.Notification} onChange={() => setSettings({ ...Settings, Notification: !Settings.Notification })} className="sr-only peer" />
                                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-white">Enable Notifications</span>
                                    </label>
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
                        </>
                    )}
                    {state === 'Edit' && (
                        <>
                            <div className='w-full flex h-10 items-center justify-center bg-red-900'>
                                <h1 className=''>Edit Profile</h1>
                            </div>

                        </>
                    )}
                </div>
                <div className='float-left mt-4 px-5 pb-5'>
                    <div className="w-full float-left ">
                        <input type="text" onChange={(e) => {
                            setEdit({ ...edit, Name: e.target.value })
                        }} className=' w-full text-black border-2 border-blue-700 bg-white float-left h-[40px] p-2 px-5 rounded-md font-semibold' value={edit.Name} placeholder='Enter Name' />
                    </div>
                    <div className="w-full float-left mt-3">
                        <input type="text" onChange={(e) => {
                            setEdit({ ...edit, Username: e.target.value })
                        }} className=' w-full text-black border-2 border-blue-700 bg-white float-left h-[40px] p-2 px-5 rounded-md font-semibold' value={edit.Username} placeholder='Enter Username' />
                    </div>
                    <div className='w-full flex mt-4'>
                        <input type="text" onChange={(e) => {
                            setEdit({ ...edit, Description: e.target.value })
                        }} className=' w-[88%] text-black border-2 border-blue-700 bg-white float-left h-[40px] p-2 px-5 rounded-md font-semibold' value={edit.Description} placeholder='Add Description' />
                        <button className='bg-blue-700 w-[8%] h-10 ml-4 text-white float-left rounded-md' onClick={() => {
                            if (edit.Description.length > 0) {
                                setDescription([...Description, edit.Description]);
                                setEdit({ ...edit, Description: '' })
                            }
                        }} ><i className='fa fa-plus'></i></button>
                        <div className='w-full inline-block space-x-2'>
                            {Description.map((tag, index) => (
                                <div key={index} className='bg-gray-200 mt-2 float-left p-2 px-3 rounded-md text-gray-900'>
                                    <p className='float-left'>{tag}</p>
                                    <button onClick={() => {
                                        setDescription(Description.filter((_item, i) => i !== index))
                                    }} className='bg-red-700 w-7 h-7 text-white float-left mx-2 rounded-md'><i className='fa fa-times'></i></button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-full float-left mt-3">
                        <p className='float-left'>Male</p>
                        <input type="radio" className=' w-full text-black border-2 border-blue-700 bg-gray-300 float-left h-[10px] p-2 px-5 rounded-md font-semibold' placeholder='Enter Username' />

                    </div>
                    <div className="w-full float-left mt-3">
                        <input type="text" className=' w-full text-black border-2 border-blue-700 bg-gray-300 float-left h-[40px] p-2 px-5 rounded-md font-semibold' value={edit.Age} placeholder='Add your age' />
                    </div>
                    <div className="w-full float-left mt-3">
                        <input type="text" className=' w-full text-black border-2 border-blue-700 bg-gray-300 float-left h-[40px] p-2 px-5 rounded-md font-semibold' value={edit.Country} placeholder='Add Country' />
                    </div>
                    <center>
                        <button className='p-2 px-3 text-white font-semibold inline-block bg-blue-700 rounded-md mt-5' onClick={() => {
                            if (edit.Name && edit.Username && edit.Name.length > 0 && edit.Username.length > 0) {
                                const token = getCookie('token');
                                if (token) {
                                    dispatch(editProfile({ token, Name: edit.Name, Username: edit.Username, Description })).then((state: any) => {
                                        dispatch(setUser(state.payload.user))
                                        if (state.payload.status === 202) navigate('/login')
                                        console.log(state)
                                    })
                                } else navigate('/login')
                            }
                        }}>Edit Profile</button>
                    </center>
                </div>
            </Dialog>
        </div>
    );
})

export default SecureAccount;
