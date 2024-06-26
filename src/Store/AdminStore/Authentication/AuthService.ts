import axios from "axios";
import * as interfaces from "./Interfaces";

export const adminLogin: Function = async (data: interfaces.AdminLogin): Promise<interfaces.AdminLoginResponse> => {
    try {
        const response = await axios.post('http://localhost:6700/admin/login', data, {
            withCredentials: true
        })
        return <interfaces.AdminLoginResponse>response.data
    } catch (e) {
        console.log(e)
        return <interfaces.AdminLoginResponse>{
            message: 'Internal server error',
        }
    }
}

export const adminOTP: Function = async (data: interfaces.adminVerifyOTP): Promise<interfaces.adminVerifyOTPResponse> => {
    try {
        const response = await axios.post(`http://localhost:6700/admin/otp/${data.UserId}`, data, {
            withCredentials: true
        })
        return <interfaces.adminVerifyOTPResponse>response.data
    } catch (e) {
        console.log(e)
        return <interfaces.adminVerifyOTPResponse>{
            message: 'Internal server error',
        }
    }
}

export const adminResendOTP: Function = async (data: interfaces.adminResendOTP): Promise<interfaces.adminResendOTPResponse> => {
    try {
        const response = await axios.post(`http://localhost:6700/admin/resendotp/${data.UserId}`, data, {
            withCredentials: true
        })
        return <interfaces.adminResendOTPResponse>response.data
    } catch (e) {
        return <interfaces.adminResendOTPResponse>{
            message: 'Internal server error',
        }
    }
}

export const verifyAdmin: Function = async (data: interfaces.adminVerifyAuth): Promise<interfaces.adminVerifyAuthResponse> => {
    try {
        const response = await axios.get('http://localhost:6700/admin/verify', {
            headers: {
                Authorization: `${data.token}`
            }
        })
        return <interfaces.adminVerifyAuthResponse>response.data
    } catch (e) {
        return <interfaces.adminVerifyAuthResponse>{
            message: 'Internal server error',
        }
    }
}