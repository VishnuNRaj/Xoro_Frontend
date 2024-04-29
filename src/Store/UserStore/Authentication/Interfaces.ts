export interface User {
    _id: string;
    Name: string;
    Email: string;
    Username: string;
    Phone: string;
    Profile: string;
    Verified: boolean;
    Hashtags: string[];
    Password: string;
    Followers: number;
    Following: number;
    Streams: string;
    Suspended: boolean;
    Terminated: boolean;
    Connections: string;
    Wallet: string;
    Images: string;
    Videos: string;
    Shorts: string;
    Stream: string;
    SuspendedTill: Date;
    Reason: string;
    Referral: string;
    Reports: string;
    Age: number;
    Gender: string;
    Country: string;
    Description: string[];
    Favourites: string;
    ProfileLink: string;
    Posts:number;
    Settings:{
        Private:boolean;
        Notifications:boolean;
        BlockedUsers:any[];
        Favourites:any[];
    }
    Banner:string;
    ProfileLock:boolean;
}


export interface LoginCredentials {
    Email: string;
    Password: string;
}

export interface RegisterCredentials {
    Name: string;
    Email: string;
    Password: string;
    Phone: string | null | number;
}

export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string[];
    message:string;
}

export interface loginResponse {
    message: string,
    errors: string[] | [];
    status: number;
    user?:any;
}

export interface registerResponse {
    message: string,
    errors: string[] | [];
    status: number;
}

export interface VerifyAccount {
    VerificationLink:string;
    UserId: string;
}

export interface verifyAccountResponse {
    message: string;
    status:number;
    token: string;
    user:any
}

export interface AddProfilePic {
    Profile:File | null | string;
    Username:string;
    RememberMe:boolean;
    UserId?:string;
}

export interface addProfileResponse {
    message:string;
    token:string;
    status:number;
    user?:any;
}

export interface OTPVerify {
    OTP: string;
    UserId?: string;
    RememberMe: boolean;
}

export interface OTPVerifyResponse {
    message: string;
    user?:any;
    status: number;
    token: string;
}

export interface AuthVerifyUser {
    token:string;
}

export interface AuthVerifyUserResponse {
    message: string;
    user?: any;
    status: number;
}

export interface resendOTP {
    UserId:string;
}

export interface resendOTPResponse {
    message: string;
    status: number;
}

export interface getTwoStep {
    token:string;
}

export interface getTwoStepResponse {
    message: string;
    status:number
    user:User;
    TwoStepVerification:boolean;
}