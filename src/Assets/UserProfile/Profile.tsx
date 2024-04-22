import React, { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../../Store/Store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Preloader from '../Components/Preloader';
import { Offcanvas } from '../Components/Canvas';
import { showPost } from '../../Store/UserStore/Post-Management/PostSlice';
import { setUser } from '../../Store/UserStore/Authentication/AuthSlice';
import ImgComponent from './ImageMap';

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);
    const { loadingPost, post } = useSelector((state: RootState) => state.post);
    const [type, setType] = useState<string>('Images')

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            dispatch(showPost({ token })).then((state: any) => {
                console.log(state)
                if (!state.payload.user) {
                    navigate('/login');
                }
                dispatch(setUser(state.payload.user))
            });
        }
    }, []);

    if (loadingPost) {
        return <Preloader />;
    }

    return (
        <div>
            <Offcanvas />
            <center>
                <div className="container h-screen rounded-xl bg-[#000] mt-20 relative">
                    {/* Banner */}
                    {user?.Banner && (
                        <div>
                            <img src={user.Banner} className="absolute top-0 left-0 w-full h-40 object-cover rounded-t-xl" alt="Banner" />
                            <div className="absolute -mt-2 left-[90%] right-0 flex justify-center cursor-pointer">
                                <label htmlFor="banner-upload" className="cursor-pointer">
                                    <i className="fa fa-refresh cursor-pointer text-white bg-blue-500 rounded-full p-2"></i>
                                </label>
                                <input id="banner-upload" type="file" className="hidden" />
                            </div>
                        </div>
                    )}

                    <div className="row p-8 gap-8 text-white font-semibold relative">
                        {/* Profile Image */}
                        <div className="h-full w-2/4 lg:w-1/6 relative">
                            <img src={user?.Profile} className="rounded-full flex-auto" alt="Profile" />
                            <div className="absolute -mt-2 left-0 right-0 flex justify-center">
                                <label htmlFor="profile-upload" className="cursor-pointer">
                                    <i className="fa fa-camera cursor-pointer text-white bg-blue-500 rounded-full p-2"></i>
                                </label>
                                <input id="profile-upload" type="file" className="hidden" />
                            </div>
                        </div>

                        <div className="w-full rounded-2xl mt-20 md:mt-0 bg-[#000] float-left">
                            {/* names */}
                            <div className="h-full w-full md:w-1/4 float-left">
                                <div className="w-full rounded-md p-2 bg-white float-left">
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
                                                    <h1 className='bg-pink-700 font-normal rounded-full'>@{user?.Username}</h1>
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
                                                <div className="w-full float-left font-normal px-[20%] align-middle">
                                                    <center>
                                                        <div className="flex justify-around">
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
                                    <h1 className='underline p-5'>Description</h1>
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
                            <div className="w-full float-left mt-20 bg-[#111] text-xl font-semibold">
                                <div className="w-1/4 float-left">
                                    <center><button className='bg-transparent text-white'><i className='fa fa-image'></i></button></center>
                                </div>
                                <div className="w-1/4 float-left">
                                    <center><button className='bg-transparent text-white'><i className='fa fa-video-camera'></i></button></center>
                                </div>
                                <div className="w-1/4 float-left">
                                    <center><button className='bg-transparent text-white'><i className='fa fa-youtube-play'></i></button></center>
                                </div>
                                <div className="w-1/4 float-left">
                                    <center><button className='bg-transparent text-white'><i className='fa fa-television'></i></button></center>
                                </div>
                            </div>
                            <div className="w-full p-5 float-left mt-10 bg-[#111]">
                                <ImgComponent />
                            </div>
                        </div>
                    </div>
                </div>
            </center>
        </div>
    );
};

export default Profile;
