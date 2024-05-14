import { createAsyncThunk, PayloadAction, createSlice } from "@reduxjs/toolkit";
import * as interfaces from "./interfaces";
import * as profileService from "./ProfileService";
import { toast } from "react-toastify";
const profileState: interfaces.profileState = {
    loadingProfile: false,
    users: [],
}

export const editProfilePic = createAsyncThunk<interfaces.EditProfilePicResponse, interfaces.EditProfilePic>(
    "profile/editProfilePic",
    async (credentials) => {
        try {
            const data = await profileService.editProfilePic(credentials);
            return data;
        } catch (error) {
            return { message: "Internal Server Error" };
        }
    }
);

export const editBanner = createAsyncThunk<interfaces.EditBannerResponse, interfaces.EditBanner>(
    "profile/editbanner",
    async (credentials) => {
        try {
            const data = await profileService.editBanner(credentials);
            return data;
        } catch (error) {
            return { message: "Internal Server Error" };
        }
    }
);

export const profileSettings = createAsyncThunk<interfaces.profileSettingsResponse, interfaces.profileSettings>(
    'profile/profileSettings',
    async (credentials, { rejectWithValue }) => {
        try {
            const data = await profileService.profileSettings(credentials);
            return data;
        } catch (error) {
            return rejectWithValue(<interfaces.profileSettingsResponse>{
                message: 'Internal Server Error',
                status: 500
            })
        }
    }
)

export const searchUsers = createAsyncThunk<interfaces.searchUsersResponse, interfaces.searchUsers>(
    'profile/searchUsers',
    async (credentials, { rejectWithValue }) => {
        try {
            const data = await profileService.searchUsers(credentials)
            return data
        } catch (e) {
            return rejectWithValue(<interfaces.searchUsersResponse>{
                message: 'Internal Server Error'
            })
        }
    }
)

export const editProfile = createAsyncThunk<interfaces.editProfileResponse, interfaces.editProfile>(
    'profile/editProfile',
    async (credentials, { rejectWithValue }) => {
        try {
            const data = await profileService.editProfile(credentials)
            return data
        } catch (e) {
            return rejectWithValue(<interfaces.searchUsersResponse>{
                message: 'Internal Server Error'
            })
        }
    }
)

// export const searchData = createAsyncThunk<>()

type ToastType = 'warning' | 'error' | 'success' | 'info';

const toastify: (type: ToastType, message: string) => void = (type, message) => {
    toast[type](message,
        {
            autoClose: 1000,
            position: 'top-center',
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
        }
    )
};

const profileSlice = createSlice({
    name: 'profile',
    initialState: profileState,
    reducers: {
        resetStateProfile: (state) => {
            Object.assign(state, profileState);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(editProfilePic.pending, (state) => {
                state.loadingProfile = true;
            })
            .addCase(editProfilePic.fulfilled, (state, action: PayloadAction<interfaces.EditProfilePicResponse>) => {
                state.loadingProfile = false;
                if (action.payload.status === 200) toastify('success', action.payload.message)
                else toastify('error', action.payload.message)
            })
            .addCase(editBanner.pending, (state) => {
                state.loadingProfile = true;
            })
            .addCase(editBanner.fulfilled, (state, action: PayloadAction<interfaces.EditProfilePicResponse>) => {
                state.loadingProfile = false;
                if (action.payload.status === 200) toastify('success', action.payload.message)
                else toastify('error', action.payload.message)
            })
            .addCase(profileSettings.pending, (state) => {
                state.loadingProfile = true;
            })
            .addCase(profileSettings.fulfilled, (state, action: PayloadAction<interfaces.profileSettingsResponse>) => {
                if (action.payload.status === 200) toastify('success', action.payload.message)
                else toastify('error', action.payload.message)
                state.loadingProfile = false;
            })
            .addCase(searchUsers.pending, (state) => {
                state.loadingProfile = true;
            })
            .addCase(searchUsers.fulfilled, (state, action: PayloadAction<interfaces.searchUsersResponse>) => {
                state.users = action.payload.users ? action.payload.users : []
                state.loadingProfile = false;
            })
            .addCase(editProfile.pending, (state) => {
                state.loadingProfile = true;
            })
            .addCase(editProfile.fulfilled, (state, action: PayloadAction<interfaces.editProfileResponse>) => {
                state.loadingProfile = false;
            })
    }
})

export const { resetStateProfile } = profileSlice.actions
export default profileSlice.reducer;