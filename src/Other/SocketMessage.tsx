import { useSelector } from "react-redux";
import { RootState } from "../Store/Store";
import React, { useEffect } from "react";
import { useSocket } from "../Socket";
import { Toaster, toast } from "react-hot-toast";
import { Chat } from "../Store/UserStore/Chat-Management/interfaces";
import { User } from "../Store/UserStore/Authentication/Interfaces";
import { useOnline } from "./Hooks";

const SocketMessage: React.FC = () => {
    const { chat } = useSelector((state: RootState) => state.chat);
    const { user } = useSelector((state: RootState) => state.auth);
    const socket = useSocket();
    const { online, setOnline } = useOnline()

    const toastFunction = (data: any) => {
        return toast.custom((t) => (
            <div
                className={`${t.visible ? 'animate-enter' : 'animate-leave'
                    } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
                <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                            <img
                                className="h-10 w-10 rounded-full"
                                src={data.user.Profile}
                                alt=""
                            />
                        </div>
                        <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                                {data.user.Username}
                            </p>
                            <p className="mt-1 text-sm text-black-500">
                                {data._doc.Message}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex border-l border-gray-200">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Close
                    </button>
                </div>
            </div>
        ), {
            duration: 1000,
            position: 'top-right',
        });
    }

    useEffect(() => {
        if (!socket) return;

        const handleMessage = (data: Chat | any) => {
            if ((!chat && data.user._id !== user?._id) || (chat?.RoomId !== data._doc.RoomId && data.user._id !== user?._id)) {
                toastFunction(data);
            }
        };

        const handleStartChat = (RoomId: string) => {
            socket.emit("join", RoomId);
        };
        socket.on("newOnline", (data: User) => {
            const users = [...online, data]
            setOnline(users)
        })
        socket.on('message', handleMessage);
        socket.on("start-chat", handleStartChat);
        return () => {
            socket.off('message', handleMessage);
            socket.off('start-chat', handleStartChat);
        };
    }, [socket, chat, user]);

    return <Toaster />;
};

export default SocketMessage;
