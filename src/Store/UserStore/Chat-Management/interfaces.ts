// import { Socket } from "socket.io-client";
import { User } from "../Authentication/Interfaces";

export interface Chat {
    Message: string;
    FileLink: string;
    FileType: string;
    SenderId: string;
    ReceiverId: string;
    Time: Date;
    User: User
}

export interface Notification {
    Message: string;
    SenderId: string;
    Link: string;
    Type: string;
    Seen: boolean;
    Time: Date;
}

export interface AllChatState {
    UserId: string[];
    Message: Chat[];
}
export interface ChatState {
    chat: Chat[] | null;
    loadingChat: boolean;
    allChats: AllChatState[];
    Notifications: Notification[];
}

export interface getChats {
    token: string;
}

export interface getChatsResponse {
    message: string;
    status: number;
    allChat:AllChatState[];
}