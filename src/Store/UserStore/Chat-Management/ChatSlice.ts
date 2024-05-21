import { createAsyncThunk,createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as interfaces from './interfaces';
import * as chatService from './ChatService';

export const chatInitialState = <interfaces.ChatState>{
    allChats:[],
    chat:[],
    loadingChat:false,
    Notifications:[]
}

export const chatSlice = createSlice({
    name:'chat',
    initialState:chatInitialState,
    reducers:{
        resetChatState:(state)=>{
            Object.assign(state,chatInitialState)
        }
    },
    extraReducers:(builder)=>{

    }
})


export default chatSlice.reducer