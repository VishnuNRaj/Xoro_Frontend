// import React, { useState, useEffect, memo } from 'react';
// // import Webcam from 'react-webcam';
// import { Offcanvas } from '../Components/Canvas';
// import Cookies from 'js-cookie';
// import { AppDispatch } from '../../Store/Store';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { AuthUser, resetState } from '../../Store/UserStore/Authentication/AuthSlice';
// import { addPost } from '../../Store/UserStore/Post-Management/PostService';
// import { FormInput } from '../Components/Input';
// import { toast, ToastContainer } from 'react-toastify';


// const PostPage2: React.FC = memo(() => {
//     const dispatch: AppDispatch = useDispatch()
//     const navigate = useNavigate()
//     const [img] = useState<string[]>([])
//     const [Form, SetForm] = useState({
//         Caption: '',
//         Tags: [],
//         Hashtags: '',
//         CommentsOn: true,
//         Hidden: false,
//     })
//     const [error] = useState({
//         Caption: '',
//         Tags: '',
//         Hashtags: ''
//     })
//     useEffect(() => {
//         const token = Cookies.get('token')
//         if (token) {
//             dispatch(AuthUser({ token })).then((state: any) => {
//                 if (!state.payload.user) {
//                     navigate('/login')
//                 }
//             })
//         }
//     }, [])

//     const upload = () => {
//         const tagArray = Form.Hashtags.split('#')
//         const { Caption, CommentsOn, Hidden, Tags } = Form
//         const token = Cookies.get('token')
//         if (token) {
//             dispatch(addPost({ Caption, CommentsOn, Hidden, Tags, Hashtags: tagArray, Images: img, token })).then((state: any) => {
//                 if (state.payload.status === 202) {
//                     dispatch(resetState())
//                     navigate('/login')
//                 } else {
//                     toast.success(state.payload.message, {
//                         position: 'top-center',
//                         autoClose: 1000,
//                         hideProgressBar: false,
//                         closeOnClick: true,
//                         pauseOnHover: true,
//                         draggable: false,
//                         progress: undefined,
//                         onClose: state.payload.status === 200 ? () => navigate('/profile') : undefined,
//                         style: {
//                             minWidth: '400px',
//                             fontSize: '14px'
//                         }
//                     });
//                 }
//             })
//         } else {
//             dispatch(resetState())
//             navigate('/login')
//         }
//     }
//     return (
//         <div>
//             <Offcanvas />
//             <ToastContainer />

//             {img.length > 0 && (
//                 <div className='w-[80%] mx-[10%] mt-32'>
//                     <center>
//                         <div className=" w-full md:w-[40%] bg-[#222] rounded-lg p-5">


//                             <div className="grid gap-4">
//                                 <div>
//                                     <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg" alt="" />
//                                 </div>
//                                 <div className="grid grid-cols-5 gap-4">
//                                     <div>
//                                         <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt="" />
//                                     </div>
//                                     <div>
//                                         <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt="" />
//                                     </div>
//                                     <div>
//                                         <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt="" />
//                                     </div>
//                                     <div>
//                                         <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" alt="" />
//                                     </div>
//                                     <div>
//                                         <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg" alt="" />
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="w-[90%] mt-5">
//                                 <FormInput error={error.Caption} label={'Caption'} name={'Caption'} placeholder={'Enter Caption'} type={'text'} onChange={(e) => SetForm({ ...Form, Caption: e.target.value })} value={Form.Caption} width={'w-full'} />
//                             </div>
//                             <div className="w-[90%] mt-5">
//                                 <label className="inline-flex items-center cursor-pointer">
//                                     <input type="checkbox" checked={Form.CommentsOn} onChange={() => SetForm({ ...Form, CommentsOn: !Form.CommentsOn })} className="sr-only peer" />
//                                     <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
//                                     <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Comment</span>
//                                 </label>
//                                 <label className="inline-flex items-center cursor-pointer ml-3">
//                                     <input type="checkbox" checked={Form.Hidden} onChange={() => SetForm({ ...Form, Hidden: !Form.Hidden })} className="sr-only peer" />
//                                     <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
//                                     <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Hidden</span>
//                                 </label>
//                             </div>
//                             <div className="w-[90%] mt-5">
//                                 <FormInput error={error.Caption} label={'Hashtags'} name={'Hashtags'} placeholder={'Enter Hashtags'} type={'text'} onChange={(e) => SetForm({ ...Form, Hashtags: e.target.value })} value={Form.Hashtags} width={'w-full'} />
//                             </div>

