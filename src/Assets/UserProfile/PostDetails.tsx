import React, { useEffect } from 'react';
import Preloader from '../Components/Preloader';
import { useEssentials } from '../../Functions/CommonFunctions';

interface postDetail {
    index: number;
}

const PostDetails: React.FC<postDetail> = ({ index }) => {
    const { Post } = useEssentials()
    const { loadingPost, post } = Post;
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
                {post.map((_item, _index) => (
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