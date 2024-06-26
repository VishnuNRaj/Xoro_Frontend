import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import * as videoService from './VideoService'
import * as interfaces from './Interfaces'

export const uploadVideo = createAsyncThunk<interfaces.uploadVideoResponse, interfaces.uploadVideo>(
    'video.uploadVideo',
    async (credentials: interfaces.uploadVideo, { rejectWithValue }) => {
        try {
            const data = await videoService.uploadVideo(credentials)
            return data
        } catch (e) {
            return rejectWithValue(<interfaces.uploadVideoResponse>{
                message: 'Internal Server Error'
            })
        }
    }
)

export const getVideos = createAsyncThunk<interfaces.getVideosResponse, interfaces.getVideos>(
    'video.getVideos',
    async (credentials: interfaces.getVideos, { rejectWithValue }) => {
        try {
            const data = await videoService.getVideos(credentials)
            return data
        } catch (e) {
            return rejectWithValue(<interfaces.uploadVideoResponse>{
                message: 'Internal Server Error'
            })
        }
    }
)


export const videoInitialState: interfaces.videoState = {
    Channel: null,
    loadingVideo: false,
    Videos: []
}


const videoSlice = createSlice({
    name: 'video',
    initialState: videoInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(uploadVideo.pending, (state) => {
                state.loadingVideo = true;
            })
            .addCase(uploadVideo.fulfilled, (state) => {
                state.loadingVideo = false
            })
            .addCase(getVideos.pending,(state)=>{
                state.loadingVideo = true
            })
            .addCase(getVideos.fulfilled,(state,action:PayloadAction<interfaces.getVideosResponse>)=>{
                state.Videos = action.payload.Videos;
                state.loadingVideo = false;
            })
    },
})

export default videoSlice.reducer