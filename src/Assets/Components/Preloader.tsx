
import React, { memo } from 'react';
import { useProgress } from '../../Functions/ProgressContext';

const Preloader: React.FC = memo(() => {
    const { progress } = useProgress()

    return (
        <div className="fixed inset-0 z-50 bg-opacity-80 bg-blend-overlay  bg-black flex items-center justify-center">
            <div className="animate-spin rounded-full border-t-4 border-b-4 border-blue-700 h-20 w-20 "></div>
            <p className='text-white animate-ping justify-center absolute font-semibold'>{progress ? progress + ' %' : 'Loading'}</p>
        </div>
    );
})

export default Preloader;