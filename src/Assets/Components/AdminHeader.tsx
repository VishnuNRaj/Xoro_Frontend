import React, { Fragment, memo, useState } from "react";
import Logo from '/Logo.png';
import Search from "./Search";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store/Store";
import { resetState } from "../../Store/UserStore/Authentication/AuthSlice";
import Preloader from "./Preloader";
import Buttons from "./Buttons";
import Cookies from 'js-cookie';
import { Drawer } from "@material-tailwind/react";

interface NavbarProps {
    openDrawerLeft: () => void;
}

const NavbarAdmin: React.FC<NavbarProps> = memo(({ openDrawerLeft }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { admin } = useSelector((state: RootState) => state.admin)
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <nav className="fixed w-full z-20 top-0 start-0 black-varient-1 border-b-2">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <span className="flex items-center space-x-3 rtl:space-x-reverserounded-full">
                        <img src={Logo} onClick={openDrawerLeft} className="h-8 shadow-lg shadow-red-700 rounded-full bg-white border-2 border-white" alt="" />
                    </span>
                    <div className="flex w-auto px-5 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        {admin && (
                            <button type="button" className="text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center  dark:focus:ring-blue-800"><span className="text-red-700">{admin && admin.Name}</span></button>
                        )}
                        <button onClick={toggleMenu} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    <div className={`items-center justify-between w-full min-w-[300px] md:flex md:w-auto md:order-1 ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-sticky">
                        <ul className="flex w-full flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700 float-left">
                            <li className="w-full">
                                <Search />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    );
})

export const OffcanvasAdmin: React.FC = memo(() => {
    const [openLeft, setOpenLeft] = useState<boolean>(false);
    const openDrawerLeft = () => setOpenLeft(true);
    const closeDrawerLeft = () => setOpenLeft(false);
    const { user, loading } = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()
    const logout = () => {
        Cookies.remove('admin');
        dispatch(resetState())
        navigate('/admin/login')
    }
    if (loading) {
        return <Preloader />
    }
    return (
        <Fragment>
            <div className="flex flex-wrap gap-4">
                <NavbarAdmin openDrawerLeft={openDrawerLeft} />
            </div>
            <Drawer
                placement="left"
                open={openLeft}
                onClose={closeDrawerLeft}
                className="p-0 bg-black"
            >
                <div>
                    <button className="px-4 pt-4" onClick={closeDrawerLeft}><i className="fa fa-close text-blue-700 hover:text-purple-800"></i></button>
                </div>
                <div className="mt-5  h-auto snap-center font-medium py-5">
                    <Buttons text={'Dashboard'} route={'/admin/'} />
                    <Buttons text={'Manage Users'} route={'/admin/users'} />
                    <Buttons text={'Manage Post'} route={'/admin/post'} />
                    <Buttons text={'Manage Report'} route={'/admin/report'} />
                    <Buttons text={'Manage Streams'} route={'/admin/streams'} />
                    <Buttons text={'Manage Rewards'} route={'/admin/rewards'} />
                    <Buttons text={'Notifications'} route={'/admin/notification'} />
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
                                    <button onClick={logout} className={`w-1/2 bg-red-700 p-2 px-3 h-full cursor-pointer rounded-2xl text-white hover:bg-red-800`}>Logout</button>
                                </center>
                            )}
                        </div>
                    </div>
                </div>
            </Drawer>

        </Fragment>
    )
})
