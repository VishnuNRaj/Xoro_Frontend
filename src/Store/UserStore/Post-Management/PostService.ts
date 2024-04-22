import axios from "axios";
import * as interfaces from "./Interfaces";

export const addPost: Function = async (data:interfaces.addPost):Promise<interfaces.addPostResponse> => {
    try {
        const response = await axios.post('http://localhost:6700/post/add-post', data,{
            headers:{
                Authorization: `${data.token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data
    } catch (e) {
        return <interfaces.addPostResponse>{
            message: 'Internal Server Error',
        }
    }
}

export const showPost:Function = async (data: interfaces.showPost): Promise<interfaces.showPostResponse> => {
    try {
        const response = await axios.get('http://localhost:6700/post/',{
            headers:{
                Authorization: `${data.token}`,
            }
        });
        return response.data
    } catch (e) {
        return <interfaces.showPostResponse>{
            message: 'Internal Server Error',
        }
    }
}

