import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import config from './Configs/config';
import io,{ Socket } from 'socket.io-client';

interface SocketContextProps {
    socket: Socket | null;
}

const SocketContext = createContext<SocketContextProps>({ socket: null });

export const useSocket = (): Socket | null => {
    const context = useContext(SocketContext);
    if (context === undefined) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context.socket;
};
interface SocketProviderProps {
    children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    useEffect(() => {
        const newSocket = io(config.BASE);

        newSocket.on('connect', () => {
            setSocket(newSocket);
            console.log(newSocket.id)
            axios.interceptors.request.use(config => {
                config.withCredentials = true
                config.headers['socket-id'] = newSocket.id;
                return config;
            })
        });
        return () => {
            newSocket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};
