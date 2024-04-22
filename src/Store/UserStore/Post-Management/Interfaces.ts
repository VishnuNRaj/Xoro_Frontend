import { User } from "../Authentication/Interfaces";

export interface PostImage {
    Images: string[];
    Caption: string;
    Hashtags: string[];
    Tags: string[];
    Comments: number;
    Hidden: boolean;
    Likes: number;
    Dislikes: number;
    ShareLink: string;
    PostDate: Date;
    CommentsOn:boolean;
}

export interface PostState {
    message: string;
    post: PostImage[];
    loadingPost: boolean;
}

export interface addPost {
    Images: string[];
    Caption: string;
    Hashtags: string[];
    Tags: string[];
    token: string;
    CommentsOn: boolean;
    Hidden: boolean;
}

export interface showPost {
    token: string;
}

export interface addPostResponse {
    message: string;
    status: number;
}


export interface showPostResponse {
    message: string;
    status: number;
    post?: PostImage[],
    user?: User | null;
}