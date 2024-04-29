import React, { useState } from 'react';
import { RootState } from '../../Store/Store';
import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';
import Preloader from '../Components/Preloader';

const ImgComponent: React.FC = () => {
    // const dispatch: AppDispatch = useDispatch();
    const { loadingPost, post } = useSelector((state: RootState) => state.post);
    // const navigate = useNavigate();

    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [menuIndex, setMenuIndex] = useState<number | null>(null);

    const handleMenuOpen = (index: number) => {
        setMenuOpen(!menuOpen);
        setMenuIndex(index);
    };


    if (!post || post.length === 0) {
        return <div className="text-center font-semibold text-xl">No posts available</div>;
    }

    if (loadingPost) {
        return <Preloader />
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 font-semibold">
            {post.map((item, index) => (
                <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}
                >
                    <img src={item.Images[0]} alt='' className='w-full h-[100%] rounded-md' />
                    <div className="absolute top-0 cursor-pointer right-0 p-2 text-black hover:text-white" onClick={() => handleMenuOpen(index)}>
                        <Menu placement="left-start" open={menuOpen && menuIndex === index}>
                            <MenuHandler>
                                <i className="fa fa-ellipsis-v" onClick={() => handleMenuOpen(index)}></i>
                            </MenuHandler>
                            <MenuList className='font-semibold bg-black rounded-xl'>
                                <MenuItem className='text-white hover:bg-green-700 '>Edit <i className='fa fa-edit float-right'></i></MenuItem>
                                <MenuItem className='text-red-700 hover:bg-red-700 hover:text-white'>Delete <i className='fa fa-trash float-right'></i></MenuItem>
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
