import React from 'react'
import useCategory from '../../Other/Category'
import { useLiveVideos } from './Hooks'
import useWindowDimensions from '../../Other/Hooks'
import VideoFile from './VideoFile'
import { useEssentials } from '../../Functions/CommonFunctions'

const LiveVideos: React.FC = () => {
    const { category, emptySearch, getAllCategory, handleSearchChange, search, emptyCategory } = useCategory()
    const { isLive, handleLive, cat, setCat, videos } = useLiveVideos()
    const { width } = useWindowDimensions()
    const { navigate } = useEssentials()
    return (
        <div className='w-full p-4'>
            <div className={`w-full ${width > 450 && "flex"} justify-between`}>
                <div className={`flex ${width > 450 ? "w-[300px]" : "w-full"} mr-4 h-[40px]`}>
                    <div className='flex px-4 items-center w-full flex-shrink-0 h-full gap-5'>
                        <div className='w-[100%] flex items-center justify-center'>
                            <button onClick={() => handleLive(true)} className={`${isLive ? "bg-blue-700" : "bg-slate-700"} px-2 w-full rounded-md h-[40px] font-semibold text-sm text-white`}>Streaming</button>
                        </div>
                        <div className='w-full flex items-center justify-center'>
                            <button onClick={() => handleLive(false)} className={`${!isLive ? "bg-blue-700" : "bg-slate-700"} px-2 w-full rounded-md h-[40px] font-semibold text-sm text-white`}>Completed</button>
                        </div>
                    </div>
                </div>
                <div className={`flex relative ${width > 450 ? "w-[300px]" : "w-full mt-5"} mr-4 h-[40px]`}>
                    <div className='flex items-center justify-center flex-shrink-0 h-full w-full'>
                        <input value={search ? search : cat} onChange={async (e) => {
                            console.log(e.target.value.trim().length)
                            if (e.target.value.trim().length === 0) {
                                setCat("")
                                handleSearchChange(e)
                                await getAllCategory()
                            } else handleSearchChange(e);
                        }} placeholder='Genres' onBlur={(e) => e.target.value.trim().length === 0 && emptyCategory()} onFocus={(e) => e.target.value.trim().length > 0 ? handleSearchChange(e) : getAllCategory()} type="text" className='w-full h-full rounded-md bg-gray-200 px-4 font-semibold text-sm border-2 border-gray-200 placeholder:text-slate-800' name="" id="" />
                    </div>
                    {category && category.length > 0 && (
                        <>
                            <div style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }} className="absolute w-full top-[40px] p-1 mt-3 space-y-1 max-h-[150px] mb-4 overflow-y-scroll bg-gray-200 z-50">
                                {category.map((value) => (
                                    <>
                                        <div onClick={() => {
                                            setCat(value.Name)
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
            </div>
            <div className='w-full mt-6 flex items-center justify-center'>
                {videos && videos.length > 0 && (
                    <div className='grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 w-full'>
                        {videos.map((video) => (
                            <div key={video._id}><VideoFile video={video} /></div>
                        ))}
                    </div>
                )}
                {videos && videos.length === 0 && (
                    <>
                        <div onClick={() => navigate("/stream")} className='h-[400px] animate-popup outline-2 mt-5 hover:text-white text-gray-400 w-[400px] rounded-lg bg-slate-900'>
                            <div className='w-full mt-20 text-2xl font-semibold flex items-center justify-center'>
                                <h1>{isLive ? "No Active Streams" : "No Completed Live Streams"}</h1>
                            </div>
                            <br />
                            <div className='flex font-semibold items-center justify-center'>
                                <i className='fa fa-tv text-[100px]'></i>
                            </div>
                            <div className='text-sm w-full font-semibold flex items-center justify-center'>
                                <h1>Start Streaming</h1>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default LiveVideos