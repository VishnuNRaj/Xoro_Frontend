import React, { useState } from 'react';
// import { AppDispatch, RootState } from '../../Store/Store';
// import { useDispatch, useSelector } from 'react-redux';
// import { Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';
// import Preloader from '../Components/Preloader';
// import Cookies from 'js-cookie';
// import { deletePost, setPosts } from '../../Store/UserStore/Post-Management/PostSlice';
// import { useNavigate } from 'react-router-dom';
import { PostImage } from '../../Store/UserStore/Post-Management/Interfaces';

const ImgComponent: React.FC<{ post: PostImage[] }> = ({ post }) => {
    // const navigate = useNavigate()
    // const dispatch: AppDispatch = useDispatch()
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    // const [menuOpen, setMenuOpen] = useState<number | null>(null);
    // const menuRef = useRef<HTMLDivElement>(null);

    if (!post || post.length === 0) {
        return <div className="text-center font-semibold text-xl">Upload Feeds</div>;
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 font-semibold">
            {post.map((item, index) => (
                <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}
                >
                    {item.Images[0].postType === 'image' ? (
                        <img src={item.Images[0].link} alt='' onClick={() => {
                            // setShow(post[index])
                        }} className='object-cover border-2 border-gray-400 overflow-hidden aspect-square cursor-pointer rounded-md' />
                    ) : (
                        <video className='cursor-pointer' onClick={() => {
                            // setShow(post[index])
                        }} src={item.Images[0].link} controls></video>
                    )}
                    {hoverIndex === index && (
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gray-800 bg-opacity-75 text-white text-sm opacity-100 transition-opacity duration-300">
                            <p className='text-black float-left'>
                                <i className='fa fa-thumbs-up mr-1'></i>{item.Likes}
                            </p>
                            <p className='text-black float-left ml-2 '>
                                <i className='fa fa-thumbs-down mr-1'></i>{item.Dislikes}
                            </p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ImgComponent;
