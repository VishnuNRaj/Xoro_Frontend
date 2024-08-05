import React from 'react';
import CreateStream from './CreateStream';
import { useLive } from './Hooks';
import { Toaster } from 'sonner';
import useWindowDimensions from '../../Other/Hooks';
import Preloader from '../Components/Preloader';

const Live: React.FC = () => {
    const { setLive, live, setState, state, startCamera, startScreenShare, loading, started, stopLive, sendData, liveStream, stream, videoRef, startLive } = useLive();
    const { width } = useWindowDimensions();



    return (
        <div>
            <div className="w-full md:h-[75vh] flex flex-col md:items-center  rounded-md aspect-video p-2 justify-center">
                {loading && <Preloader />}
                <Toaster richColors position="top-right" />
                {stream ? (
                    <video
                        ref={videoRef}
                        autoPlay
                        className={`${width < 968 ? 'w-full h-full' : 'aspect-video object-cover w-[60%]'} rounded-md shadow-md shadow-gray-700 md:border-0 border-2`}
                    />
                ) : (
                    <div className="flex items-center justify-center gap-4">
                        <button
                            onClick={startCamera}
                            className="w-32 font-semibold text-white text-sm h-10 rounded-full bg-blue-700 p-1 px-2 flex items-center gap-2 justify-center"
                        >
                            <i className="fa fa-camera"></i> Camera
                        </button>
                        <button
                            onClick={startScreenShare}
                            className="w-32 font-semibold text-white text-sm h-10 rounded-full bg-blue-700 p-1 px-2 flex items-center gap-2 justify-center"
                        >
                            <i className="fa fa-desktop"></i> Screen
                        </button>
                    </div>
                )}
                {!live.Thumbnail && state && <CreateStream live={live} setLive={setLive} state={state} setState={setState} />}
                {!live.Thumbnail && !state && (
                    <div className="fixed right-[20px] top-[80px]">
                        <button onClick={() => setState(true)} className="w-32 font-semibold text-white text-sm h-10 rounded-full bg-blue-700 p-1 px-2 flex items-center gap-2 justify-center">
                            <i className="fa fa-upload"></i> Create Live
                        </button>
                    </div>
                )}
                {/* {live && live.Thumbnail && ( */}
            </div>
            <div className='w-full flex items-center justify-center h-[40px] text-white text-sm font-semibold'>
                {started ? <><button onClick={async () => {
                    if (liveStream) stopLive(liveStream.Key)
                }} className='h-full w-[100px] flex flex-shrink-0 items-center justify-center bg-red-700 rounded-md gap-3 shadow-md shadow-gray-700'><i className='fa fa-tv'></i>Stop</button></> :
                    <>
                        <button onClick={async () => {
                            if (live.Thumbnail && stream) {
                                const key: string | null = await sendData()
                                if (key) startLive(key)
                            }
                            else setState(true)
                        }} className='h-full w-[100px] flex flex-shrink-0 items-center justify-center bg-green-700 rounded-md gap-3 shadow-md shadow-gray-700'><i className='fa fa-tv'></i>{live.Thumbnail ? "Start" : "Create"}</button>
                    </>
                }
            </div>
            {/* <div className='flex items-center justify-center'>
                <div className='w-[60%] p-2 mt-5 flex flex-shrink-0 h-20 bg-white'>
                    <div className=''>

                    </div>
                </div>
            </div> */}
            {/* )} */}
        </div>
    );
};

export default Live;
