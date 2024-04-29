import React, { memo, useState } from "react";
// import Logo from '/Logo.png';
import Search from "./Search";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/Store";
import Preloader from "./Preloader";

interface NavbarProps {
    openDrawerLeft: () => void;
}

export const Navbar: React.FC<NavbarProps> = memo(({ openDrawerLeft }) => {
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, loading } = useSelector((state: RootState) => state.auth)
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    if (loading) {
        return <Preloader />
    }

    return (
        <>
            <nav className="fixed w-full z-20 top-0 start-0 black-varient-1">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between p-4 pl-0">
                    <span className="flex items-center w-[10%] px-5 rtl:space-x-reverserounded-full">
                        <center>
                            <button className=" h-8 w-8 shadow-lg shadow-red-700 rounded-full  border-2 border-white"> <i onClick={openDrawerLeft} className="text-white fa fa-bars w-full"></i></button>
                        </center>
                    </span>
                    <div className="flex w-auto md:order-2 space-x-2 md:space-x-0 rtl:space-x-reverse">

                        {!user && (
                            <button type="button" className="text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center  dark:focus:ring-blue-800"><span onClick={() => navigate('/login')} className="color-red">Login</span> | <span className="color-red" onClick={() => navigate('/register')}>Register</span></button>
                        )}
                        {user && (
                            <>
                                <button onClick={() => navigate('/post/camera')} className="bg-blue-700 text-white rounded-full hover:bg-green-700 text-sm font-semibold px-3 mt-2  mx-4"><i className="fa fa-camera"></i> Upload</button>
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
                        <ul className="flex w-full flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700 float-left">
                            <li className="w-full">
                                {user && <Search />}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    );
})
export default Navbar;
