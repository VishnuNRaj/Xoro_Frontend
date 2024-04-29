import * as interfaces from './interfaces';
import axios from 'axios'


export const editProfilePic: Function = async (data: interfaces.EditProfilePic) => {
    try {
        const formData = new FormData();
        formData.append('Image', data.Image);
        const response = await axios.post('http://localhost:6700/profile/edit-profile-pic', formData, {
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
        const response = await axios.post('http://localhost:6700/profile/edit-banner', formData, {
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
        const response = await axios.post('http://localhost:6700/profile/profile-settings', data, {
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