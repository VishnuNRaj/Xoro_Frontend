import React, { useEffect, useState, ChangeEvent } from "react";
import { useEssentials, useToast } from '../../Functions/CommonFunctions';
import Preloader from "../Components/Preloader";
import { verifyAccount } from "../../Store/UserStore/Authentication/AuthSlice";
import Logo from '/Logo.png';
import { FormInput } from './../Components/Input';
import { AddProfilePic } from '../../Store/UserStore/Authentication/AuthSlice';
import { useParams } from "react-router-dom";
interface Params {
    [key: string]: string;
}
interface Params {
    UserId: string;
    VerificationLink: string;
}
const VerifyAccount: React.FC = () => {
    const { navigate, dispatch, auth } = useEssentials()
    const { loading, message, user } = auth
    const { UserId, VerificationLink } = useParams<Params>();
    const [Profile, setProfile] = useState<File | null>(null);
    const [RememberMe, setRememberMe] = useState<boolean>(true);
    const [show, setShow] = useState<string>('');
    const [Username, setUsername] = useState<string>('');
    const [error] = useState<string>('');
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file: File = e.target.files[0];
            if (!file.type.startsWith('image/')) {
                return useToast('Please Upload Image Files', "error");
            }
            setProfile(file);
            const reader = new FileReader();
            reader.onload = function (e) {
                const target = e.target as FileReader;
                if (target.result) {
                    setShow(target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };


    useEffect(() => {
        if (UserId && VerificationLink) {
            dispatch(verifyAccount({ UserId, VerificationLink })).then((state: any) => {
                if (state.payload.user) {
                    const data = state.payload.user
                    setUsername(data.Username)
                    setShow(data.Profile)
                } else {
                    useToast(state.payload.message, 'error');
                }

            })
        }
    }, [dispatch, UserId, VerificationLink]);

    const updateAll = async () => {
        try {
            const usernameRegex = /^[a-z0-9_.-]+$/;
            if (!usernameRegex.test(Username)) {
                return useToast('Enter Username Properly', "error");
            }
            const data = {
                Username: Username,
                Profile: Profile ? Profile : show,
                UserId: UserId,
                RememberMe: RememberMe
            }
            if (Username && show && UserId) {
                dispatch(AddProfilePic(data)).then((state: any) => {
                    let toastify = 'error';
                    if (state.payload.status === 200) {
                        toastify = 'success';
                    }
                    useToast(state.payload.message, toastify);
                    if (state.payload.status === 200) {
                        return navigate('/')
                    }
                })
            }
        } catch (e) {
            return false
        }
    }


    if (user) {
        return (
            <>
                {loading && <Preloader />}
                <div className='mt-[100px]'>
                    <div className='md:w-2/4 md:ml-[25%] w-full justify-center ml-0 h-auto rounded-md mt-10 text-white '>
                        <div>
                            <div className="mx-auto text-center w-1/2">
                                <div className="w-full">
                                    <img crossOrigin="anonymous" src={Logo} className='w-20 h-20 rounded-full border-violet shadow-lg bg-white justify-center shadow-red-700 inline-block' alt="" />
                                </div>
                                <h1 className='font-semibold md:text-2xl text-lg mt-5 text-pretty inline-block'>Upload Your Profile Image</h1>
                            </div>
                            <center><p className='text-red-700 text-lg font-semibold'></p></center>
                            <div className="w-full">
                                <div className='float-left w-full md:w-full mb-4'>
                                    <center>
                                        <img crossOrigin="anonymous" src={show} alt="" className="w-28 h-28 mt-10 rounded-full border-2 p-2 border-violet-700" />
                                        <label htmlFor="fileInput" className="text-center">
                                            <i className="h-8 w-8 pt-[6px] mt-3 text-center fa fa-plus border-2 border-red-700 rounded-full"></i>
                                            <input
                                                id="fileInput"
                                                type="file"
                                                name="Profile"
                                                accept="image/*"
                                                onChange={handleChange}
                                                hidden
                                                className=""
                                            />
                                        </label>
                                        <FormInput width={'w-full md:w-2/4 mt-5'} type={'text'} error={error} label="Username" placeholder="Enter Username" value={Username} name="Username" onChange={(e) => setUsername(e.target.value)} />
                                        <div className="mt-3 w-full float-left">
                                            <input
                                                id="purple-checkbox"
                                                type="checkbox"
                                                className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                checked={RememberMe}
                                                onChange={() => setRememberMe(!RememberMe)}
                                            />
                                            <label htmlFor="purple-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember Me</label>
                                        </div>
                                        <button className="p-2 px-4 border-0 bg-green-700 rounded-md text-white mt-4" onClick={updateAll} >Update</button>
                                    </center>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div>
            {loading && <Preloader />}
            <center>
                <img crossOrigin="anonymous" src={Logo} className='w-24 h-24 mt-[200px] rounded-full border-violet shadow-lg bg-white justify-center shadow-red-700 inline-block' alt="" />
                <h1 className="text-violet-700 font-medium mt-20 text-4xl">!! {message} !!</h1>
            </center>
        </div>
    );
};
export default VerifyAccount;
