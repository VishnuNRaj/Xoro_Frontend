import React, { useState, useCallback, useEffect, memo, useRef } from 'react';
import Webcam from 'react-webcam';
import { Offcanvas } from '../Components/Canvas';
import Cookies from 'js-cookie';
import { AppDispatch } from '../../Store/Store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthUser } from '../../Store/UserStore/Authentication/AuthSlice';
import Upload from './PostPage3';


const Camera: React.FC = memo(() => {
    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const [imgFile, setImgFile] = useState<File | null>(null);
    const webcamRef = useRef<Webcam>(null);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const capture = useCallback(() => {
        if (webcamRef.current) {
            const imageSrc: string = webcamRef.current.getScreenshot() || "";
            setImgSrc(imageSrc)
        }
    }, [webcamRef]);

    const dataURItoBlob = (dataURI: string) => {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    };


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

    const switchCamera = useCallback(() => {
        if (webcamRef.current) {
            const videoStream = webcamRef.current.video?.srcObject as MediaStream;
            if (videoStream) {
                const videoTracks = videoStream.getVideoTracks();
                if (videoTracks.length > 0) {
                    const facingMode = videoTracks[0].getSettings().facingMode;
                    const newFacingMode = facingMode === 'user' ? 'environment' : 'user';
                    const constraints = { facingMode: newFacingMode };
                    navigator.mediaDevices.getUserMedia({ video: constraints })
                        .then((stream) => {
                            webcamRef.current!.video!.srcObject = stream;
                            setImgSrc(null);
                        })
                        .catch((error) => console.error('Error switching camera:', error));
                }
            }
        }
    }, [webcamRef, setImgSrc]);

    const clearImage = useCallback(() => {
        setImgSrc(null);
    }, []);

    return (
        <div>
            <Offcanvas />
            <div className="flex flex-col items-center justify-center h-[90vh] mt-5 rounded-lg relative">
                {!imgFile && (
                    <>
                        {!imgSrc && (
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                width={'80%'}
                                className="rounded-md overflow-hidden w-full"
                            />
                        )}
                        {imgSrc ? (
                            <div>
                                <div className="w-full flex justify-center items-center">
                                    <center>
                                        <img src={imgSrc} alt="captured" className="rounded-md shadow-lg max-w-80 border-2 border-white" />
                                    </center>
                                </div>
                                <div className='mt-20'>
                                    <center>
                                        <button onClick={clearImage} className=" bg-red-500 ml-5 text-white rounded-full w-10 h-10 focus:outline-none"><i className="fa fa-times"></i></button>
                                        <button onClick={clearImage} className=" bg-red-500 ml-5 text-white rounded-full w-10 h-10 focus:outline-none"><i className="fa fa-crop"></i></button>
                                        <button onClick={() => {
                                            const blob = dataURItoBlob(imgSrc);
                                            const file = new File([blob], 'captured_image.jpg', { type: 'image/jpeg' });
                                            setImgFile(file)
                                        }} className=" bg-green-500 ml-5 text-white rounded-full w-10 h-10 focus:outline-none"><i className="fa fa-send-o"></i></button>
                                    </center>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className='w-full h-[100px] mt-3'>
                                    <center>
                                        <button onClick={() => navigate('/post/gallery')} className='h-10 ml-2 rounded-md bg-green-700 text-white font-semibold text-sm px-4 py-2'><i className='fa fa-image'></i></button>
                                        <button onClick={capture} className='h-10 ml-2 rounded-md bg-blue-700 text-white font-semibold text-sm px-4 py-2'><i className='fa fa-camera'></i></button>
                                        <button onClick={switchCamera} className='h-10 ml-2 rounded-md bg-green-700 text-white font-semibold text-sm px-4 py-2'><i className='fa fa-refresh'></i></button>
                                    </center>
                                </div>
                            </>
                        )}
                    </>
                )}
                {imgFile && imgSrc && <Upload imgData={[imgSrc]} />}
            </div>
        </div >
    );
});



export default Camera