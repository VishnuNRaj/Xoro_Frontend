import React, { useEffect } from 'react';
import Cookies from 'js-cookie'
import { AppDispatch, RootState } from '../../Store/Store';
import { useDispatch, useSelector } from 'react-redux';
import Preloader from '../Components/Preloader';

interface postDetail {
    index: number;
}

const PostDetails: React.FC<postDetail> = ({ index }) => {
    const dispatch: AppDispatch = useDispatch()
    const { loadingPost, post } = useSelector((state: RootState) => state.post)
    useEffect(() => {
        window.scrollTo({
            top: 400 * index,
            behavior: 'smooth'
        });
    }, [])
    return (
        <>
            {loadingPost && <Preloader />}
            <div className='mt-40'>
                {post.map((item, index) => (
                    <>
                        <div className='w-full md:w-[50%] h-[400px] float-left'>
                            <div className=''></div>
                        </div>
                    </>
                ))}
            </div>
        </>
    )
}

export default PostDetails