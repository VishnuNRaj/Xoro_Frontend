import React, { memo, useState } from "react";
import { useEssentials } from '../../Functions/CommonFunctions';
import Search from './Search'
import { Dialog } from '@material-tailwind/react'
import { User } from "../../Store/UserStore/Authentication/Interfaces";
import { PostImage } from "../../Store/UserStore/Post-Management/Interfaces";
import UserMap from "./UserMap";
import ChatPopup from "../Chat/ChatPopup";

interface NavbarProps {
    openDrawerLeft: () => void;
}

const Navbar: React.FC<NavbarProps> = memo(({ openDrawerLeft }) => {
    const { navigate, auth } = useEssentials()
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user } = auth
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const [search, setSearch] = useState<boolean>(false)
    const [show, setShow] = useState<string>('user')
    const [data, setData] = useState<{
        users: User[],
        video: any[],
        post: PostImage[],
        live: any[]
    }>({
        users: [],
        video: [],
        post: [],
        live: []
    })
    const [chatWindow, setChatwindow] = useState<boolean>(false)
    return (
        <>
            {chatWindow && (
                <div className="fixed md:right-[100px] md:top-0 min-w-[360px]">
                    <ChatPopup setChatWindow={setChatwindow} chatWindow={chatWindow} />
                </div>
            )}
            {user && !chatWindow && (
                <div className="fixed bottom-0 right-0 mb-4 mr-4 w-[40px] h-[40px] rounded-full flex items-center z-50 justify-center bg-blue-700">
                    <button onClick={() => {
                        setChatwindow(!chatWindow)
                    }} className="bg-transparent w-[40px] fixed h-[40px] rounded-full text-xl text-white flex items-center justify-center">
                        <i className="fa fa-comments"></i>
                    </button>
                </div>
            )}
            <Dialog open={search} size="xs" className="rounded-md bg-[#111] bg-opacity-80 border-2  border-blue-700" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} handler={function (): void {
                throw new Error("Function not implemented.");
            }}>
                <div className="w-full font-semibold float-left">
                    <div className="w-full float-left flex justify-center items-center">
                        <div className="w-[60%] p-2 flex justify-center items-center float-left">
                            {user && <Search data={data} setData={setData} />}
                        </div>
                        <div onClick={() => {
                            setSearch(false)
                        }} className="float-left ml-10 p-2 px-3 rounded-md hover:bg-red-700">
                            <button><i className="fa fa-times text-black hover:text-white"></i></button>
                        </div>
                    </div>
                    <div className="w-full mb-3 mt-3 border-t-2 float-left">
                        <div className="w-[80%] mt-2 ml-[10%] grid grid-cols-4 float-left">
                            <div onClick={() => setShow('user')} className={`w-full float-left ${show === 'user' ? 'bg-blue-700 text-white' : ''}`}>
                                <center><button className="bg-transparent">Profile</button></center>
                            </div>
                            <div onClick={() => setShow('video')} className={`w-full float-left ${show === 'video' ? 'bg-blue-700 text-white' : ''}`}>
                                <center><button className="bg-transparent">Videos</button></center>
                            </div>
                            <div onClick={() => setShow('post')} className={`w-full float-left ${show === 'post' ? 'bg-blue-700 text-white' : ''}`}>
                                <center><button className="bg-transparent">Posts</button></center>
                            </div>
                            <div onClick={() => setShow('live')} className={`w-full float-left ${show === 'live' ? 'bg-blue-700 text-white' : ''}`}>
                                <center><button className="bg-transparent">Live</button></center>
                            </div>
                        </div>
                        <div className="min-w-full">
                            {show === 'user' && <UserMap user={data.users} />}
                        </div>
                    </div>
                </div>
            </Dialog>
            <nav className="fixed w-full z-20 top-0 start-0 black-varient-1">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between p-4 pl-0">
                    <span className="flex items-center w-[10%] px-5 rtl:space-x-reverserounded-full">
                        {/* <center> */}
                            <button className=" h-9 w-9 aspect-square shadow-lg shadow-red-700 rounded-full flex items-center justify-center border-2 border-white" onClick={openDrawerLeft} >
                                <svg className="w-5 h-5 font-semibold" stroke="white" aria-hidden="true" fill="white"  viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clip-rule="evenodd" fontWeight={'900'} fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <button className=" h-9 w-9 aspect-square ml-3 shadow-lg shadow-red-700 rounded-full flex items-center justify-center border-2 border-white text-white" onClick={()=>navigate(-1)} >
                                <i className="fa fa-arrow-left"></i>
                            </button>
                        {/* </center> */}
                    </span>
                    
                    <div className="flex w-auto md:order-2 space-x-2 md:space-x-0 rtl:space-x-reverse">

                        {!user && (
                            <button type="button" className="text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center  dark:focus:ring-blue-800"><span onClick={() => navigate('/login')} className="color-red">Login</span> | <span className="color-red" onClick={() => navigate('/register')}>Register</span></button>
                        )}
                        {user && (
                            <>
                                <button onClick={() => navigate('/post/')} className="bg-blue-700 text-white rounded-full hover:bg-green-700 text-sm font-semibold px-3 mt-2  mx-4"><i className="fa fa-camera"></i> Upload</button>
                                <img src={user && user.Profile} className="w-8 mt-2 cursor-pointer rounded-full border-2 border-white h-8" onClick={() => navigate('/profile')} alt="" />
                                <button type="button" className="text-white font-medium rounded-lg text-sm px-3 py-2 text-center cursor-pointer"><span className="text-pink-700 underline underline-offset-4" onClick={() => navigate('/profile')}>{user && user.Name}</span></button>
                            </>
                        )}
                        <button onClick={toggleMenu} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    <div className={`items-center justify-between w-full min-w-[300px] md:flex md:w-auto md:order-1 ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-sticky">
                        <ul className="flex ml-2 w-full flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700 float-left">
                            <center>
                                <li className="w-full">
                                    {user && <button onClick={() => setSearch(!search)} className="text-white border-0 md:p-1 px-2 md:px-3 md:rounded-full font-semibold">Search</button>}
                                </li>
                            </center>
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    );
})
export default Navbar;
