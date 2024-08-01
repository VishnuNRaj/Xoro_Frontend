import React, { SetStateAction, useState } from 'react'
import ShortsUpload from './ShortsUpload'
import { useReactions, useShorts, useShortsComponent } from './Hooks'
import { Toaster } from 'sonner'
import 'video.js/dist/video-js.css';
import CommentComponent from '../UserHome/CommentComponent';
import useWindowDimensions from '../../Other/Hooks';
import { Dialog } from '@material-tailwind/react';

const LikeDislikeVideo: React.FC<{ post: any, dialog: boolean, setDialog: React.Dispatch<SetStateAction<boolean>>, comment: number }> = ({ post, dialog, setDialog, comment }) => {
    const { count, dislike, dislikePost, like, likePost, removeReaction, setDisLike, setLike, width, setCount } = useReactions({ comment, post })
    return (
        <>
            <div className="flex items-center justify-between md:mx-4 ml-4 mt-3 mb-2 font-semibold">

                <div className="flex">
                    {width < 968 && <button className='p-2 md:px-4 rounded-full' onClick={() => {
                        setDialog(!dialog)
                    }} >
                        <svg fill="#f0f2f5" height="20" viewBox="0 0 48 48" width="20"><path clipRule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fillRule="evenodd"></path></svg>
                    </button>}
                    <button className='md:p-2 pr-2 rounded-full'>
                        <svg fill="#f0f2f5" height="20" viewBox="0 0 48 48" width="20"><path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path></svg>
                    </button>
                    <div className='flex bg-slate-900 mr-2 rounded-full'>
                        <button className={`md:p-2 p-1 flex md:gap-2 gap-1 text-white text-sm items-center md:px-4 px-2 border-r-2 rounded-l-full ${like ? "bg-blue-600" : ""}`} onClick={async () => {
                            if (!like || dislike) {
                                await likePost(post._id)
                                setCount({ ...count, like: count.like + 1, dislike: count.dislike - (dislike ? 1 : 0) })
                            } else {
                                await removeReaction(post._id)
                                setCount({ ...count, like: count.like - 1 })
                            }
                            setDisLike(false)
                            setLike(!like)
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className={`fill-gray-200`} height="20" width="20" viewBox="0 0 24 24" id="like"><path d="M21.3,10.08A3,3,0,0,0,19,9H14.44L15,7.57A4.13,4.13,0,0,0,11.11,2a1,1,0,0,0-.91.59L7.35,9H5a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17.73a3,3,0,0,0,2.95-2.46l1.27-7A3,3,0,0,0,21.3,10.08ZM7,20H5a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H7Zm13-7.82-1.27,7a1,1,0,0,1-1,.82H9V10.21l2.72-6.12A2.11,2.11,0,0,1,13.1,6.87L12.57,8.3A2,2,0,0,0,14.44,11H19a1,1,0,0,1,.77.36A1,1,0,0,1,20,12.18Z"></path></svg>
                            {count.like > 0 && (
                                <>{count.like > 1000 ? parseInt((count.like / 1000).toString()) + "K" : count.like}</>
                            )}
                        </button>
                        <button className={`p-2 md:px-3 rounded-r-full ${dislike ? "bg-red-600" : ""}`} onClick={async () => {
                            if (like || !dislike) {
                                await dislikePost(post._id)
                                setCount({ ...count, dislike: count.like + 1, like: count.like - (like ? 1 : 0) })
                            } else {
                                await removeReaction(post._id)
                                setCount({ ...count, dislike: count.dislike - 1 })
                            }
                            setLike(false)
                            setDisLike(!dislike)
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className={`fill-gray-200`} height="20" width="20" viewBox="0 0 24 24" id="dislike"><path d="M19,2H6.27A3,3,0,0,0,3.32,4.46l-1.27,7A3,3,0,0,0,5,15H9.56L9,16.43A4.13,4.13,0,0,0,12.89,22a1,1,0,0,0,.91-.59L16.65,15H19a3,3,0,0,0,3-3V5A3,3,0,0,0,19,2ZM15,13.79l-2.72,6.12a2.13,2.13,0,0,1-1.38-2.78l.53-1.43A2,2,0,0,0,9.56,13H5a1,1,0,0,1-.77-.36A1,1,0,0,1,4,11.82l1.27-7a1,1,0,0,1,1-.82H15ZM20,12a1,1,0,0,1-1,1H17V4h2a1,1,0,0,1,1,1Z"></path></svg>

                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

const Shorts: React.FC = () => {
    const [open, setOpen] = useState(false);
    const { shorts, video, getMoreShorts, id } = useShorts();
    const { width } = useWindowDimensions()
    const { videoRef, handleKeyDown, comments, setComments,handleScroll, setDialog, dialog, subs, subscribe, handleSubscribe, handleUnsubscribe } = useShortsComponent({ video, shorts, id, getMoreShorts });
    console.log(video)

    return (
        <div>
            {open && <ShortsUpload open={open} setOpen={setOpen} />}
            <Toaster richColors closeButton duration={2000} position="top-right" />
            {dialog && video && (
                <Dialog open={dialog} className='bg-[#111] p-2 bg-opacity-50' handler={() => setDialog(false)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <CommentComponent comments={comments} setComments={setComments} PostId={video._id} />
                </Dialog>
            )}
            <div className='fixed right-[20px] top-[80px]'>
                <button onClick={() => setOpen(true)} className='w-24 font-semibold text-white text-sm h-10 rounded-full bg-blue-700 p-1 px-2 flex items-center gap-2 justify-center'>
                    <i className='fa fa-upload '></i> Shorts
                </button>
            </div>
            {shorts.length < 1 && (<>
                <div className='w-full flex items-center justify-center'>
                    <div onClick={() => setOpen(true)} className='h-[400px] animate-popup outline-2 mt-20 hover:text-white text-gray-400 w-[400px] rounded-lg bg-gray-700'>
                        <div className='w-full mt-20 text-2xl font-semibold flex items-center justify-center'>
                            <h1>Upload Shorts</h1>
                        </div>
                        <br />
                        <div className='flex font-semibold items-center justify-center'>
                            <i className='fa fa-upload text-[100px] hover:text-white text-gray-400'></i>
                        </div>
                        <div className='text-sm w-full flex items-center justify-center'>
                            <h1>No Shorts Uploaded Yet</h1>
                        </div>
                    </div>
                </div>
            </>)}
            {shorts.length > 0 && video &&
                <div onScrollCapture={handleScroll} className={`w-full h-[75vh] mt-[55px]  items-center flex flex-col`}>

                    <div className={`w-full grid ${width > 968 && "grid-cols-2"} grid-cols-1 justify-center h-full`}>
                        <div className={`w-full h-full  flex flex-shrink-0 items-center justify-center relative ${width > 968 && "ml-14"}`}>
                            <div onKeyDown={handleKeyDown} className={`w-full p-2 flex items-center rounded-lg ${width > 968 && "md:w-[400px]"} border-2 h-[75vh]`}>
                                <video ref={videoRef} autoPlay loop className='w-full video-js rounded-lg vjs-default-skin'></video>
                            </div>
                            <div className='w-full absolute bg-gray-900 bg-opacity-50 flex bottom-0 items-center rounded-lg md:w-[400px] border-t-2'>
                                <LikeDislikeVideo comment={comments.length} dialog={dialog} post={video} setDialog={setDialog} />
                                <div className='w-full flex items-center'>
                                    <div className='flex'>
                                        <div className=' w-8 h-8 object-center ml-1 flex-shrink-0 rounded-full'>
                                            <img src={video.channel.Logo} className='rounded-full flex-shrink-0 w-8 h-8 shadow-md shadow-red-400 object-center' alt="" />
                                        </div>
                                        <div className='w-full min-w-[80px] ml-1 pl-1'>
                                            <div className='font-semibold text-gray-300'>
                                                <h1 className='text-sm'>{video.channel.Name}</h1>
                                                <p className='text-[10px] text-gray-500'>{subs > 0 ? (
                                                    <>{subs > 1000 ? <>{parseInt((subs / 1000).toString())}K</> : <>{subs}</>} Subscribers</>
                                                ) : <>No subsribers</>}</p>
                                            </div>
                                        </div>
                                        <div className='w-full justify-end flex items-center ml-0 h-8 font-semibold text-[10px]'>
                                            <button onClick={subscribe ? handleUnsubscribe : handleSubscribe} className={`h-8 px-3 flex items-center justify-center rounded-full ${subscribe ? "bg-slate-500 text-gray-200" : "bg-red-600 text-white"}`} >{!subscribe ? "Subscribe" : "Unsubscribe"}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {width > 968 && (
                            <div className='w-full h-full'>
                                <div className={`w-full md:w-[80%] ${width < 968 ? "hidden" : "ml-5"} bg-gray-900 rounded-lg h-full`}>
                                    <CommentComponent PostId={video._id} comments={comments} setComments={setComments} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            }
        </div>
    )
}

export default Shorts