import { User } from "../Authentication/Interfaces";
import { PostImage } from "../Post-Management/Interfaces";
import { Channel } from "../Video-Management/Interfaces";

export interface searchData {
    token: string;
    search: string;
}

export interface searchResponse {
    message: string;
    data: {
        users: User[];
        posts: PostImage[];
        channel: Channel[];
    }
    status: number;
}

export interface CommentReply {
    _id: string;
    Comment: string[];
    CommentId: string;
    Likes: number;
    tags: User[];
    user: User;
}

export interface Comments {
    PostId: string;
    Comment: string[];
    comments:{
        tags: User[];
        user: User;
    }
    UserId: string;
    _id: string;
    replies: CommentReply[];
}


export interface addComment {
    PostId: string;
    token: string;
    Comment: string[];
}

export interface getComments {
    PostId: string;
    token: string;
}


export interface getCommentResponse {
    message: string;
    status: number;
    Comment: Comments[];
}

export interface addCommentResponse {
    message: string;
    status: number;
    Comment: Comments[];
}