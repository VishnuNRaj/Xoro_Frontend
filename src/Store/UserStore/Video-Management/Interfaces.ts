import { SetStateAction } from "react";
import { User } from "../Authentication/Interfaces";

export interface Channel {
    _id: string;
    Name: string,
    UserId: string;
    Type: string;
    Subsribers: string[];
    Reports: number;
    Logo:string;
}
export interface Reactions {
    PostId:string;
    Views:string[];
    Likes:string[];
    Dislikes:string[];
}
export interface Video {
    _id: string;
    Caption: string;
    UserId: string;
    Video: string;
    Thumbnail: string;
    Duration: string;
    Postdate: Date;
    Settings: {
        CommentsOn: boolean;
        PremiumContent: boolean;
        ListedContent: boolean;
    },
    Restriction: number;
    Hashtags: string[];
    RelatedTags: string;
    Views: number;
    Description: string;
    VideoLInk: string;
    Uploaded: boolean
    Channel: Channel[];
    Reactions:Reactions[]
}
export interface videoState {
    Channel: Channel | null;
    Videos: Video[];
    loadingVideo: boolean;
}

export interface uploadVideo {
    Caption: string;
    Description: string;
    Hashtags: string[];
    Settings: {
        CommentsOn: boolean;
        PremiumContent: boolean;
        ListedContent: boolean;
    },
    Restriction: number;
    Thumbnail: string;
    Video: File;
    Duration: string;
    RelatedTags: string;
    token: String;
    setProgress:React.Dispatch<SetStateAction<number | null>>
}

export interface uploadVideoResponse {
    status: number;
    message: string;
}
export interface getVideos {
    random:number;
    skip:number;
    token:string | undefined;
}

export interface getVideosResponse {
    status: number;
    message: String;
    user: User;
    Videos: Video[];
}