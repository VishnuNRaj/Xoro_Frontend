import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useEssentials, getCookie, useToast } from '../../Functions/CommonFunctions';
import { Video } from '../../Store/UserStore/Video-Management/Interfaces';
import { getVideo } from '../../Store/UserStore/Video-Management/VideoSlice';
import Skeleton from '@mui/material/Skeleton';
import { setUser } from '../../Store/UserStore/Authentication/AuthSlice';

const ShowVideos: React.FC = () => {
    const { VideoLink } = useParams();
    const { navigate, dispatch, video } = useEssentials();
    const { loadingVideo } = video;
    const [videoData, setVideoData] = useState<Video | null>(null);

    useEffect(() => {
        const token: string | undefined = getCookie('token');
        if (!token) navigate("/login");
        if (!VideoLink) navigate("/videos");
        if (token && VideoLink) {
            dispatch(getVideo({ token, VideoLink })).then((response: any) => {
                console.log(response.payload);
                if (!response.payload.user) navigate("/login");
                if (!response.payload.Video) {
                    useToast("No Video Found", "error");
                    navigate("/videos");
                }
                dispatch(setUser(response.payload.user));
                setVideoData(response.payload.Video);
            });
        }
    }, [VideoLink, navigate, dispatch]);

    return (
        <div className='w-full h-auto'>
            <div className='w-full flex p-2 px-4'>
                <div className='w-full md:w-3/5'>
                    <div className='aspect-video w-full'>
                        {loadingVideo ? (
                            <Skeleton variant="rectangular" width="100%" height="100%" className='rounded-md' />
                        ) : (
                            <video controls className='w-full h-full rounded-md'>
                                <source src={videoData?.Video} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowVideos;
