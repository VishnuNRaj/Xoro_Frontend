import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import axios from 'axios'
// import { useEssentials,useToast } from './CommonFunctions';
interface ProgressContextType {
    progress: number | null;
    setProgress: React.Dispatch<React.SetStateAction<number | null>> | null;
}

export const useProgress = (): ProgressContextType => {
    const context = useContext(ProgressContext)
    if (context === undefined) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context
}

export const ProgressContext = createContext<ProgressContextType>({progress:null,setProgress:null});

interface ProgressProviderProps {
    children: ReactNode
}

export const ProgressProvider: React.FC<ProgressProviderProps> = ({ children }) => {
    const [progress, setProgress] = useState<number | null>(null);
    // const {navigate} = useEssentials()
    useEffect(() => {
        axios.interceptors.request.use(config => {
            config.onUploadProgress = (e) => {
                if (e && e.total) {
                    const percentCompleted = Math.round((e.loaded * 100) / e.total);
                    setProgress(percentCompleted)
                }
            };
            return config;
        });
        axios.interceptors.response.use((config)=>{
            setProgress(null)
            return config
        });
    }, [])
    return (
        <ProgressContext.Provider value={{ progress, setProgress }}>
            {children}
        </ProgressContext.Provider>
    );
};
