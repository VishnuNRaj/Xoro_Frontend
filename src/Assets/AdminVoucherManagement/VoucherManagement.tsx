import React from 'react'
import { useVouchers } from './Hooks'
import { Dialog } from '@material-tailwind/react'
import { Toaster } from 'sonner'

const VoucherManagement: React.FC = () => {
    const { voucher, handleAdd, edit, handleCancel, state, handleChange, handleDate } = useVouchers()
    return (
        <div className='w-auto h-auto'>
            <Toaster richColors position='top-right' duration={1000} />
            <Dialog size='xs' open={edit ? true : false} handler={handleCancel} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <div className='w-full h-[500px] p-2 font-semibold bg-gray-300 rounded-lg'>
                    <div className='w-full text-lg flex justify-center h-[50px] items-center'>
                        {edit === "add" ? "Create Pack" : "Edit Pack"}
                    </div>
                    <div style={{ scrollbarWidth: "none" }} className='h-[430px] border-4 border-slate-800 w-full rounded-lg p-2 overflow-y-scroll'>
                        <div className='w-full grid-cols-1 space-y-2'>
                            <div className='w-full h-[50px] '>
                                <input placeholder='Name...' type="text" name="Name" onChange={handleChange} className='w-full rounded-lg h-full p-2 flex items-center text-sm font-semibold px-4' value={state.Name} />
                            </div>
                            <div className='w-full h-[50px] '>
                                <input placeholder='Description...' type="text" name="Description" onChange={handleChange} className='w-full rounded-lg h-full p-2 flex items-center text-sm font-semibold px-4' value={state.Description} />
                            </div>
                            <div className='w-full h-[50px] flex gap-2'>
                                <input
                                    placeholder='Start Date...'
                                    min={new Date().toISOString().split("T")[0]}
                                    type="date"
                                    name="From"
                                    onChange={handleDate}
                                    className='w-1/3 rounded-lg h-full p-2 flex items-center text-sm font-semibold px-4'
                                    value={state.From ? new Date(new Date(state.From).getTime() - new Date(state.From).getTimezoneOffset() * 60000).toISOString().split("T")[0] : ''}
                                />

                                <input
                                    placeholder='End Date...'
                                    min={new Date().toISOString().split("T")[0]}
                                    type="date"
                                    name="End"
                                    readOnly
                                    className='w-1/3 rounded-lg h-full p-2 flex items-center text-sm font-semibold px-4'
                                    value={state.End ? new Date(new Date(state.End).getTime() - new Date(state.End).getTimezoneOffset() * 60000).toISOString().split("T")[0] : ''}
                                />

                                <select name="Months" className='w-full h-full rounded-lg px-4 appearance-none' onChange={handleChange} id="" value={state.Months} >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => (
                                        <option value={value}>{value} month</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
            <div className='w-full h-full p-2 mt-5'>
                <div className='w-full animate-popup'>
                    <div className='flex w-full items-center justify-center'>
                        <h1 className='text-2xl text-gray-300 hover:text-white font-semibold'>Manage Premium Packs</h1>
                    </div>
                    <div className='w-full p-2 '>
                        <div className='w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2'>
                            {voucher.length > 0 && voucher.map((_pack, _idx) => (
                                <div className='w-full bg-gray-300 h-[500px] md:max-w-[400px] rounded-lg p-1 border-2 border-gray-200'>
                                    <div className='w-full h-full rounded-lg border-2 border-gray-500 bg-slate-800'>
                                        <div className='w-full h-[200px] rounded-t-lg'>
                                            <img src="https://images.pexels.com/photos/2360569/pexels-photo-2360569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className='w-full h-[200px] rounded-t-lg' alt="" />
                                        </div>
                                        <div className='w-full p-2'>

                                        </div>
                                    </div>
                                </div>
                            ))}
                            {voucher.length < 4 && (
                                <div onClick={handleAdd} className='w-full bg-gray-300 h-[500px] md:max-w-[400px] rounded-lg text-gray-400 hover:text-gray-200 p-1 border-2 border-gray-200'>
                                    <div className='w-full h-full rounded-lg border-2 border-gray-500 hover:bg-slate-900 bg-slate-800'>
                                        {/* <div className='w-full h-[200px] rounded-t-lg'>
                                            <img src="https://images.pexels.com/photos/2360569/pexels-photo-2360569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className='w-full h-[200px] rounded-t-lg' alt="" />
                                        </div>
                                        <div className='w-full p-2'>

                                        </div> */}
                                        <div className='w-full h-full flex items-center justify-center'>
                                            <div className='w-full'>
                                                <button className='w-full font-semibold'><i className='fa fa-plus text-xl'></i>
                                                    <h1 className='text-xs'>Add</h1>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VoucherManagement