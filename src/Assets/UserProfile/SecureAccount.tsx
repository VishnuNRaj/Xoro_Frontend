import React, { memo } from 'react';
import { Dialog } from '@material-tailwind/react';
import { useProfileSettings } from './Hooks';
import { Toaster } from "sonner"

interface SecureAccountProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditProfile: React.FC = () => {
    const { handleChange, data, handleUpdate, handleClear, handleDescription, handleDescriptionDelete } = useProfileSettings()
    return (
        <>
            <div style={{ overflowY: "scroll", scrollbarWidth: "none" }} className='w-full h-[300px] py-3 px-2 rounded-md border-2 overflow-y-scroll border-gray-200'>
                <div className='w-full mb-6 flex gap-2 flex-col'>
                    <div className='w-full flex items-center '>
                        <label htmlFor="text" className='text-white font-semibold w-[50%]'>Name: </label>
                        <input type="text" name="Name" placeholder='Name...' onChange={handleChange} className='w-full mx-3 rounded-md p-2 text-sm font-semibold h-[40px]' value={data.Name} id="" />
                    </div>
                    <div className='w-full flex items-center '>
                        <label htmlFor="text" className='text-white font-semibold w-[50%]'>Username: </label>
                        <input type="text" name="Username" placeholder='Username...' onChange={handleChange} className='w-full mx-3 rounded-md p-2 text-sm font-semibold h-[40px]' value={data.Username} id="" />
                    </div>
                    <div className='w-full flex items-center '>
                        <label htmlFor="text" className='text-white font-semibold w-[50%]'>Description: </label>
                        <div className='relative flex w-full mx-3'>
                            <input
                                type="text"
                                name="DescString"
                                placeholder='Descriptions...'
                                onChange={handleChange}
                                className='w-full rounded-md p-2 text-sm font-semibold h-[40px]'
                                value={data.DescString}
                                id=""
                            />
                            <button
                                onClick={handleDescription}
                                className='bg-blue-700 text-white p-2 flex justify-center items-center rounded-md aspect-square absolute right-2 top-1/2 transform -translate-y-1/2'
                            >
                                <i className='fa fa-plus'></i>
                            </button>
                        </div>

                    </div>
                    <div className='w-full grid grid-cols-2 gap-2 mb-2'>
                        {data.Description.map((tag, idx) => (
                            <div className='w-full animate-slideInFromLeft p-2 h-[40px] rounded-lg bg-gray-400 flex'>
                                <div style={{ overflowX: 'scroll', scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }} className='w-[90%] flex items-center flex-shrink-0'>
                                    <p className='text-gray-900 font-semibold text-sm'>{tag}</p>
                                </div>
                                <div className='w-[10%] flex flex-shrink-0 items-center justify-center'>
                                    <button onClick={() => handleDescriptionDelete(idx)} className='w-[40px] h-[40px] p-3.5 flex items-center rounded-tr-lg rounded-br-lg justify-center aspect-square text-black hover:text-white bg-white hover:bg-red-700'><i className='fa fa-times'></i></button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className=''></div>
                </div>
                <div className='fixed flex items-center justify-center gap-2 left-0 z-50 bottom-7 w-full h-[40px]'>
                    <button onClick={handleUpdate} className='p-2 px-3 bg-green-700 hover:bg-green-800 font-semibold text-sm text-white rounded-md'>Update</button>
                    <button onClick={handleClear} className='p-2 px-3 bg-red-600 hover:bg-red-700 font-semibold text-sm text-white rounded-md'>Cancel</button>
                </div>
            </div>
        </>
    )
}

export const AccountSettings: React.FC<SecureAccountProps> = memo(({ open, setOpen }) => {
    const { type, handleType } = useProfileSettings()
    return (
        <div>
            <Dialog open={open} size='xs' className='bg-[#111] animate-slideInFromLeft' handler={() => setOpen(false)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <div className="w-full p-3 h-[400px]">
                    <Toaster richColors position='top-right'/>
                    <div className='w-full h-[40px] flex'>
                        <div className='flex md:w-1/2 w-1/3 justify-center items-center'>
                            <h1 className='md:text-2xl text-lg font-semibold delay-100 text-gray-300 translate-x-10 animate-slideInFromLeft'>{type === "Edit" && "Edit Profile"}{type === "Set" && "Profile Settings"}</h1>
                        </div>
                        <div className='md:w-1/2 w-2/3 flex'>
                            <div className='flex w-full gap-2 items-center justify-end'>
                                <button onClick={() => handleType("Set")} className={`aspect-square h-[40px] flex items-center justify-center rounded-full text-lg hover:bg-blue-700 ${type === "Set" ? "text-green-700 hover:text-white" : "text-white"}`}>
                                    <i className='fa fa-gears'></i>
                                </button>
                                <button onClick={() => handleType("Edit")} className={`aspect-square h-[40px] p-1 flex items-center justify-center rounded-full text-lg hover:bg-blue-700 ${type === "Edit" ? "text-green-700 hover:text-white" : "text-white"}`}>
                                    <i className='fa fa-user'></i>
                                </button>
                                <button onClick={() => setOpen(false)} className='aspect-square h-[40px] flex items-center justify-center rounded-full text-lg hover:bg-red-700 text-white'>
                                    <i className='fa fa-times'></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-auto mt-[30px]'>
                        {type === "Edit" && <EditProfile />}
                    </div>
                </div>
            </Dialog>
        </div>
    );
})

export default AccountSettings;
