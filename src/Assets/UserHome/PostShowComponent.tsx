import React, { useState, useEffect, lazy, Suspense } from 'react'
import { PostImage } from '../../Store/UserStore/Post-Management/Interfaces'
import { Carousel, Dialog } from "@material-tailwind/react"
import { useEssentials } from '../../Functions/CommonFunctions';
import { useFunctions } from './Hooks';
import PostDialog from './PostDialog';
import useWindowDimensions from '../../Other/Hooks';
import { Comments } from '../../Store/UserStore/CommonManagements/interfaces';
import CommentComponent from './CommentComponent';
const UserToolTip = lazy(() => import("../Components/UserToolTip"))

interface props {
    postData: PostImage;
}
const PostShowComponent: React.FC<props> = ({ postData }) => {
    const [post, setPost] = useState(postData)
    const [play, setPlay] = useState(false)
    const { width } = useWindowDimensions()
    const [dialog, setDialog] = useState(false)
    const { dislikePost, likePost, removeReaction, handlePlayPause, videoRef } = useFunctions({base:"post"})
    const { auth } = useEssentials()
    const [like, setLike] = useState<boolean>(false)
    const [dislike, setDisLike] = useState<boolean>(false)
    const [comments, setComments] = useState<Comments[]>([])
    const [count, setCount] = useState<{ like: number, dislike: number, comment: number }>({
        comment: 0,
        dislike: 0,
        like: 0
    })
    useEffect(() => {
        const result = post.reactions.Likes.find((val) => val === auth?.user?._id)
        setLike(result ? true : false)
        const result2 = post.reactions.Dislikes.find((val) => val === auth?.user?._id)
        setDisLike(result2 ? true : false)
        setCount({ ...count, like: post.reactions.Likes.length, dislike: post.reactions.Dislikes.length })
        setComments(post.comments)
    }, [])
    return (
        <div className="animate-slideInFromLeft p-4">
            {dialog && width > 768 && <PostDialog open={dialog} setPost={setPost} comments={comments} setComments={setComments} setOpen={setDialog} post={post} count={count} setCount={setCount} like={like} setLike={setLike} dislike={dislike} setDisLike={setDisLike} />}
            {dialog && width <= 768 && <Dialog className='w-full' open={dialog} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} handler={() => setDialog(false)}><CommentComponent PostId={postData._id} comments={comments} setComments={setComments} /></Dialog>}

            <div className="bg-white border rounded-lg flex-shrink-0 md:min-w-[400px] max-w-md">
                <div className="flex items-center px-4 py-3 relative">
                    <img crossOrigin="anonymous" className="h-8 w-8 rounded-full object-cover" src={post.user.Profile} />
                    <div className="ml-3">
                        <span className="text-sm font-semibold antialiased block leading-tight">{post.user.Name}</span>
                        <span className="text-gray-600 text-xs block">{post.user.Username}</span>
                    </div>
                    <div className='absolute right-5'>
                        <button><i className='fa fa-ellipsis-v'></i></button>
                    </div>
                </div>
                <Carousel className='relative' autoplay={!play} loop placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    {post.Images.map((image, imgIndex) => (
                        <div key={imgIndex} className='md:h-[400px] relative h-[300px] w-full flex items-center justify-center bg-black'>
                            {image.postType === 'image' ? (
                                <img onClick={() => {
                                    if (width > 768) {
                                        setDialog(!dialog)
                                    }
                                }} src={image.link} alt={""} className='object-contain rounded-md w-full h-full' />
                            ) : (
                                <>
                                    <video
                                        ref={videoRef}
                                        src={image.link}
                                        className='object-cover w-full h-full'
                                        onPlay={() => setPlay(true)}
                                        onPause={() => setPlay(false)}
                                        onClick={() => {
                                            handlePlayPause(play)
                                            setPlay(false)
                                        }}
                                    >
                                        Your browser does not support the video tag.
                                    </video>
                                    {!play && (
                                        <button
                                            onClick={() => handlePlayPause(play)}
                                            className='absolute rounded-full bg-blue-700 flex items-center justify-center p-2 w-8 h-8 z-50'
                                            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                                        >
                                            <i className='fa fa-play self-center text-white'></i>
                                        </button>
                                    )}
                                </>
                            )}
                            {postData.tags.length > 0 && <div className='absolute bottom-3 right-3'>
                                <button className='bg-gray-800 p-2 rounded-md'>{post.tags.length} Tags</button>
                            </div>}
                        </div>
                    ))}
                </Carousel>
                <div className="flex items-center justify-between mx-4 mt-3 mb-2">
                    <div className="flex gap-5">
                        <button onClick={async () => {
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
                            <svg xmlns="http://www.w3.org/2000/svg" fill={like ? "blue" : ""} height="24" width="24" viewBox="0 0 24 24" id="like"><path d="M21.3,10.08A3,3,0,0,0,19,9H14.44L15,7.57A4.13,4.13,0,0,0,11.11,2a1,1,0,0,0-.91.59L7.35,9H5a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17.73a3,3,0,0,0,2.95-2.46l1.27-7A3,3,0,0,0,21.3,10.08ZM7,20H5a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H7Zm13-7.82-1.27,7a1,1,0,0,1-1,.82H9V10.21l2.72-6.12A2.11,2.11,0,0,1,13.1,6.87L12.57,8.3A2,2,0,0,0,14.44,11H19a1,1,0,0,1,.77.36A1,1,0,0,1,20,12.18Z"></path></svg>
                        </button>
                        <button onClick={async () => {
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
                            <svg xmlns="http://www.w3.org/2000/svg" fill={dislike ? "red" : ""} height="24" width="24" viewBox="0 0 24 24" id="dislike"><path d="M19,2H6.27A3,3,0,0,0,3.32,4.46l-1.27,7A3,3,0,0,0,5,15H9.56L9,16.43A4.13,4.13,0,0,0,12.89,22a1,1,0,0,0,.91-.59L16.65,15H19a3,3,0,0,0,3-3V5A3,3,0,0,0,19,2ZM15,13.79l-2.72,6.12a2.13,2.13,0,0,1-1.38-2.78l.53-1.43A2,2,0,0,0,9.56,13H5a1,1,0,0,1-.77-.36A1,1,0,0,1,4,11.82l1.27-7a1,1,0,0,1,1-.82H15ZM20,12a1,1,0,0,1-1,1H17V4h2a1,1,0,0,1,1,1Z"></path></svg>
                        </button>
                        <button onClick={() => {
                            setDialog(!dialog)
                        }} >
                            <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path clipRule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fillRule="evenodd"></path></svg>
                        </button>
                        <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path></svg>
                    </div>
                    <div className="flex">
                        <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path></svg>
                    </div>
                </div>
                {postData.Caption.length > 0 && <div className={`w-full ${count.like !== 0 ? "mb-0" : "mb-2"} font-semibold mx-4 flex items-center flex-shrink-0 text-sm text-black`}>
                    <h1>{postData.Caption}</h1>
                </div>}
                {count.like !== 0 && <div className="font-semibold text-sm mx-4 items-center mb-4">
                    <h1>{count.like} {count.like > 1 ? "likes" : "like"}</h1>
                    <div className='font-light text-xs text-gray-500 flex items-center'>
                        <h1 className='mr-1'>liked by {like && `you ${post.reactions.LikesDetails.length > 1 ? "&" : ""}`}</h1>
                        <Suspense>
                            <UserToolTip users={[...post.reactions.LikesDetails].filter((item) => item._id !== auth?.user?._id)} />
                        </Suspense>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default PostShowComponent