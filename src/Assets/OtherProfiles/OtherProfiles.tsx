import React, { useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';
import Preloader from '../Components/Preloader';
import { setUser } from '../../Store/UserStore/Authentication/AuthSlice';
import ImgComponent from './ImageMap';
import { User } from '../../Store/UserStore/Authentication/Interfaces';
import { followUser, getProfile, unfollowUser } from '../../Store/UserStore/ProfileManagement/ProfileSlice';
import { PostImage } from '../../Store/UserStore/Post-Management/Interfaces';
import { useSocket } from '../../Socket';
import { useEssentials, getCookie } from '../../Functions/CommonFunctions';


const OtherProfiles: React.FC = () => {
    const { navigate, dispatch, auth, profile } = useEssentials()
    const socket = useSocket()
    const [userData, setUserData] = useState<User | null>(null)
    const [post, setPost] = useState<{
        Images: PostImage[]
    } | null>(null)
    const { loading, user } = auth;
    const { loadingProfile } = profile;
    const [type, setType] = useState<string>('Images')
    const [Connection, setConnection] = useState<{
        Following: boolean;
        Follower: boolean;
    }>({
        Following: false,
        Follower: false
    })
    const { ProfileLink } = useParams()
    useEffect(() => {
        const token = getCookie('token')
        if (token && ProfileLink) {
            dispatch(getProfile({ token, ProfileLink })).then((state: any) => {
                if (!state.payload.user) {
                    navigate('/login');
                }
                if (!state.payload.userData) navigate(-1)
                const data: User = state.payload.userData
                console.log(state.payload.post)
                dispatch(setUser(state.payload.user))
                setUserData(data);
                setConnection({
                    Following: data.connections[0].Following.some((connection) => connection === state.payload.user._id),
                    Follower: data.connections[0].Followers.some((connection) => connection === state.payload.user._id)
                });
                if (!state.payload.userData.Settings.Private) setPost(state.payload.post)
            });
        } else if (!ProfileLink) navigate(-1);
    }, [ProfileLink]);



    return (
        <div className='font-semibold'>
            {loading || loadingProfile ? (
                <Preloader />
            ) : <></>}
            <center>
                <div className="container animate-slideInFromLeft h-screen rounded-xl bg-[#000] mt-24 relative">
                    {/* Banner */}
                    <div className=''>
                        {userData?.Banner && (
                            <div>
                                <img src={userData.Banner} className="absolute top-0 left-0 w-full h-40 object-cover rounded-t-xl" alt="Banner" />
                            </div>
                        )}

                        <div className="row p-8 gap-8 text-white font-semibold relative">
                            {/* Profile Image */}
                            <div className="h-full w-2/4 lg:w-1/6 relative">
                                {userData && userData.ProfileLock && (
                                    <div className="absolute -mt-2 left-0 right-0 flex justify-center">
                                        <i className="fa fa-lock w-8 h-8 cursor-pointer text-white bg-green-700 rounded-full p-2"></i>
                                    </div>
                                )}
                                <div className="rounded-full flex-auto w-40 h-40 mt-10 overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${userData?.Profile})` }} ></div>
                            </div>
                            {user && user._id !== userData?._id && (
                                <>
                                    {userData && Connection.Follower && (
                                        <div className="w-[220px] flex">
                                            <div className='w-[100px] mt-5'>
                                                <button onClick={() => {
                                                    const token: string | undefined = getCookie('token');
                                                    if (token) dispatch(unfollowUser({ token, UserId: userData._id })).then((() => {
                                                        setConnection({ ...Connection, Follower: false })
                                                    }))
                                                }} className='w-full py-2 flex items-center justify-center bg-pink-700 rounded-full'>Unfollow</button>
                                            </div>
                                            <div className='w-[100px] mt-5 ml-[20px]'>
                                                <button className='w-full py-2 flex items-center justify-center bg-blue-700 rounded-full'>Message</button>
                                            </div>
                                        </div>
                                    )}
                                    {userData && !Connection.Follower && (
                                        <div className='w-[100px] mt-5'>
                                            <button onClick={() => {
                                                const token: string | undefined = getCookie('token');
                                                if (token) dispatch(followUser({ token, UserId: userData._id })).then((state: any) => {
                                                    if (!userData.Settings.Private) setConnection({ ...Connection, Follower: true })
                                                    if (socket) socket.emit('notification', { data: state.payload.notification, UserId: userData._id })
                                                })
                                                else navigate('/login')
                                            }} className='w-full py-2 flex items-center justify-center bg-green-700 rounded-full'>Follow</button>
                                        </div>
                                    )}
                                </>
                            )}
                            <div className="w-full rounded-2xl mt-20 md:mt-0 bg-[#000] float-left">
                                {/* names */}
                                <div className="h-full w-full md:w-1/4 float-left">
                                    <div className="w-full rounded-md p-2 bg-gray-400 float-left">
                                        <ul>
                                            <li>
                                                <div className="p-2 float-left w-full">
                                                    <div className="text-lg w-full float-left font-semibold align-middle">
                                                        <h1 className='text-black'>{userData?.Name} 
                                                        </h1>
                                                    </div>
                                                </div>
                                                <div className=" float-left  w-full rounded-full mt-4">
                                                    <center>
                                                        <h1 className='bg-blue-700 font-bold rounded-full'>@{userData?.Username}</h1>
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
                                                                    <p>{userData?.Followers}</p>
                                                                </div>
                                                                <div className="text-center">
                                                                    <h1>Following</h1>
                                                                    <p>{userData?.Following}</p>
                                                                </div>
                                                                <div className="text-center">
                                                                    <h1>Posts</h1>
                                                                    <p>{userData?.Posts}</p>
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
                                        {userData?.Description.length === 0 ? (
                                            <>
                                            </>
                                        ) : (
                                            <>
                                                {userData && userData?.Description.length > 0 && (
                                                    <ul>
                                                        {userData.Description.map((description, index) => (
                                                            <li key={index}>{description}</li>
                                                        ))}
                                                    </ul>
                                                )}

                                            </>
                                        )}
                                    </div>
                                </center>
                                <div className="w-full float-left mt-20 bg-[#111] text-xl font-bold">
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
                                    {type === 'Images' && post && <ImgComponent post={post.Images} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </center>
        </div>
    );
};

export default OtherProfiles;
