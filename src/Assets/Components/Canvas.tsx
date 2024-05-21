import React, { useState, Fragment, memo } from "react";
import Navbar from "./Navbar";
import Buttons from "./Buttons";
import { Drawer } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store/Store";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { resetState } from "../../Store/UserStore/Authentication/AuthSlice";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faDisplay, faAward, faFeed, faHome, faComments } from '@fortawesome/free-solid-svg-icons'

export const Offcanvas: React.FC = memo(() => {
    const [openLeft, setOpenLeft] = useState<boolean>(false);
    const openDrawerLeft = () => setOpenLeft(true);
    const closeDrawerLeft = () => setOpenLeft(false);
    const { user } = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()
    const logout = () => {
        Cookies.remove('token');
        dispatch(resetState())
        navigate('/login')
    }
    return (
        <Fragment>
            <div className="flex flex-wrap gap-4">
                <Navbar openDrawerLeft={openDrawerLeft} />
            </div>
            {/* {!openLeft && (
                <div>
                    <div className="w-[70px] mt-[70px] min-h-full z-10 fixed float-left bg-[#000] border-r-2 rounded-lg">
                        <div className="h-auto snap-center font-medium">
                            <center>
                                <button className="text-white text-2xl font-semibold w-full">
                                    <FontAwesomeIcon icon={faHome}/>
                                </button>
                            </center>                        </div>
                        <div className="mt-3 h-auto snap-center font-medium">
                            <center><button className="text-white text-2xl font-semibold w-full"><i className="fa fa-play"></i></button></center>
                        </div>
                        <div className="mt-3 h-auto snap-center font-medium">
                            <center><button className="text-white text-2xl font-semibold w-full">
                                <i className="fa fa-video-camera"></i>
                            </button></center>
                        </div>
                        <div className="mt-3 h-auto snap-center font-medium">
                            <center><button className="text-white text-2xl font-semibold w-full"><FontAwesomeIcon icon={faFeed} className="text-white" /></button></center>
                        </div>
                        <div className="mt-3 h-auto snap-center font-medium">
                            <center><button className="text-white text-2xl font-semibold w-full"><FontAwesomeIcon icon={faDisplay} className="text-white" /></button></center>
                        </div>
                        <div className="mt-3 h-auto snap-center font-medium">
                            <center><button className="text-white text-2xl font-semibold w-full"><FontAwesomeIcon icon={faAward} /></button></center>
                        </div>
                        <div className="mt-3 h-auto snap-center font-medium">
                            <center><button className="text-white text-2xl font-semibold w-full"><FontAwesomeIcon icon={faComments} /></button></center>
                        </div>
                    </div>
                </div>
            )} */}
            <Drawer
                placement="left"
                open={openLeft}
                onClose={closeDrawerLeft}
                className="p-0 bg-black" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
                <div>
                    <button className="px-4 pt-4" onClick={closeDrawerLeft}><i className="fa fa-close text-blue-700 hover:text-gray-600"></i></button>
                </div>
                <div className="mt-5 font-semibold h-auto snap-center py-5">
                    <Buttons text={'Home'} route={'/'} />
                    <Buttons text={'Videos'} route={'/videos'} />
                    <Buttons text={'Shorts'} route={'/shorts'} />
                    <Buttons text={'Feeds'} route={'/feed'} />
                    <Buttons text={'Stream now'} route={'/stream'} />
                    <Buttons text={'Rewards'} route={'/rewards'} />
                    <Buttons text={'Contact'} route={'/contact'} />
                </div>
                <div className="mt-20 h-auto">
                    <div className="w-full h-12 px-4">
                        <div className={`w-full h-full text-white font-semibold`}>
                            {!user ? (
                                <>
                                    <button className={`w-1/2 h-full cursor-pointer rounded-l-2xl text-white hover:bg-blue-900`} onClick={() => navigate('/login')}>Login</button>
                                    <button className={`w-1/2 h-full cursor-pointer rounded-r-2xl text-white  hover:bg-blue-900`} onClick={() => navigate('/register')}>Register</button>
                                </>
                            ) : (
                                <center>
                                    <button onClick={logout} className={`w-1/2 bg-red-500 p-2 px-3 h-full cursor-pointer rounded-2xl text-white hover:bg-red-800 `}>Logout</button>
                                </center>
                            )}
                        </div>
                    </div>
                </div>
            </Drawer>

        </Fragment>
    )
})