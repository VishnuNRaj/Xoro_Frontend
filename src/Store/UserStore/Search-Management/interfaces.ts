import { User } from "../Authentication/Interfaces";
import { PostImage } from "../Post-Management/Interfaces";

export interface searchData {
    token:string;
    search:string;
}

export interface searchResponse {
    message:string;
    data:{
        users:User[];
        posts:PostImage[];
        // comments:Comment[];
        // likes:Like[];
        // dislikes:Dislike[];
    }
}