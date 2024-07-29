import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import * as videoService from './shortService'
import * as interfaces from './interfaces'

export const uploadShorts = createAsyncThunk<interfaces.uploadShortsResponse, interfaces.uploadShorts>(
    'video/uploadShorts',
    async (credentials: interfaces.uploadShorts, { rejectWithValue }) => {
        try {
            const data = await videoService.uploadShorts(credentials)
            return data
        } catch (e) {
            return rejectWithValue(<interfaces.uploadShortsResponse>{
                message: 'Internal Server Error'
            })
        }
    }
)

// export const getVideos = createAsyncThunk<interfaces.getVideosResponse, interfaces.getVideos>(
//     'video/getVideos',
//     async (credentials: interfaces.getVideos, { rejectWithValue }) => {
//         try {
//             const data = await videoService.getVideos(credentials)
//             return data
//         } catch (e) {
//             return rejectWithValue(<interfaces.uploadVideoResponse>{
//                 message: 'Internal Server Error'
//             })
//         }
//     }
// )

// export const getVideo = createAsyncThunk<interfaces.getVideoResponse, interfaces.getVideo>(
//     'video/getVideo',
//     async (credentials: interfaces.getVideo, { rejectWithValue }) => {
//         try {
//             const data = await videoService.getVideo(credentials)
//             return data
//         } catch (e) {
//             return rejectWithValue(<interfaces.getVideoResponse>{
//                 message: 'Internal Server Error'
//             })
//         }
//     }
// )


export const videoInitialState: interfaces.shortState = {
    loadingShorts: false,
    Shorts: []
}


const shortSlice = createSlice({
    name: 'shorts',
    initialState: videoInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(uploadShorts.pending, (state) => {
                state.loadingShorts = true
            })
            .addCase(uploadShorts.fulfilled,(state)=>{
                state.loadingShorts = false
            })
    },
})

export default shortSlice.reducer