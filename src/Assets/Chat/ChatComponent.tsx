import React from 'react';
import { User } from '../../Store/UserStore/Authentication/Interfaces';
interface chatProps {
    // chat: User,
    setChat: React.Dispatch<React.SetStateAction<User | null>>
}
const ChatComponent: React.FC<chatProps> = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-[90vh] max-h-[720px] bg-indigo-900 text-gray-800 p-4">
            <div className="w-full flex justify-center items-center h-20 bg-white rounded-lg">
                <div className="flex justify-center items-center">
                    <a className="inline-flex items-start mr-3" href="#0">
                        <img className="rounded-full" src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-48-01_nugblk.jpg" width="48" height="48" alt="Lauren Marsano" />
                    </a>
                    <div className="pr-1">
                        <a className="inline-flex text-gray-800 hover:text-gray-900" href="#0">
                            <h2 className="text-xl leading-snug font-bold">Lauren Marsano</h2>
                        </a>
                        <a className="block text-sm font-medium hover:text-indigo-500" href="#0">@lauren.mars</a>
                    </div>
                </div>
            </div>
            <div className="right-0 mt-3 top-0 flex flex-col flex-grow w-[100%] bg-white shadow-xl rounded-lg overflow-hidden">
                <div style={{ overflowY: 'scroll', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }} className="flex flex-col flex-grow h-0 p-4">
                    <div className="flex justify-start w-[75%] mt-2 space-x-3 max-w-xs">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                        <div>
                            <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                                <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                            <span className="text-xs text-gray-500 leading-none">2 min ago</span>
                        </div>
                    </div>
                    <div className="flex justify-end w-[75%] mt-2 space-x-3 max-w-xs self-end">
                        <div>
                            <div className="bg-indigo-300 p-3 rounded-l-lg rounded-br-lg">
                                <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                            <span className="text-xs text-gray-500 leading-none">2 min ago</span>
                        </div>
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                    </div>
                </div>
                <div className="bg-gray-300 p-4">
                    <input className="flex items-center h-10 w-full rounded px-3 text-sm" type="text" placeholder="Type your message…" />
                </div>
            </div>
        </div>
    );
};
export default ChatComponent