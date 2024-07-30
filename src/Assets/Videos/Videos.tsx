import React, { useEffect, useState } from 'react';
import { getCookie, useEssentials } from '../../Functions/CommonFunctions';
import { getVideos } from '../../Store/UserStore/Video-Management/VideoSlice';
import { setUser, resetState } from '../../Store/UserStore/Authentication/AuthSlice';
import VideoFile from './VideoFile';
import InfiniteScroll from 'react-infinite-scroll-component';
import ChatLoader from '../Chat/ChatLoader';

const Videos: React.FC = () => {
    const { auth, navigate, dispatch, video } = useEssentials();
    const { loading } = auth;
    const { Videos, loadingVideo } = video;
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const fetchVideos = async () => {
        const token = getCookie('token');
        if(!token) navigate("/login")
        const random = Math.floor(Math.random());
        const response: any = await dispatch(getVideos({ token, skip, random }));

        if (response.payload.user) {
            dispatch(setUser(response.payload.user));
        } else if (response.payload.status === 202) {
            dispatch(resetState())
            navigate('/login');
        }
        if (!response.payload.Videos || response.payload.Videos.length === 0) {
            setHasMore(false);
        }
    };

    useEffect(() => {
        if (!loadingVideo && hasMore) {
            fetchVideos();
        }
    }, [skip]);

    const loadMoreVideos = () => {
        console.log(skip)
        if (!loading && !loadingVideo) {
            setSkip(prevSkip => prevSkip + 10);
        }
    };

    return (
        <div className='w-full h-auto mt-4'>
            {/* {(loading || loadingVideo) && <Preloader />} */}
            <div className="w-full flex items-center justify-center">
                {Videos.length > 0 && (
                    <InfiniteScroll
                        scrollThreshold={"10px"}
                        dataLength={Videos.length}
                        next={loadMoreVideos}
                        hasMore={hasMore}
                        loader={<ChatLoader />}
                    >
                        <div className='px-4 grid md:grid-cols-4 sm:grid-cols-1 gap-2'>
                            {Videos && Videos.map((video) => (
                                <div className='w-full' key={video.VideoLink}>
                                    <VideoFile video={video} />
                                </div>
                            ))}
                            
                        </div>
                    </InfiniteScroll>
                )}
                {Videos.length < 1 && !loadingVideo && !loading && (
                    <div onClick={() => navigate("/videos/upload")} className='h-[400px] animate-popup outline-2 mt-20 hover:text-white text-gray-400 w-[400px] rounded-lg bg-gray-700'>
                        <div className='w-full mt-20 text-2xl font-semibold flex items-center justify-center'>
                            <h1>Upload Videos</h1>
                        </div>
                        <br />
                        <div className='flex font-semibold items-center justify-center'>
                            <i className='fa fa-upload text-[100px] hover:text-white text-gray-400'></i>
                        </div>
                        <div className='text-sm w-full flex items-center justify-center'>
                            <h1>No Videos Uploaded Yet</h1>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Videos;
