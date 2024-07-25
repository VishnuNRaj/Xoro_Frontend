import React, { SetStateAction, useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import CommentComponent from '../UserHome/CommentComponent';
import 'video.js/dist/video-js.css';
import { useVideoPlayer } from './Hooks';
import { useFunctions } from '../UserHome/Hooks';
import { Video } from '../../Store/UserStore/Video-Management/Interfaces';
import useWindowDimensions from '../../Other/Hooks';

const LikeDislikeVideo: React.FC<{ post: Video, dialog: boolean, setDialog: React.Dispatch<SetStateAction<boolean>>, comment: number }> = ({ post, dialog, setDialog, comment }) => {

    const { dislikePost, likePost, removeReaction } = useFunctions({ base: "video" })
    useEffect(() => {
        setCount({ like: post.Likes, dislike: post.Dislikes, comment: comment })
        setLike(post.Liked)
        setDisLike(post.Disliked)
    }, [])
    const [count, setCount] = useState<{ like: number, dislike: number, comment: number }>({
        comment: 0,
        dislike: 0,
        like: 0
    })
    const [like, setLike] = useState<boolean>(false)
    const [dislike, setDisLike] = useState<boolean>(false)
    return (
        <>
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
            </div>
        </>
    )
}

const ShowVideos: React.FC = () => {
    const { comments, loadingVideo, handlePlayerClick, setComments, videoData, videoRef, dialog, setDialog } = useVideoPlayer()
    const { width } = useWindowDimensions()
    return (
        <div className='w-full h-auto'>
            <div className='w-full flex gap-2 md:mt-5 md:px-4 px-2 mt-3 max-h-[600px]'>
                <div className={`${width > 968 ? "w-4/6" : "w-full"} flex`}>
                    <div className='aspect-video w-full rounded-md'>
                        {loadingVideo ? (
                            <Skeleton variant="rectangular" width="100%" height="100%" className='rounded-md' />
                        ) : (
                            <video style={{ borderRadius: "5px", minHeight: width > 968 ? "65vh" : "auto" }} poster={videoData?.Thumbnail} onKeyDown={handlePlayerClick} ref={videoRef} controls className='w-full h-full aspect-video rounded-md video-js vjs-default-skin'>
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </div>
                </div>
                <div className={`${width > 968 && "md:block"} items-center justify-center hidden w-2/6 max-h-[70vh] bg-[#111] rounded-md`}>
                    {videoData && <CommentComponent comments={comments} setComments={setComments} PostId={videoData._id} />}
                </div>
            </div>
            <div className='w-full flex gap-2 px-4 h-[60px] mt-4 rounded-lg items-center bg-[#333]'>
                <div className='w-full md:w-4/6 grid grid-cols-2 gap-2'>
                    <div className='w-full'>
                        {videoData && <LikeDislikeVideo comment={comments.length} dialog={dialog} setDialog={setDialog} post={videoData} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowVideos;
