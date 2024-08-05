import 'video.js/dist/video-js.css';
import useWindowDimensions from '../../Other/Hooks';
import { useViewLive } from './Hooks';
import { Skeleton } from '@mui/material';
import CommentComponent from '../UserHome/CommentComponent';
import { useEffect, useState } from 'react';
import { useEssentials } from '../../Functions/CommonFunctions';
import { LiveInterface } from '../../Store/UserStore/CommonManagements/interfaces';
import { useFunctions } from '../UserHome/Hooks';
import { Toaster } from 'sonner';
import { useSocket } from '../../Socket';
const LikeDislikeVideo: React.FC<{ post: LiveInterface }> = ({ post }) => {

  const { dislikePost, likePost, removeReaction } = useFunctions({ base: "live" })
  const { auth } = useEssentials()
  console.log(post)
  useEffect(() => {
    setCount({ like: post.reactions[0].Likes.length, dislike: post.reactions[0].Dislikes.length })
    setLike(auth.user?._id ? post.reactions[0].Likes.includes(auth.user._id) : false)
    setDisLike(auth.user?._id ? post.reactions[0].Dislikes.includes(auth.user._id) : false)
  }, [])
  const socket = useSocket()
  const [count, setCount] = useState<{ like: number, dislike: number }>({
    dislike: 0,
    like: 0
  })
  useEffect(() => {
    if (socket) {
      socket.on("liked", (postId: string) => {
        if (postId === post._id) setCount({ ...count, like: count.like + 1 })
      })
      socket.on("removedlike", (postId: string) => {
        if (postId === post._id) setCount({ ...count, like: count.like - 1 })
      })
      socket.on("disliked", (postId: string) => {
        if (postId === post._id) setCount({ ...count, like: count.dislike + 1 })
      })
      socket.on("removeddislike", (postId: string) => {
        if (postId === post._id) setCount({ ...count, like: count.dislike - 1 })
      })
    }
  }, [socket])
  const [like, setLike] = useState<boolean>(false)
  const [dislike, setDisLike] = useState<boolean>(false)
  return (
    <>
      <div className="flex items-center justify-between md:mx-4 ml-4 mt-3 mb-2 font-semibold">
        <Toaster richColors position="top-right" />
        <div className="flex">
          <button className='md:p-2 pr-2 rounded-full'>
            <svg fill="#f0f2f5" height="20" viewBox="0 0 48 48" width="20"><path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path></svg>
          </button>
          <div className='flex bg-slate-900 mr-2 rounded-full'>
            <button className={`md:p-2 p-1 flex md:gap-2 gap-1 text-white text-sm items-center md:px-4 px-2 border-r-2 rounded-l-full ${like ? "bg-blue-600" : ""}`} onClick={async () => {
              if (!like || dislike) {
                await likePost(post._id)
                setCount({ ...count, like: count.like + 1, dislike: count.dislike - (dislike ? 1 : 0) })
                if (post.Live) socket?.emit("liked", post._id)
              } else {
                await removeReaction(post._id)
                setCount({ ...count, like: count.like - 1 })
                if (post.Live) socket?.emit("removedlike", post._id)
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
                if (post.Live) socket?.emit("disliked", post._id)
              } else {
                await removeReaction(post._id)
                setCount({ ...count, dislike: count.dislike - 1 })
                if (post.Live) socket?.emit("removeddislike", post._id)
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
const ViewStream = () => {
  const { width } = useWindowDimensions()
  const { live, comments, setComments, loading, videoRef, subscribe, subs, handleSubscribe, handleUnsubscribe } = useViewLive()
  return (
    <div className='w-full h-full animate-slideInFromLeft'>
      <div className='w-full lg:flex gap-5 md:mt-2 md:px-4 px-3 mt-3 max-h-[600px]'>
        <div className={`${width > 968 ? "w-4/6" : "w-full"} flex`}>
          <div className='aspect-video w-full md:h-[75vh] bg-gray-800 items-center rounded-md'>
            {loading ? (
              <Skeleton variant="rectangular" width="100%" height="100%" className='rounded-md' />
            ) : (
              <video style={{ borderRadius: "5px", minHeight: width > 968 ? "60vh" : "auto" }} poster={live?.Thumbnail} ref={videoRef} controls className='w-full rounded-lg border-2 border-gray-400 video-js videoContainer vjs-default-skin'>
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
        <div className={`${width <= 968 && "hidden"} items-center justify-center lg:w-2/6 w-full lg:mt-0 mt-5 border-2 border-gray-400 lg:max-h-full bg-[#111] rounded-lg`}>
          {live && <CommentComponent live={live.Live} comments={comments} setComments={setComments} PostId={live._id} />}
        </div>
      </div>
      <div className='md:w-4/6 w-full md:px-2'>
        <div className='w-full rounded-lg items-center md:p-2'>
          <div className='w-full flex-shrink-0 text-lg font-semibold text-white px-4'>
            <h1 className=''>{live?.Caption}</h1>
          </div>
          <div className='w-full md:mt-2 h-[60px] justify-items-stretch grid grid-cols-2 gap-2'>
            <div className='w-full flex items-center px-1 gap-3'>
              <div className='flex'>
                <div className='md:w-10 w-9 h-9 md:h-10 ml-1 flex-shrink-0 rounded-full'>
                  <img src={live?.channel[0].Logo} className='rounded-full flex-shrink-0 md:w-10 w-8 h-8 md:h-10 shadow-md shadow-red-400 object-center' alt="" />
                </div>
                <div className='w-full min-w-[80px] ml-1 pl-1'>
                  <div className='font-semibold text-gray-300'>
                    <h1 className='test-[10px]'>{live?.channel[0].Name}</h1>
                    <p className='md:text-[11px] text-[10px] text-gray-500'>{subs > 0 ? (
                      <>{subs > 1000 ? <>{parseInt((subs / 1000).toString())}K</> : <>{subs}</>} Subscribers</>
                    ) : <>No subsribers</>}</p>
                  </div>
                </div>
                <div className='w-full flex md:ml-2 items-end ml-0 h-10 md:px-1 font-semibold text-[10px] md:text-[16px]'>
                  <button onClick={subscribe ? handleUnsubscribe : handleSubscribe} className={`h-9 md:h-10 px-3 flex items-center justify-center rounded-full ${subscribe ? "bg-slate-500 text-gray-200" : "bg-red-600 text-white"}`} >{!subscribe ? "Subscribe" : "Unsubscribe"}</button>
                </div>
              </div>
            </div>
            <div className='w-full flex h-10 justify-end'>
              {live && <LikeDislikeVideo post={live} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStream;
