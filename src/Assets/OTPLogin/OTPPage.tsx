import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Logo from '/Logo.png'
import { FormInput } from '../Components/Input';
import { AuthUser, OTPLogin, resendOtp } from '../../Store/UserStore/Authentication/AuthSlice';
import { decryptUserID } from '../../Common';
import Preloader from '../Components/Preloader';
import { useEssentials, getCookie, useToast } from '../../Functions/CommonFunctions';


interface Params {
    [key: string]: string | undefined;
}

const OTPPage: React.FC = () => {
    const [error, setError] = useState<string>('')
    const [OTP, setOTP] = useState<string>('')
    const [RememberMe, setRememberMe] = useState<boolean>(false)
    let { UserId } = useParams<Params>();
    const {dispatch,navigate,auth} = useEssentials()
    const { loading } = auth;
    useEffect(() => {
        const token:string | undefined = getCookie('token')
        if (token) {
            dispatch(AuthUser({ token })).then((state: any) => {
                if (state.payload.user) {
                    navigate('/')
                }
            })
        }
    }, [])
    const verifyOTP = async () => {
        if (!OTP || OTP.length !== 6 || isNaN(parseInt(OTP))) {
            return setError('Enter Valid OTP')
        }
        UserId = decryptUserID(UserId)
        dispatch(OTPLogin({ OTP, RememberMe, UserId })).then((state: any) => {
            let toastify = 'error';
            if (state.payload.status === 200) {
                toastify = 'success';
            }
            useToast(state.payload.message,toastify)
            if (state.payload.status === 200) {
                navigate('/')
            }
        })
    }
    return (
        <>
            {loading && <Preloader />}
            <div className='md:w-2/4 md:ml-[25%] w-full justify-center ml-0 h-auto rounded-md mt-24 text-white '>
                <div>
                    <div className="mx-auto text-center w-1/2">
                        <div className="w-full">
                            <img crossOrigin="anonymous" src={Logo} className='w-24 h-24 rounded-full border-violet shadow-lg bg-white justify-center mt-4 shadow-red-700 inline-block' alt="" />
                        </div>
                        <h1 className='font-semibold md:text-2xl text-lg mt-5 text-pretty inline-block'>Welcome to Xoro Online</h1>
                    </div>
                    <center><p className='text-red-700 text-lg font-semibold'></p></center>
                    <div className="w-full">
                        <div className="w-3/4 p-4 bg-[#111] rounded-lg mb-5 mt-5 inline-block justify-center mx-[12.5%] md:mx-[12.5%] ">
                            <div className='float-left w-full md:w-full mb-4'>
                                <FormInput error={error} width={'w-full'} label={'OTP'} name={'OTP'} value={OTP} onChange={(e) => setOTP(e.target.value)} placeholder={'Enter OTP'} type={'text'} />
                            </div>
                            <div className="mt-3 w-full float-left">
                                <input
                                    id="purple-checkbox"
                                    type="checkbox"
                                    className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    checked={RememberMe}
                                    onChange={() => setRememberMe(!RememberMe)}
                                />
                                <label htmlFor="purple-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember Me</label>
                                <span className="ms-2 text-sm font-medium text-gray-900 float-right dark:text-gray-300" onClick={() => {
                                    if (UserId) {
                                        const id = decryptUserID(UserId);
                                        dispatch(resendOtp({ UserId: id }))
                                    }
                                }}>Resend OTP</span>
                            </div>
                            <center>
                                <button className="p-2 px-4 border-0 bg-green-700 rounded-md text-white mt-4" onClick={verifyOTP} >Update</button>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default OTPPage;