import * as interfaces from "./Interfaces";
import axios from "axios";
import config from "../../../../Configs/config";
export const addCategory: Function = async (data:interfaces.addCategory): Promise<interfaces.addCategoryResponse> => {
    try {
        const response = await axios.put(`${config.ADMIN}/category`,data,{
            headers:{
                Authorization:data.token
            }
        })
        return response.data
    } catch (e) {
        return <interfaces.addCategoryResponse>{
            message:"Internal Server Error",
            status:500
        }
    }
}

export const editCategory: Function = async (data:interfaces.editCategory): Promise<interfaces.editCategoryResponse> => {
    try {
        const response = await axios.patch(`${config.ADMIN}/category/edit`,data,{
            headers:{
                Authorization:data.token
            }
        })
        return response.data
    } catch (e) {
        return <interfaces.editCategoryResponse>{
            message:"Internal Server Error",
            status:500
        }
    }
}


export const deleteCategory: Function = async (data:interfaces.deleteCategory): Promise<interfaces.deleteCategoryResponse> => {
    try {
        const response = await axios.delete(`${config.ADMIN}/category/:${data.id}`,{
            headers:{
                Authorization:data.token
            }
        })
        return response.data
    } catch (e) {
        return <interfaces.deleteCategoryResponse>{
            message:"Internal Server Error",
            status:500
        }
    }
}

export const getCategory: Function = async (data:interfaces.getCategory): Promise<interfaces.getCategoryResponse> => {
    try {
        const response = await axios.get(`${config.ADMIN}/category/${data.skip}`,{
            headers:{
                Authorization:data.token
            }
        })
        return response.data
    } catch (e) {
        return <interfaces.getCategoryResponse>{
            message:"Internal Server Error",
            status:500
        }
    }
}
