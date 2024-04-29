import { User } from "../Authentication/Interfaces";

export interface profileState {
    loadingProfile:boolean;
    users:User[];
}
export interface EditProfilePic {
    Image:File;
    token:string;
}

export interface EditProfilePicResponse {
    message:string;
    user:User | null;
    status:number;
}

export interface EditBanner {
    Image:File;
    token:string;
}

export interface EditBannerResponse {
    message:string;
    user:User | null;
    status:number;
}

export interface profileSettings {
    Private:boolean;
    Notification:boolean;
    ProfileLock:boolean;
    token:string;
}

export interface profileSettingsResponse {
    message:string;
    status:number;
    user:User;
}