
import React, { memo } from 'react';
const Preloader: React.FC = memo(() => {
    return (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
            <div className="animate-spin rounded-full border-t-4 border-b-4 border-red-500 h-20 w-20 "></div>
            <p className='text-white justify-center absolute font-medium'>Loading</p>
        </div>
    );
})

export default Preloader;