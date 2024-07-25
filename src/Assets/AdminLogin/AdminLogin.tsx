import React, { useEffect, useState } from 'react';
import { ErrorForm, LoginFormInterface, LoginValidation } from './adminLoginInterface'
import { toast, Toaster } from 'sonner';
import { FormInput } from '../Components/Input';
import Logo from '/Logo.png'
import { LoginValidate } from './ValidateAdmin';
import { adminLogin, adminVerifyAuth } from '../../Store/AdminStore/Authentication/AuthSlice';
import Preloader from '../Components/Preloader';
import { useEssentials, getCookie } from '../../Functions/CommonFunctions';
// import { OffcanvasAdmin } from '../Components/AdminHeader';

const AdminLogin: React.FC = () => {
    const [Form, SetForm] = useState<LoginFormInterface>({
        Email: "",
        Password: "",
    });
    const [errors, setErrors] = useState<ErrorForm>({
        Email: "",
        Password: "",
        Main: ""
    });
    useEffect(() => {
        const token: string | undefined = getCookie('admin')
        if (token) {
            dispatch(adminVerifyAuth({ token })).then((state: any) => {
                if (state.payload.admin) {
                    navigate('/admin')
                } else {
                    toast.error(state.payload.message, {
                        position: 'top-center',
                        duration: 3000,
                    });
                    if (state.payload.status == 200) return navigate('/')
                }
            })
        }
    }, [])
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        SetForm({
            ...Form,
            [e.target.name]: e.target.value
        });
        setErrors({
            ...errors,
            [e.target.name]: "",
            Main: ""
        });
    };
    const { dispatch, navigate, Admin } = useEssentials()
    const { loading } = Admin
    const admin = async () => {
        const response: LoginValidation = LoginValidate(Form)
        if (!response.status) {
            const error: ErrorForm = response.ErrorForm
            if (error.Main) {
                setErrors({ ...errors, Main: error.Main })
                return false
            }
            setErrors(error)
            return false
        }
        const { Email, Password } = Form
        dispatch(adminLogin({ Email, Password })).then((state: any) => {
            let toastify: "success" | "error" = state.payload.status === 200 ? "success" : "error";
            toast[toastify](state.payload.message, {
                position: "top-right",
                duration: 2000,
                onAutoClose: () => {
                    if (toastify === "success") return navigate(`/admin/otp/${state.payload.admin._id}`)
                }
            })
        })
    }

    if (loading) {
        return <Preloader />
    }

    return (
        <>
            <Toaster richColors/>
            <div className='md:w-2/4 md:ml-[25%] w-full justify-center ml-0 h-auto rounded-md mt-24 text-white '>
                <div>
                    <div className="mx-auto text-center w-1/2">
                        <div className="w-full">
                            <img crossOrigin="anonymous" src={Logo} className='w-24 h-24 rounded-full border-violet shadow-lg bg-white justify-center mt-4 shadow-red-700 inline-block' alt="" />
                        </div>
                        <h1 className='font-semibold md:text-2xl text-lg mt-5 text-pretty inline-block'>Welcome to Xoro Admin</h1>
                    </div>
                    <center><p className='text-red-700 text-lg font-semibold'>{errors.Main}</p></center>
                    <div className="w-full">
                        <div className="w-3/4 p-4 bg-[#111] rounded-lg mb-5 mt-5 inline-block justify-center mx-[12.5%] md:mx-[12.5%] ">
                            <div className='float-left w-full md:w-full mb-4'>
                                <FormInput error={errors.Email} width={'w-full'} label={'Email'} name={'Email'} value={Form.Email} onChange={handleChange} placeholder={'Enter Email Address'} type={'text'} />
                            </div>
                            <div>
                                <div className='float-left w-full ml-0 mb-4'>
                                    <FormInput error={errors.Password} width={'w-full'} label={'Password'} name={'Password'} value={Form.Password} onChange={handleChange} placeholder={'Enter Password'} type={'password'} />
                                </div>
                            </div>
                            <div className='float-left w-full md:w-full mb-4'>
                                <center>
                                    <button onClick={admin} className='w-full md:w-[300px] h-10 rounded-md bg-green-700 text-white font-semibold text-sm px-4 py-2'>Login</button>
                                </center>
                            </div>
                            <div className="w-full md:w-1/2 float-left">
                                <center><span className='font-medium text-sm float-none md:float-left hover:text-green-700'>Don't have an account ?</span></center>
                            </div>
                            <div className="w-full md:w-1/2 float-left">
                                <center><span className='font-medium text-sm float-none md:float-right hover:text-green-700'>Forgot Password ?</span></center>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default AdminLogin