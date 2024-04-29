import React, { useEffect, useState } from 'react';
import { ErrorForm, LoginFormInterface, LoginValidation } from './LoginInterface';
import { Offcanvas } from '../Components/Canvas';
import Logo from '/Logo.png';
import { FormInput } from '../Components/Input';
import { LoginValidate } from './Validation';
import { AppDispatch, RootState } from '../../Store/Store';
import { useDispatch, useSelector } from 'react-redux';
import { AuthUser, login } from '../../Store/UserStore/Authentication/AuthSlice';
import Preloader from '../Components/Preloader';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { encryptUserID } from '../../Common';


const LoginForm: React.FC = () => {
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
        const token = Cookies.get('token')
        if (token) {
            dispatch(AuthUser({ token })).then((state: any) => {
                if (state.payload.user) {
                    navigate('/')
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
    const { loading } = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()
    const userLogin = async () => {
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
        dispatch(login({ Email, Password })).then((state: any) => {
            let userId = '';
            let toastify = toast.error
            if (state.payload.status === 200) {
                userId = state.payload.user._id ? encryptUserID(state.payload.user._id) : '';
                toastify = toast.success
            }
            if (state.payload.status === 210) {
                Cookies.set('token', state.payload.message)
                navigate('/')
            }
            toastify(state.payload.message, {
                position: 'top-center',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                onClose: state.payload.status === 200 ? () => navigate('/otp/' + userId) : undefined,
                style: {
                    minWidth: '400px',
                    fontSize: '14px'
                }
            });
        })
    }

    if (loading) {
        return <Preloader />
    }

    return (
        <>
            <Offcanvas />
            <ToastContainer />
            <div className='md:w-2/4 md:ml-[25%] w-full justify-center ml-0 h-auto rounded-md mt-24 text-white '>
                <div>
                    <div className="mx-auto text-center w-1/2">
                        <div className="w-full">
                            <img src={Logo} className='w-24 h-24 rounded-full border-violet shadow-lg bg-white justify-center mt-4 shadow-red-700 inline-block' alt="" />
                        </div>
                        <h1 className='font-semibold md:text-2xl text-lg mt-5 text-pretty inline-block'>Welcome to Xoro Online</h1>
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
                                    <button onClick={userLogin} className='w-full md:w-[300px] h-10 rounded-md bg-green-700 text-white font-semibold text-sm px-4 py-2'>Login</button>
                                </center>
                            </div>
                            <div className="w-full md:w-1/2 float-left">
                                <center><span onClick={() => navigate('/register')} className='font-medium text-sm float-none md:float-left hover:text-green-700'>Don't have an account ?</span></center>
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
};

export default LoginForm;
