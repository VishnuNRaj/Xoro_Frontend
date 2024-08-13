import React, { useState, Fragment, memo } from "react";
import Navbar from "./Navbar";
import Buttons from "./Buttons";
import { Drawer } from "@material-tailwind/react";
import { resetState } from "../../Store/UserStore/Authentication/AuthSlice";
import { useEssentials, removeCookie } from '../../Functions/CommonFunctions';



export const Offcanvas: React.FC = memo(() => {
    const [openLeft, setOpenLeft] = useState<boolean>(false);
    const openDrawerLeft = () => setOpenLeft(true);
    const closeDrawerLeft = () => setOpenLeft(false);
    const { navigate, dispatch, auth } = useEssentials()
    const { user } = auth

    const logout = () => {
        removeCookie('token');
        dispatch(resetState())
        navigate('/login')
    }
    return (
        <Fragment>
            <div className="flex flex-wrap gap-4">
                <Navbar openDrawerLeft={openDrawerLeft} />
            </div>
            <Drawer
                placement="left"
                open={openLeft}
                onClose={closeDrawerLeft}
                className="p-0 mb-10 bg-black" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
                <div>
                    <button className="mr-4 border-2 p-1 mt-4 float-right mb-2 flex items-center aspect-square w-9 h-9 justify-center rounded-full hover:bg-red-700 text-white" onClick={closeDrawerLeft}>
                        <svg className="w-5 h-5 font-semibold rotate-180" stroke="white" aria-hidden="true" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path clipRule="evenodd" fontWeight={'900'} fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                        </svg>
                    </button>                     

                </div>
                <div className="mt-8 space-y-2 font-semibold h-auto snap-center py-5">
                    <Buttons text={'Home'} route={'/'} />
                    <Buttons text={'Videos'} route={'/videos'} />
                    <Buttons text={'Shorts'} route={'/shorts'} />
                    <Buttons text={'Live'} route={'/live'} />
                    <Buttons text={'Stream now'} route={'/stream'} />
                    <Buttons text={'Channel'} route={'/channel'} />
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
                                    <button onClick={logout} className={`w-1/2 bg-red-700 p-2 px-3 h-full cursor-pointer rounded-lg text-white hover:bg-red-800 `}>Logout</button>
                                </center>
                            )}
                        </div>
                    </div>
                </div>
            </Drawer>

        </Fragment>
    )
})