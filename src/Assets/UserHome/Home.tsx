import React from 'react'
import Preloader from '../Components/Preloader';
import { useEssentials } from '../../Functions/CommonFunctions';
import useHooks from './Hooks';
import PostShowComponent from './PostShowComponent';
// import Recommendations from './Recommendations';
// import { useOnline } from '../../Other/Hooks';
// import InfiniteScroll from 'react-infinite-scroll-component';
// import ChatLoader from '../Chat/ChatLoader';

const Home: React.FC = () => {
    const { auth } = useEssentials()
    const { post, noMore } = useHooks()
    const { loading } = auth;
    // const { online } = useOnline()
    // console.log(online, "______")

    return (
        <>
            {loading && <Preloader />}
            <div className='flex'>
                <div className='w-full flex p-1 md:pl-20'>
                    <div className='grid grid-cols-1 space-y-8 w-full md:w-2/5 h-auto'>
                        {!noMore ? (
                            <>
                                {post && post.length > 0 && post?.map((item) => (
                                    <div key={item._id} ><PostShowComponent postData={item} /></div>
                                ))}
                            </>
                        ) : (
                            <>{post && post.length > 0 && post?.map((item) => (
                                <div key={item._id} ><PostShowComponent postData={item} /></div>
                            ))}</>
                        )}
                    </div>
                    <div className='md:w-3/6 block'>
                        {/* <Recommendations users={online} /> */}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home
