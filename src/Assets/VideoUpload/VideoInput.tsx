import React from 'react'
interface InputProps {
    label: string,
    placeholder: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    name: string,
}
const VideoInput: React.FC<InputProps> = ({ placeholder, value, onChange, name }) => {
    return (
        <div className='w-full'>
            <input type="text" name={name} placeholder={placeholder} value={value} onChange={onChange} className='text-black font-medium border-1 shadow-md shadow-black border-gray-900 focus:border-2 placeholder:font-normal focus:border-black w-full p-2 px-3 rounded-lg ' id="" />
        </div>
    )
}

export default VideoInput