//                             <div className='w-full'>
//                                 <button onClick={upload} className='bg-green-700 text-white p-2 px-3 rounded-md mt-5'>Upload</button>
//                             </div>
//                         </div>
//                     </center>
//                 </div>
//             )}

//         </div>
//     )
// })

// export default PostPage2;



import React, { useState, useEffect, memo } from 'react';
import { Offcanvas } from '../Components/Canvas';
import Cookies from 'js-cookie';
import { AppDispatch, RootState } from '../../Store/Store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthUser, resetState } from '../../Store/UserStore/Authentication/AuthSlice';
import { addPost } from '../../Store/UserStore/Post-Management/PostSlice';
import { FormInput } from '../Components/Input';
import { toast, ToastContainer } from 'react-toastify';
import Preloader from '../Components/Preloader';
interface UploadProps {
    imgData: string[]
}

const Upload: React.FC<UploadProps> = memo(({ imgData }) => {
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()
    const { loadingPost } = useSelector((state: RootState) => state.post)
    const [show, setShow] = useState<string>(imgData[0])
    const [Form, SetForm] = useState({
        Caption: '',
        Tags: [],
        Hashtags: '',
        CommentsOn: true,
        Hidden: false,
    });
    const [error] = useState({
        Caption: '',
        Tags: '',
        Hashtags: ''
    });

    useEffect(() => {
        const token = Cookies.get('token')
        if (token) {
            dispatch(AuthUser({ token })).then((state: any) => {
                if (!state.payload.user) {
                    navigate('/login')
                }
            })
        }
    }, []);

    if (loadingPost) {
        return <Preloader />
    }

    const upload = () => {
        const tagArray = Form.Hashtags.split('#')
        const { Caption, CommentsOn, Hidden, Tags } = Form
        const token = Cookies.get('token')
        if (token) {
            dispatch(addPost({ Caption, CommentsOn, Hidden, Tags, Hashtags: tagArray, Images: imgData, token })).then((state: any) => {
                console.log(state)
                if (state.payload.status === 202) {
                    dispatch(resetState())
                    navigate('/login')
                } else {
                    toast.success(state.payload.message, {
                        position: 'top-center',
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        onClose: state.payload.status === 200 ? () => navigate('/profile') : undefined,
                        style: {
                            minWidth: '400px',
                            fontSize: '14px'
                        }
                    });
                }
            })
        } else {
            dispatch(resetState())
            navigate('/login')
        }
    };

    return (
        <div>
            <Offcanvas />
            <ToastContainer />

            {imgData.length > 0 && (
                <center>
                    <div className='w-9/12 mx-[10%] mt-32'>
                        <center>
                            <div className=" w-full md:w-[40%] bg-[#222] rounded-lg p-5">
                                <div className="grid gap-4">
                                    <div>
                                        {imgData.length > 0 && (
                                            <img className="h-auto max-w-full rounded-lg" src={show} alt="" />
                                        )}
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        {imgData.map((img: string) => (
                                            show !== img && (
                                                <div key={img} className='w-full h-full bg-black'>
                                                    <img className="h-auto max-w-full rounded-lg" onClick={() => setShow(img)} src={img} alt="" />
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </div>

                                <div className="w-[90%] mt-5">
                                    <FormInput error={error.Caption} label={'Caption'} name={'Caption'} placeholder={'Enter Caption'} type={'text'} onChange={(e) => SetForm({ ...Form, Caption: e.target.value })} value={Form.Caption} width={'w-full'} />
                                </div>
                                <div className="w-[90%] mt-5">
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input type="checkbox" checked={Form.CommentsOn} onChange={() => SetForm({ ...Form, CommentsOn: !Form.CommentsOn })} className="sr-only peer" />
                                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Comment</span>
                                    </label>
                                    <label className="inline-flex items-center cursor-pointer ml-3">
                                        <input type="checkbox" checked={Form.Hidden} onChange={() => SetForm({ ...Form, Hidden: !Form.Hidden })} className="sr-only peer" />
                                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Hidden</span>
                                    </label>
                                </div>
                                <div className="w-[90%] mt-5">
                                    <FormInput error={error.Caption} label={'Hashtags'} name={'Hashtags'} placeholder={'Enter Hashtags'} type={'text'} onChange={(e) => SetForm({ ...Form, Hashtags: e.target.value })} value={Form.Hashtags} width={'w-full'} />
                                </div>

                                <div className='w-full'>
                                    <button onClick={upload} className='bg-green-700 text-white p-2 px-3 rounded-md mt-5'>Upload</button>
                                </div>
                            </div>
                        </center>
                    </div>
                </center >
            )}
        </div >
    );
});

export default Upload;
