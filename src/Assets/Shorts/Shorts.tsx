import React, { useState } from 'react'
import ShortsUpload from './ShortsUpload'

const Shorts: React.FC = () => {
    const [open, setOpen] = useState(false)
    return (
        <div>
            {open && <ShortsUpload open={open} setOpen={setOpen} />}
            <div className='fixed right-[20px] top-[80px]'>
                <button onClick={() => setOpen(true)} className='w-10 h-10 rounded-full bg-blue-700 p-1 flex items-center justify-center'>
                    <i className='fa fa-upload text-white'></i>
                </button>
            </div>
        </div>
    )
}

export default Shorts