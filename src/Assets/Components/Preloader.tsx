
import React, { memo } from 'react';
import { useProgress } from '../../Functions/ProgressContext';
import Logo from '/Logo.png'

const Preloader: React.FC = memo(() => {
    const { progress } = useProgress()

    return (
        <div className="fixed inset-0 z-50 bg-opacity-80 bg-blend-overlay  bg-black flex items-center justify-center">
            <div className="animate-spin rounded-full border-t-8 border-b-8 border-blue-700 h-20 w-20 "></div>
            <p className='text-white justify-center absolute font-semibold'>{progress ? progress+' %' : 'Loading'}</p>
        </div>
    );
})

export default Preloader;