import React, { useEffect, useState } from 'react';
import { useEssentials,getCookie } from '../../Functions/CommonFunctions';
import Preloader from '../Components/Preloader';
import { Offcanvas } from '../Components/Canvas';
import { showPost } from '../../Store/UserStore/Post-Management/PostSlice';
import { setUser } from '../../Store/UserStore/Authentication/AuthSlice';
import ImgComponent from './ImageMap';
import { handleBanner, handleImages } from './Functions';
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import SecureAccount from './SecureAccount';
import CreateChannnel from './CreateChannnel';


const Profile: React.FC = () => {
    const {navigate,dispatch,auth,post,profile} = useEssentials()

    const { user, loading } = auth;
    const { loadingPost } = post;
    const { loadingProfile } = profile;
    const [type, setType] = useState<string>('Images')

    const [Profile, setProfile] = useState<{
        Image: File | null;
        Show: string;
    }>({
        Image: null,
        Show: ''
    })

    const [banner, setBanner] = useState<{
        Image: File | null;
        Show: string;
    }>({
        Image: null,
        Show: ''
    })

    useEffect(() => {
        const token = getCookie('token');
        if (token) {
            dispatch(showPost({ token })).then((state: any) => {
                if (!state.payload.user) {
                    navigate('/login');
                }
                setProfile({ ...Profile, Show: state.payload.user.Profile })
                setBanner({ ...banner, Show: state.payload.user.Banner })
                dispatch(setUser(state.payload.user))
            });
        } else navigate('/login')
    }, []);

    const [open, setOpen] = useState(false)
    const [channel, setChannel] = useState(false)


    return (
        <div className='font-semibold'>
            <div className="w-full h-[70px]">
                <Offcanvas />
            </div>

            {open && <SecureAccount open={open} setOpen={setOpen} />}
            {channel && <CreateChannnel open={channel} setOpen={setChannel} />}
            {loadingPost || loading || loadingProfile ? (
                <Preloader />
            ) : <></>}
            <center>
                <div className="container animate-slideInFromLeft h-screen rounded-xl bg-[#000] mt-6 relative">
                    {/* Banner */}
                    <div className=''>
                        {user?.Banner && (
                            <div>
                                <img src={banner.Show} className="absolute top-0 left-0 w-full h-40 object-cover mt-2 rounded-t-xl" alt="Banner" />
                                <div className="absolute -mt-5 left-[90%] right-0 flex justify-center cursor-pointer">
                                    <Menu>
                                        <MenuHandler>
                                            <button className='w-8 h-8 md:mt-1 border-white border-2 rounded-full bg-transparent text-white'><i className="fa fa-gear hover:animate-spin text-xl"></i></button>
                                        </MenuHandler>
                                        <MenuList className='bg-gray-300 font-medium space-y-2' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                            <MenuItem className='hover:bg-blue-500 rounded-md hover:text-white' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                <label htmlFor="banner-upload" className="cursor-pointer">
                                                    <i className="fa fa-camera cursor-pointer text-white bg-blue-500 rounded-full p-2 mr-3"></i> Change Banner
                                                    <input id="banner-upload" onChange={(e) => handleBanner(e, banner, setBanner, user, dispatch)} type="file" className="hidden" />
                                                </label>
                                            </MenuItem>
                                            <MenuItem className='cursor-pointer hover:text-white hover:bg-blue-500 rounded-md' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}> <i className='fa fa-lock bg-blue-500 rounded-md p-2 px-3 mr-4'></i>Secure Account</MenuItem>
                                            <MenuItem onClick={() => setOpen(true)} className='cursor-pointer hover:text-white hover:bg-blue-500 rounded-md' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}> <i className='fa fa-gears bg-blue-500 rounded-full p-2 mr-4'></i>Profile Settings</MenuItem>
                                            {!user.Channel ? (
                                                <MenuItem onClick={() => setChannel(true)} className='cursor-pointer hover:text-white hover:bg-blue-500 rounded-md' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}> <i className='fa fa-television bg-blue-500 rounded-full p-2 mr-4'></i>Create Channel</MenuItem>

                                            ) : (
                                                <MenuItem onClick={() => setChannel(true)} className='cursor-pointer hover:text-white hover:bg-blue-500 rounded-md' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}> <i className='fa fa-television bg-blue-500 rounded-full p-2 mr-4'></i>Edit Channel</MenuItem>
                                            )}
                                        </MenuList>
                                    </Menu>
                                </div>
                            </div>
                        )}

                        <div className="row p-8 gap-8 text-white font-semibold relative">
                            {/* Profile Image */}
                            <div className="h-full w-2/4 lg:w-1/6 relative">
                                {user && user.ProfileLock && (
                                    <div className="absolute -mt-2 left-0 right-0 flex justify-center">
                                        <i className="fa fa-lock w-8 h-8 cursor-pointer text-white bg-green-700 rounded-full p-2"></i>
                                    </div>
                                )}
                                <div className="rounded-full flex-auto w-40 h-40 mt-10 overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${Profile.Show})` }} ></div>
                                <div className="absolute -mt-2 left-0 right-0 flex justify-center">
                                    <label htmlFor="profile-upload" className="cursor-pointer">
                                        <i className="fa fa-camera cursor-pointer text-white bg-blue-500 rounded-full p-2"></i>
                                    </label>
                                    <input id="profile-upload" onChange={(e) => handleImages(e, Profile, setProfile, user, dispatch)} type="file" className="hidden" />
                                </div>
                            </div>

                            <div className="w-full rounded-2xl mt-20 md:mt-0 bg-[#000] float-left">
                                {/* names */}
                                <div className="h-full w-full md:w-1/4 float-left">
                                    <div className="w-full rounded-md p-2 bg-gray-400 float-left">
                                        <ul>
                                            <li>
                                                <div className="p-2 float-left w-full">
                                                    <div className="text-lg w-full float-left font-semibold align-middle">
                                                        <h1 className='text-black'>{user?.Name} <button className='bg-blue-700  text-black p-1 px-2 rounded-full'><center><i className='fa fa-edit font-semibold'></i></center></button>
                                                        </h1>
                                                    </div>
                                                </div>
                                                <div className=" float-left  w-full rounded-full mt-4">
                                                    <center>
                                                        <h1 className='bg-blue-700 font-bold rounded-full'>@{user?.Username}</h1>
                                                    </center>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {/* follow */}
                                <div className="h-full w-full md:w-2/5 float-right">
                                    <div className="w-full rounded-md p-2 bg-black float-right">
                                        <ul>
                                            <li>
                                                <div className="p-2 float-left w-full">
                                                    <div className="w-full float-left font-bold px-[15%]">
                                                        <center>
                                                            <div className="flex justify-around space-x-4">
                                                                <div className="text-center">
                                                                    <h1>Followers</h1>
                                                                    <p>{user?.Followers}</p>
                                                                </div>
                                                                <div className="text-center">
                                                                    <h1>Following</h1>
                                                                    <p>{user?.Following}</p>
                                                                </div>
                                                                <div className="text-center">
                                                                    <h1>Posts</h1>
                                                                    <p>{user?.Posts}</p>
                                                                </div>
                                                            </div>
                                                        </center>
                                                    </div>
                                                </div>

                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {/* description */}
                                <center>
                                    <div className='w-full px-[25%] mt-50 float-left'>
                                        {/* <h1 className='underline p-5'>Description</h1> */}
                                        {user?.Description.length === 0 ? (
                                            <>
                                                <button className='p-2 px-3 bg-pink-700'> <i className='fa fa-plus'></i> Add Description</button>
                                            </>
                                        ) : (
                                            <>
                                                {user && user?.Description.length > 0 && (
                                                    <ul>
                                                        {user.Description.map((description, index) => (
                                                            <li key={index}>{description}</li>
                                                        ))}
                                                    </ul>
                                                )}

                                            </>
                                        )}
                                    </div>
                                </center>
                                <div className="w-full md:w-[50%]  float-left mt-20 bg-[#111] ml-0 md:ml-[25%] text-xl font-bold">
                                    <div className={`w-1/4 float-left ${type === 'Images' ? 'bg-green-700 ' : 'bg-transparent'}`} onClick={() => setType('Images')}>
                                        <center><button className='bg-transparent text-white'><i className='fa fa-image'></i></button></center>
                                    </div>
                                    <div className={`w-1/4 float-left ${type === 'Videos' ? 'bg-green-700 ' : 'bg-transparent'}`} onClick={() => setType('Videos')}>
                                        <center><button className='bg-transparent text-white'><i className='fa fa-video-camera'></i></button></center>
                                    </div>
                                    <div className={`w-1/4 float-left ${type === 'Shorts' ? 'bg-green-700 ' : 'bg-transparent'}`} onClick={() => setType('Shorts')}>
                                        <center><button className='bg-transparent text-white'><i className='fa fa-youtube-play'></i></button></center>
                                    </div>
                                    <div className={`w-1/4 float-left ${type === 'Live' ? 'bg-green-700 ' : 'bg-transparent'}`} onClick={() => setType('Live')}>
                                        <center><button className='bg-transparent text-white'><i className='fa fa-television'></i></button></center>
                                    </div>
                                </div>
                                <div className="w-full p-5 float-left mt-10 bg-[#111]">
                                    {type === 'Images' && <ImgComponent />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </center>
        </div>
    );
};

export default Profile;
