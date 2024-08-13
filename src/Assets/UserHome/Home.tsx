import React from 'react'
import Preloader from '../Components/Preloader';
import { useEssentials } from '../../Functions/CommonFunctions';
import useHooks from './Hooks';
import PostShowComponent from './PostShowComponent';
// import Recommendations from './Recommendations';
// import { useOnline } from '../../Other/Hooks';
import InfiniteScroll from 'react-infinite-scroll-component';
import ChatLoader from '../Chat/ChatLoader';

const Home: React.FC = () => {
    const { auth } = useEssentials()
    const { post, noMore, skipping } = useHooks()
    const { loading } = auth;
    // const { online } = useOnline()
    // console.log(online, "______")

    return (
        <>
            {loading && <Preloader />}
            <div className='flex'>
                <div className='w-full flex p-1 md:pl-4'>
                    <div className='grid grid-cols-1 space-y-8 w-full md:w-2/5'>
                        {!noMore && post.length > 8 ? (
                            <InfiniteScroll hasMore={noMore} next={skipping} loader={<ChatLoader />} dataLength={post.length} >
                                {post && post.length > 0 && post?.map((item) => (
                                    <div key={item._id} ><PostShowComponent postData={item} /></div>
                                ))}
                            </InfiniteScroll>
                        ) : (
                            <>{post && post.length > 0 && post?.map((item) => (
                                <div key={item._id} ><PostShowComponent postData={item} /></div>
                            ))}</>
                        )}
                    </div>
                    {/* <div className='md:w-3/6 right-4 top-4 fixed h-[400px] bg-red-50'>
                        <Recommendations />
                    </div> */}
                </div>
            </div>

        </>
    )
}

export default Home
