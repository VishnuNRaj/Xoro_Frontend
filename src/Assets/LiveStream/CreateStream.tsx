import { Dialog } from '@material-tailwind/react'
import React, { SetStateAction } from 'react'
import { createLive, useCreateLive } from './Hooks'
import useCategory from '../../Other/Category'

const CreateStream: React.FC<{ live: createLive, setLive: React.Dispatch<SetStateAction<createLive>>, state: boolean, setState: React.Dispatch<SetStateAction<boolean>> }> = ({ live, setLive, setState, state }) => {
    const { data, handleChange, inputRef, handleFile, handleRelated, handleSubmit, handleTagsRemove, setTagUsers } = useCreateLive({ setLive })
    const { category, search, emptySearch, handleSearchChange } = useCategory()
    return (
        <Dialog size='xs' className='bg-slate-900 p-2 overflow-scroll overflow-x-hidden h-[400px]' open={live.Thumbnail && !state ? false : true} handler={() => setState(false)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <div className='p-2'>
                <div className='w-full h-full flex flex-shrink-0 justify-center font-semibold items-center mb-8'>
                    <div className='w-full flex flex-col space-y-2 flex-shrink-0 justify-center'>
                        <div className='w-full flex-shrink-0 font-semibold font-serif p-2 text-2xl text-gray-200 flex items-center justify-center'>
                            <h1>Create Live</h1>
                        </div>
                        <div className='w-full px-4'>
                            <div onClick={() => inputRef.current?.click()} className='w-full h-[220px] rounded-lg mt-2 hover:text-white text-gray-400 bg-slate-700 flex items-center justify-center'>
                                {!data.Thumbnail ?
                                    <>
                                        <div className='min-w-[100px] font-semibold flex items-center justify-center flex-shrink-0'>
                                            <input onChange={handleFile} ref={inputRef} type="file" hidden />
                                            <button className='flex items-center flex-col justify-center'><i className='fa fa-upload text-3xl text-gray-300'></i>Upload <br /> Thumbnail</button>
                                        </div>
                                    </> : <>
                                        <img src={URL.createObjectURL(data.Thumbnail)} className='w-full rounded-lg h-full object-center' alt="" />
                                    </>
                                }
                            </div>
                        </div>
                        <div className='w-full px-4 flex flex-col mb-4 gap-2 text-sm'>
                            <div className='w-full flex flex-shrink-0'>
                                <input type="text" placeholder='Caption' className='text-gray-200 w-full p-3 rounded-md bg-slate-700' name="Caption" onChange={handleChange} value={data.Caption} id="" />
                            </div>
                            <div className='w-full flex flex-shrink-0 h-[100px]'>
                                <textarea placeholder='Description' className='h-[100px] text-gray-200 w-full p-3 rounded-md bg-slate-700 resize-none' name="Description" onChange={handleChange}></textarea>
                            </div>
                        </div>
                        <div className='w-full px-4 text-sm'>
                            <div className='w-full relative flex flex-shrink-0 '>
                                <input type="text" placeholder='Context ' className=' text-gray-200 w-full p-3 rounded-md  bg-slate-700' name="RelatedTags" onChange={(e) => {
                                    if (e.target.value.length === 0) {
                                        handleChange(e)
                                        handleSearchChange(e)
                                    } else handleSearchChange(e)

                                }} value={search ? search : data.RelatedTags} id="" />
                            </div>
                            {category.length > 0 && (
                                <>
                                    <div style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }} className="absolute w-[88%] p-1 mt-3 space-y-1 max-h-[150px] mb-4 overflow-y-scroll bg-gray-200 z-50">
                                        {category.map((value) => (
                                            <>
                                                <div onClick={() => {
                                                    handleRelated(value.Name)
                                                    emptySearch()
                                                }} className="w-full h-[40px] rounded-md flex items-center justify-center border-2 border-slate-800">
                                                    <h1 className="text-gray-800 font-semibold text-sm">{value.Name}</h1>
                                                </div>
                                            </>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="relative px-4 top-0">
                            <input
                                type="text"
                                value={data.Tags}
                                placeholder="Set hashtags for recommendation ..."
                                className="w-full placeholder:break-words relative flex items-center text-sm mt-2 text-gray-200 p-3 rounded-md resize-none bg-slate-700 font-semibold"
                                name="Tags"
                                onChange={handleChange}
                            />
                            <div className="absolute top-5 right-8 w-6 h-6 flex items-center justify-center">
                                <button onClick={setTagUsers} className={`w-full h-full ${data.Tags.startsWith("#") && data.Tags[1] !== "#" && data.Tags.length > 2 ? "bg-blue-700" : "bg-gray-500"} rounded-md text-white flex items-center justify-center text-sm font-semibold`}><i className="fa fa-plus"></i></button>
                            </div>
                        </div>
                        <div className='w-full px-4'>
                            <div className={`w-full h-[100px] p-1 gap-2 ${data.tags.length > 0 ? "grid grid-cols-2" : "flex flex-shrink-0 items-center justify-center"} mt-2 rounded-md bg-slate-600 overflow-y-scroll`} style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
                                {data.tags.length > 0 ?
                                    <>
                                        {data.tags.map((tag, idx) => (
                                            <>
                                                <div className="w-full p-1 h-10 flex items-center rounded-lg justify-center relative font-semibold text-white text-sm bg-slate-800">
                                                    <div style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }} className="overflow-x-scroll w-[90%] cursor-auto" >
                                                        <h1>#{tag}</h1>
                                                    </div>
                                                    <div className="absolute right-2 h-5 w-5">
                                                        <button onClick={() => handleTagsRemove(idx)} className="w-full h-full flex p-1 rounded-md bg-red-500 items-center justify-center"><i className="fa fa-times"></i> </button>
                                                    </div>
                                                </div>
                                            </>
                                        ))}
                                    </> :
                                    <>
                                        <h1 className="font-semibold text-sm text-gray-200">Add Hashtags</h1>
                                    </>
                                }
                            </div>
                        </div>
                        <div className='w-full px-4'>
                            <div className="w-full md:mt-0 mt-2 text-gray-200">
                                <select onChange={handleChange} name="Restriction" className='font-medium bg-slate-700 border-1 px-5 w-full p-3 rounded-lg ' id="">
                                    <option value={18} >18 +</option>
                                    <option value={16} >16 +</option>
                                    <option value={14}>14 +</option>
                                </select>
                            </div>
                        </div>
                        <div className='w-full flex flex-shrink-0 justify-center px-4'>
                            <button onClick={handleSubmit} className='w-[120px] mt-4 rounded-md text-white font-semibold text-sm bg-green-700 p-3'>Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}

export default CreateStream