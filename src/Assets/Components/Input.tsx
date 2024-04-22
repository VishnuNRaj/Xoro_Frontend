import React, { memo, useState } from 'react'

interface FormInputProps {
    label: string;
    name: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    width: string;
    error: string;
}

export const FormInput: React.FC<FormInputProps> = memo(({ error, label, name, onChange, placeholder, type, value, width }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div>
            <div className={`relative h-11 ${width}`}>
                {type === 'password' && (
                    <button onClick={togglePasswordVisibility} className="absolute right-2 top-3 mr-2">
                        {showPassword ? <i className="fa fa-eye-slash text-white"></i> : <i className="fa fa-eye text-gray-400"></i>}
                    </button>
                )}
                <input placeholder={placeholder}
                    className={`peer h-full w-full rounded-md px-4 focus:px-0 ${value ? 'border-0 border-b-2 rounded-none border-green-700' : 'border-2'} focus:border-0 focus:border-b bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border-violet-700 focus:border-violet-700 placeholder:text-white focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-1001`}
                    onChange={onChange} type={type === 'password' ? (showPassword ? 'text' : 'password') : type} value={value} name={name}
                />
                <label
                    className="after:content[''] ml-4 peer-focus:ml-0 pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none  !overflow-visible truncate text-[11px] font-bold leading-tight text-white transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-red-700 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-red-700 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-red-700 peer-focus:after:scale-x-100 peer-focus:after:border-red-700 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-red-700">
                    {label}
                </label>
            </div>
            <p className='text-red-700'>{error}</p>
        </div>
    )
})