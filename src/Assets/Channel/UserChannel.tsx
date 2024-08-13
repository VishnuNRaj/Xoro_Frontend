import React from 'react'
import { useChannel } from './Hooks'
import { Toaster } from 'sonner'
import { Channel } from '../../Store/UserStore/Video-Management/Interfaces'
import { Tooltip } from '@material-tailwind/react'
import ShortsMap from './ShortsMap'
import LiveMap from './LiveMap'
import VideoMap from './VideoMap'

const ChannelCard: React.FC<{ channel: Channel, subs: number, subscribe: boolean, own: boolean, handleUnSubscribe: any, handleSubscribe: any }> = ({ channel, subs, subscribe, handleSubscribe, handleUnSubscribe }) => {
    return (
        <div
            className="max-w-2xl border-2 font-semibold h-full sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto bg-gray-200 shadow-xl rounded-lg text-gray-900">
            <div className="rounded-t-lg bg-slate-900 h-40 overflow-hidden">
                <img className="object-scale-down h-full w-full" src="/public/Logo.png" alt='Mountain' />
            </div>
            <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                <img className="object-cover object-center h-32" src={channel.Logo} alt='' />
            </div>
            <div className="text-center mt-2">
                <h2 className="font-semibold">{channel.Name}</h2>
                <p className="text-gray-600 text-sm font-semibold">{channel.Description}</p>
            </div>
            <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
                <Tooltip content={`Live ${channel.live.length}`} className="bg-red-700 font-semibold" >
                    <li className="flex flex-col items-center justify-around">
                        <i className='fa fa-tv w-4 font-semibold'></i>
                        <div>{channel.live.length}</div>
                    </li>
                </Tooltip>
                <Tooltip content={`Shorts ${channel.shorts.length}`} className="bg-red-700 font-semibold" >

                    <li className="flex flex-col items-center justify-around">
                        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000" className="bi bi-camera-reels w-4">
                            <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM1 3a2 2 0 1 0 4 0 2 2 0 0 0-4 0z" />
                            <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h7zm6 8.73V7.27l-3.5 1.555v4.35l3.5 1.556zM1 8v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1z" />
                            <path d="M9 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM7 3a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                        </svg>
                        <div>{channel.shorts.length}</div>
                    </li>
                </Tooltip>
                <Tooltip content={`Videos ${channel.videos.length}`} className="bg-red-700 font-semibold" >

                    <li className="flex flex-col items-center justify-around">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            id="Layer_1"
                            className='w-4'
                            viewBox="0 0 128 128"
                        >
                            <g>
                                <circle style={{ fill: "#E16B5A" }} cx="64" cy="64" r="64" />
                                <path
                                    style={{ fill: "#D16354" }}
                                    d="M115.061,102.578L99.605,64.253c-0.028-0.159-0.08-0.314-0.158-0.468 c-0.073-0.522-0.396-1.032-1.004-1.429L45.462,27.644c-1.38-0.904-2.509-0.294-2.509,1.356v0.512v0.512V99v0.512V100l10.796,27.172 C57.088,127.71,60.51,128,64,128C84.855,128,103.376,118.02,115.061,102.578z"
                                />
                                <path
                                    style={{ fill: "#F5F5F5" }}
                                    d="M42.953,29c0-1.65,1.129-2.26,2.509-1.356l52.981,34.712c1.38,0.904,1.38,2.384,0,3.289 l-52.981,34.711c-1.38,0.904-2.509,0.295-2.509-1.355V29z"
                                />
                            </g>
                        </svg>

                        <div>{channel.videos.length}</div>
                    </li>
                </Tooltip>
                <Tooltip content={`Subscribers ${subs}`} className="bg-red-700 font-semibold" >

                    <li className="flex flex-col items-center justify-between">
                        <svg className="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path
                                d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
                        </svg>
                        <div>{subs > 1000 ? parseInt((subs / 1000).toString()) : subs}</div>
                    </li>
                </Tooltip>

            </ul>

            <div className='flex w-full items-center justify-center'>
                <div className="py-2 flex-shrink-0 border-t mx-8 mt-2">
                    <button onClick={subscribe ? handleUnSubscribe : handleSubscribe} className={` w-36 flex items-center justify-center flex-shrink-0 shadow-slate-600 mx-auto rounded-full ${subscribe ? "bg-gray-900" : "bg-red-700"} hover:shadow-lg font-semibold text-white px-6 py-2`}>{!subscribe ? "Subscribe" : "Unsubscribe"}</button>
                </div>
                <div className="py-2 flex-shrink-0 border-t mx-8 mt-2">
                    <button className="w-36 flex-shrink-0 block mx-auto rounded-full bg-gray-900 hover:shadow-lg shadow-slate-600 font-semibold text-white px-6 py-2">Join</button>
                </div>
            </div>
        </div>
    )
}

const UserChannel: React.FC = () => {
    const { channel, subs, subscribe, own, handleSubscribe, handleUnSubscribe, editState, state } = useChannel()
    return (
        <div className='w-full h-auto p-2'>
            <Toaster richColors position='top-right' duration={1500} />
            <div className='lg:w-[90%] w-full h-[500px] grid grid-cols-1 md:grid-cols-2 gap-3'>
                <div className='w-full h-full'>
                    {channel && <ChannelCard channel={channel} subs={subs} subscribe={subscribe} own={own} handleSubscribe={handleSubscribe} handleUnSubscribe={handleUnSubscribe} />}
                </div>
                <div className='lg:w-[110%] w-full h-full border-2 border-gray-400 bg-black bg-opacity-50 rounded-lg'>
                    <div className='w-full grid grid-cols-3 border-b-2 border-gray-400 text-white font-semibold h-[50px]'>
                        <div
                            onClick={() => editState("live")}
                            className={`${state === "live" ? "bg-blue-800" : "hover:bg-blue-800"
                                } w-full h-full rounded-tl-lg border-r-2 transition-colors duration-300 ease-in-out`}
                        >
                            <button className='w-full h-full flex flex-shrink-0 items-center justify-center'>Live</button>
                        </div>
                        <div
                            onClick={() => editState("shorts")}
                            className={`${state === "shorts" ? "bg-blue-800" : "hover:bg-blue-800"
                                } w-full h-full border-r-2 transition-colors duration-300 ease-in-out`}
                        >
                            <button className='w-full h-full flex flex-shrink-0 items-center justify-center'>Shorts</button>
                        </div>
                        <div
                            onClick={() => editState("videos")}
                            className={`w-full ${state === "videos" ? "bg-blue-800" : "hover:bg-blue-800"
                                } rounded-tr-lg h-full transition-colors duration-300 ease-in-out`}
                        >
                            <button className='w-full h-full flex flex-shrink-0 items-center justify-center'>Videos</button>
                        </div>

                    </div>
                    <div style={{}} className='w-full h-[450px] p-2 overflow-y-scroll'>
                        {state === "shorts" && channel && <ShortsMap shorts={channel.shorts} />}
                        {state === "live" && channel && <LiveMap shorts={channel.live} />}
                        {state === "videos" && channel && <VideoMap shorts={channel.videos} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserChannel