
import React, { memo } from 'react';
const Preloader: React.FC = memo(() => {
    return (
        <div className="fixed inset-0 z-50 bg-opacity-90 bg-blend-overlay  bg-black flex items-center justify-center">
            <div className="animate-spin rounded-full border-t-8 border-b-8 border-blue-700 h-20 w-20 "></div>
            <p className='text-white justify-center absolute font-medium'>Loading</p>
        </div>
    );
})

export default Preloader;