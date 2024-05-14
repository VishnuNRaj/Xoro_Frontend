import config from '../../../Configs/config';
import * as interfaces from './interfaces';
import axios from 'axios'


export const editProfilePic: Function = async (data: interfaces.EditProfilePic) => {
    try {
        const formData = new FormData();
        formData.append('Image', data.Image);
        const response = await axios.post(`${config.PROFILE}/edit-profile-pic`, formData, {
            headers: {
                Authorization: `${data.token}`,
            }
        })
        return response.data
    } catch (e) {
        return <interfaces.EditProfilePicResponse>{
            message: 'Internal Server Error'
        }
    }
}

export const editBanner: Function = async (data: interfaces.EditBanner) => {
    try {
        const formData = new FormData();
        formData.append('Image', data.Image);
        const response = await axios.post(`${config.PROFILE}/edit-banner`, formData, {
            headers: {
                Authorization: `${data.token}`,
            }
        })
        return response.data
    } catch (e) {
        return <interfaces.EditProfilePicResponse>{
            message: 'Internal Server Error'
        }
    }
}

export const profileSettings: Function = async (data: interfaces.profileSettings): Promise<interfaces.profileSettingsResponse> => {
    try {
        const response = await axios.post(`${config.PROFILE}/profile-settings`, data, {
            headers: {
                Authorization: `${data.token}`,
            }
        })
        return response.data
    } catch (e) {
        return <interfaces.profileSettingsResponse>{
            message: 'Internal Server Error'
        }
    }
}

export const searchUsers: Function = async (data: interfaces.searchUsers) => {
    try {
        const response = await axios.get(`${config.PROFILE}/search/${data.search}`, {
            headers: {
                'Authorization': data.token,
            }
        })
        return response.data;
    } catch (e) {
        return { message: 'Internal Server Error' }
    }
}

export const editProfile: Function = async (data: interfaces.editProfile) => {
    try {
        const response = await axios.post(`${config.PROFILE}/edit-profile/`,data, {
            headers: {
                'Authorization': data.token,
            }
        })
        return response.data;
    } catch (e) {
        return { message: 'Internal Server Error' }
    }
}