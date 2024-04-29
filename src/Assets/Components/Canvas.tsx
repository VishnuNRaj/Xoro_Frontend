import React, { useState, Fragment, memo } from "react";
import { Navbar } from "./Navbar";
import Buttons from "./Buttons";
import { Drawer } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store/Store";
import Preloader from "./Preloader";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { resetState } from "../../Store/UserStore/Authentication/AuthSlice";


export const Offcanvas: React.FC = memo(() => {
    const [openLeft, setOpenLeft] = useState<boolean>(false);
    const openDrawerLeft = () => setOpenLeft(true);
    const closeDrawerLeft = () => setOpenLeft(false);
    const { user, loading } = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()
    const logout = () => {
        Cookies.remove('token');
        dispatch(resetState())
        navigate('/login')
    }
    if (loading) {
        return <Preloader />
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
                className="p-0 bg-black"
            >
                <div>
                    <button className="px-4 pt-4" onClick={closeDrawerLeft}><i className="fa fa-close text-blue-700 hover:text-gray-600"></i></button>
                </div>
                <div className="mt-5  h-auto snap-center font-medium py-5">
                    <Buttons text={'Home'} route={'/'} />
                    <Buttons text={'Videos'} route={'/videos'} />
                    <Buttons text={'Shorts'} route={'/shorts'} />
                    <Buttons text={'Live'} route={'/live'} />
                    <Buttons text={'Stream now'} route={'/stream'} />
                    <Buttons text={'Rewards'} route={'/rewards'} />
                    <Buttons text={'Contact'} route={'/contact'} />
                </div>
                <div className="mt-20 h-auto">
                    <div className="w-full h-12 px-4">
                        <div className={`w-full h-full text-white `}>
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