import React, { useState, useRef, useEffect } from 'react';
import { AppDispatch, RootState } from '../../Store/Store';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';
import Preloader from '../Components/Preloader';
import Cookies from 'js-cookie';
import { deletePost, setPosts } from '../../Store/UserStore/Post-Management/PostSlice';
import { useNavigate } from 'react-router-dom';
import { PostImage } from '../../Store/UserStore/Post-Management/Interfaces';

const ImgComponent: React.FC = () => {
    const { post } = useSelector((state: RootState) => state.post);
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const [menuOpen, setMenuOpen] = useState<number | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [show, setShow] = useState<PostImage | null>(null)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleMenuOpen = (index: number) => {
        setMenuOpen(menuOpen === index ? null : index);
    };

    if (!post || post.length === 0) {
        return <div className="text-center font-semibold text-xl">No posts available</div>;
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
                            setShow(post[index])
                        }} className='w-full h-[100%] rounded-md' />
                    ) : (
                        <video onClick={() => {
                            setShow(post[index])
                        }} src={item.Images[0].link} controls></video>
                    )}
                    <div className="absolute top-0 cursor-pointer right-0 p-2 text-black hover:text-white" onClick={() => handleMenuOpen(index)}>
                        <Menu placement="right-start" open={menuOpen === index}>
                            <MenuHandler>
                                <i className="fa fa-ellipsis-v" onClick={() => handleMenuOpen(index)}></i>
                            </MenuHandler>
                            <MenuList ref={menuRef} className='font-semibold bg-black rounded-xl'>
                                <MenuItem className='text-white hover:bg-green-700 '>Edit <i className='fa fa-edit float-right'></i></MenuItem>
                                <MenuItem className='text-red-700 hover:bg-red-700 hover:text-white' onClick={() => {
                                    const token = Cookies.get('token')
                                    if (token) {
                                        dispatch(deletePost({ token, PostId: item._id })).then((state: any) => {
                                            if (state.payload.status === 202) {
                                                navigate('/')
                                            }
                                            dispatch(setPosts(post.filter((item, i) => {
                                                return index !== i
                                            })))
                                        })
                                    }
                                }}>Delete <i className='fa fa-trash float-right'></i></MenuItem>
                                <MenuItem className='text-white hover:bg-green-700 '>{item.Hidden ? 'Unhide' : 'Hide'} <i className={`${item.Hidden ? 'fa fa-eye-slash' : 'fa fa-eye'} float-right`}></i></MenuItem>
                                <MenuItem className='text-white hover:bg-green-700 '>{item.CommentsOn ? 'Comments Off' : 'Comments On'} <i className='fa fa-comments float-right'></i></MenuItem>
                            </MenuList>
                        </Menu>

                    </div>
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
