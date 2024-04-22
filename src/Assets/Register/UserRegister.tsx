import React, { useEffect, useState } from 'react';
import { ErrorForm, RegisterForm, RegisterValidate } from './RegisterInterface';
import { Offcanvas } from '../Components/Canvas';
import Logo from '/Logo.png';
import { FormInput } from '../Components/Input';
import { validateForm } from './Validation';
import { useDispatch, useSelector } from 'react-redux';
import { AuthUser, register } from '../../Store/UserStore/Authentication/AuthSlice';
import { AppDispatch, RootState } from '../../Store/Store';
import Preloader from '../Components/Preloader';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const SignUpForm: React.FC = () => {
    const navigate = useNavigate()
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
    const [Form, SetForm] = useState<RegisterForm>({
        Name: "",
        Email: "",
        Password: "",
        Phone: null,
        ConfirmPassword: ""
    });
    const [errors, setErrors] = useState<ErrorForm>({
        Name: "",
        Email: "",
        Password: "",
        Phone: '',
        ConfirmPassword: "",
        Main: ""
    });

    const { loading, message } = useSelector((state: RootState) => state.auth)
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
    const dispatch: AppDispatch = useDispatch()
    const userRegister = () => {
        const response: RegisterValidate = validateForm(Form);
        if (!response.status) {
            const error: ErrorForm = response.ErrorForm;
            if (error.Main) {
                setErrors({ ...errors, Main: error.Main });
                return false;
            }
            setErrors(error);
            return false;
        }
        const { Name, Email, Password, Phone } = Form;
        dispatch(register({ Name, Email, Password, Phone }));
    };

    if (loading) {
        return <Preloader />
    }

    return (
        <>
            <Offcanvas />
            <div className='md:w-2/4 md:ml-[25%] w-full justify-center ml-0 h-auto rounded-md mt-20 text-white '>
                <div className='p-0'>
                    <div className="mx-auto text-center w-1/2">
                        <div className="w-full">
                            <img src={Logo} className='w-24 h-24 rounded-full border-violet shadow-lg bg-white justify-center mt-4 shadow-red-700 inline-block' alt="" />
                        </div>
                        <h1 className='font-semibold md:text-2xl text-lg mt-2 text-pretty inline-block'>Welcome to Xoro Online</h1>
                    </div>
                    <center><p className='text-red-700 text-lg font-semibold'>{errors.Main ? errors.Main : message}</p></center>
                    <div className="w-full">
                        <div className="w-3/4 p-3 pt-4 bg-[#111] rounded-lg mb-5 mt-5 inline-block justify-center mx-[12.5%] md:mx-[12.5%] ">
                            <div>
                                <div className='float-left w-full mb-4'>
                                    <FormInput error={errors.Name} width={'w-full'} label={'Full Name'} name={'Name'} value={Form.Name} onChange={handleChange} placeholder={'Enter Full Name'} type={'text'} />
                                </div>
                            </div>
                            <div className='float-left w-full md:w-full mb-4'>
                                <FormInput error={errors.Email} width={'w-full'} label={'Email'} name={'Email'} value={Form.Email} onChange={handleChange} placeholder={'Enter Email Address'} type={'text'} />
                            </div>
                            <div className='float-left w-full md:w-full mb-4'>
                                <FormInput error={errors.Phone} width={'w-full'} label={'Phone NO'} name={'Phone'} value={Form.Phone ? Form.Phone.toString() : ''} onChange={handleChange} placeholder={'Enter Phone NO'} type={'text'} />
                            </div>
                            <div>
                                <div className='float-left w-full ml-0 mb-4'>
                                    <FormInput error={errors.Password} width={'w-full'} label={'Password'} name={'Password'} value={Form.Password} onChange={handleChange} placeholder={'Enter Password'} type={'password'} />
                                </div>
                                <div className='float-left w-full ml-0  mb-4'>
                                    <FormInput error={errors.ConfirmPassword} width={'w-full'} label={'Confirm Password'} name={'ConfirmPassword'} value={Form.ConfirmPassword} onChange={handleChange} placeholder={'Confirm Password'} type={'password'} />
                                </div>
                            </div>
                            <div className='float-left w-full md:w-full mb-4'>
                                <center>
                                    <button onClick={userRegister} className='w-full md:w-[300px] h-10 rounded-md bg-green-700 text-white font-semibold text-sm px-4 py-2'>Sign Up</button>
                                </center>
                            </div>
                            <div className="w-full float-left">
                                <center><span onClick={()=>navigate('/login')} className='font-medium text-sm hover:text-green-700'>Already have an account ?</span></center>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default SignUpForm;
