import * as interfaces from "./interfaces"
import axios from "axios"
import Config from "../../../Configs/config"
import { createAsyncThunk } from "@reduxjs/toolkit"
export const search = createAsyncThunk<interfaces.searchResponse, interfaces.searchData>(
    "search",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await searchUser(credentials)
            return response;
        } catch (e) {
            return rejectWithValue(<interfaces.searchResponse>{
                message: 'Internal Server Error',
                status: 500
            })
        }
    }
)

export const addCommentThunk = createAsyncThunk<interfaces.addCommentResponse, interfaces.addComment>(
    "comment",
    async (credentails, { rejectWithValue }) => {
        try {
            const response = await addComments(credentails)
            return response
        } catch (e) {
            return rejectWithValue(<interfaces.addCommentResponse>{
                message: 'Internal Server Error',
                status: 500
            })
        }
    }
)

export const getCommentThunk = createAsyncThunk<interfaces.getCommentResponse, interfaces.getComments>(
    "comment",
    async (credentails, { rejectWithValue }) => {
        try {
            const response = await getComments(credentails)
            return response
        } catch (e) {
            return rejectWithValue(<interfaces.addCommentResponse>{
                message: 'Internal Server Error',
                status: 500
            })
        }
    }
)




//// 

export const searchUser: Function = async ({ search, token }: interfaces.searchData) => {
    try {
        const response = await axios.get(`${Config.BASE}/search/${search}`, {
            headers: {
                Authorization: token
            },
        })
        return response.data
    } catch (e) {
        return {
            message: "Internal Server Error",
            status: 500,
        }
    }
}

export const addComments: Function = async ({ Comment, PostId, token }: interfaces.addComment) => {
    try {
        const response = await axios.post(`${Config.BASE}/comment/${PostId}`, { Comment }, {
            headers: {
                Authorization: token
            },
        })
        return response.data
    } catch (e) {
        return {
            message: "Internal Server Error",
            status: 500,
        }
    }
}

export const getComments: Function = async ({ PostId, token }: interfaces.addComment) => {
    try {
        const response = await axios.get(`${Config.BASE}/comment/${PostId}`, {
            headers: {
                Authorization: token
            },
        })
        return response.data
    } catch (e) {
        return {
            message: "Internal Server Error",
            status: 500,
        }
    }
}
