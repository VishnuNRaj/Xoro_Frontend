import * as interfaces from './Interfaces'
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import * as postService from './PostService'

export const addPost = createAsyncThunk<interfaces.addPostResponse, interfaces.addPost>(
    'post/addPost',
    async (credentials: interfaces.addPost, { rejectWithValue }) => {
        try {
            const data = await postService.addPost(credentials);
            return data;
        } catch (error) {
            return rejectWithValue(<interfaces.addPostResponse>{
                message: 'Internal Server Error',
                status: 500
            })
        }
    }
)

export const showPost = createAsyncThunk<interfaces.showPostResponse, interfaces.showPost>(
    'post/showPost',
    async (credentials: interfaces.showPost, { rejectWithValue }) => {
        try {
            const data = await postService.showPost(credentials);
            return data;
        } catch (error) {
            return rejectWithValue(<interfaces.addPostResponse>{
                message: 'Internal Server Error',
                status: 500
            })
        }
    }
)

const initialState: interfaces.PostState = {
    loadingPost: false,
    message: '',
    post: []
}
const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        resetPostState: (state) => {
            Object.assign(state, initialState);
        }
    },
    extraReducers: (builder) => {
        builder.
            addCase(addPost.pending, (state) => {
                state.loadingPost = true;
                state.message = '';
            })
            .addCase(addPost.fulfilled, (state, action: PayloadAction<interfaces.addPostResponse>) => {
                state.message = action.payload.message;
                state.loadingPost = false;
            })
            .addCase(showPost.pending, (state) => {
                state.loadingPost = true;
                state.message = '';
            })
            .addCase(showPost.fulfilled, (state, action: PayloadAction<interfaces.showPostResponse>) => {
                state.message = action.payload.message;
                state.loadingPost = false;
                state.post = action.payload.post ? action.payload.post : [];
            })
    },
})

export const { resetPostState } = postSlice.actions
export default postSlice.reducer