import React, { useState, useEffect, memo } from 'react';
import { Offcanvas } from '../Components/Canvas';
import Cookies from 'js-cookie';
import { AppDispatch } from '../../Store/Store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthUser } from '../../Store/UserStore/Authentication/AuthSlice';
import Upload from './PostPage3';

const Gallery: React.FC = memo(() => {
    const [imgs, setImgs] = useState<string[]>([]);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const promises: Promise<string>[] = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            promises.push(
                new Promise((resolve) => {
                    reader.onloadend = () => {
                        if (typeof reader.result === 'string') {
                            resolve(reader.result);
                        }
                    };
                })
            );
        }

        Promise.all(promises).then((results) => {
            setImgs(results);
        });
    };
    const [next, setNext] = useState<boolean>(false)
    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            dispatch(AuthUser({ token })).then((state: any) => {
                if (!state.payload.user) {
                    navigate('/login');
                }
            });
        }
    }, []);

    return (
        <div>
            <Offcanvas />
            <div className='w-full'>
                {!next && (
                    <>
                        {imgs.length === 0 ? (
                            <div className='w-auto'>
                                <center>
                                    <label htmlFor="file-upload" className="file-upload-label">
                                        <input id="file-upload" multiple hidden type="file" onChange={handleChange} className="file-upload-input" />
                                        <img src={'https://t4.ftcdn.net/jpg/05/65/22/41/360_F_565224180_QNRiRQkf9Fw0dKRoZGwUknmmfk51SuSS.jpg'} alt="Upload" className="upload-image mt-40" />
                                    </label>
                                </center>
                            </div>
                        ) : (
                            <div>
                                <div className="w-full p-5 px-8 mt-40 bg-white">
                                    <div className="w-full flex justify-center">
                                        <div className="w-full">
                                            {imgs.map((img, index) => (
                                                <div className="w-full float left" key={index}>
                                                    <img src={img} alt="" className="w-40 float-left h-40 border-2 border-violet-700" />
                                                </div>
                                            ))}
                                        </div>
                                        <center><button onClick={() => setImgs([])} className='text-white bg-red-700 p-2 ml-5 px-3 rounded-sm'>Clear</button></center>
                                        <center><button onClick={() => setNext(!next)} className='text-white bg-green-700 p-2 px-3 rounded-sm'>Next</button></center>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
                {next && (
                    <Upload imgData={imgs} />
                )}
            </div>
        </div>
    );
});

export default Gallery;
