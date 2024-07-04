import { useSelector } from "react-redux";
import { RootState } from "../Store/Store";
import React, { useEffect } from "react";
import { useSocket } from "../Socket";
import { Toaster, toast } from "react-hot-toast";

const SocketToast: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const socket = useSocket();

    useEffect(() => {
        if (user && socket) {
            socket.emit('join', user._id);
        }
    }, [user, socket]);

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
                                src={data.Link}
                                alt=""
                            />
                        </div>
                        <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                                {data.SenderId}
                            </p>
                            <p className="mt-1 text-sm text-black-500">
                                {data.Message}
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
            duration: 2000,
            position: 'top-right',
        })

    }

    useEffect(() => {
        if (socket) {
            socket.on('notification', (data: any) => {
                console.log(data)
                toastFunction(data)
            });

            return () => {
                socket.off('notification');
            };
        }
        console.log(socket ? socket : 'blah blah blah')
    }, [socket]);

    // useEffect(() => {
    //     axios.interceptors.response.use(
    //         (response: AxiosResponse<any>) => {
    //             console.log(response)
    //             // if (response.data.user.notifications.length > 0) {
    //             //     const { notifications } = response.data.user;
    //             //     // notifications.forEach(async (msg: any) => {
    //             //     //     const Link = msg.Type === "Auth" || msg.Type === "Official" ? msg.Link : msg
    //             //     //     // await toastFunction({})
    //             //     // });
    //             // }
    //             return response;
    //         },
    //         (error) => {
    //             return Promise.reject(error);
    //         }
    //     );
    // }, [axios])

    return <Toaster />;
}



export default SocketToast;
