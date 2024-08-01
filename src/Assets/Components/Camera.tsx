import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

interface CameraProps {
    setMedia: React.Dispatch<React.SetStateAction<File[]>>;
}


const Camera: React.FC<CameraProps> = ({ setMedia }) => {
    const webcamRef = useRef<any>(null);
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
    const [recording, setRecording] = useState(false);
    const [mediaFiles, setMediaFiles] = useState<File[]>([]);
    const [cam, setCam] = useState<'user' | 'environment'>('environment')

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const draggedIndex = parseInt(event.dataTransfer.getData('index'));
        const droppedIndex = parseInt(event.currentTarget.getAttribute('data-index')!);
        if (draggedIndex !== droppedIndex) {
            const newMediaFiles = [...mediaFiles];
            const temp = newMediaFiles[draggedIndex];
            newMediaFiles[draggedIndex] = newMediaFiles[droppedIndex];
            newMediaFiles[droppedIndex] = temp;
            setMediaFiles(newMediaFiles);
        }
    };

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, index: number) => {
        event.dataTransfer.setData('index', index.toString());
    };

    const startRecording = () => {
        if (webcamRef.current) {
            navigator.mediaDevices.getUserMedia({ video: { facingMode: cam, frameRate: 60 }, audio: true })
                .then((stream) => {
                    const mediaRecorder = new MediaRecorder(stream);
                    const chunks: Blob[] = [];

                    mediaRecorder.ondataavailable = (e) => {
                        if (e.data.size > 0) {
                            chunks.push(e.data);
                        }
                    };

                    mediaRecorder.onstop = () => {
                        const blob = new Blob(chunks, { type: 'video/webm' });
                        const url = URL.createObjectURL(blob);
                        console.log('Recording stopped:', url);
                        setRecording(false);
                        setMediaStream(null);
                        setMediaFiles(prevFiles => [...prevFiles, new File([blob], `video-${Date.now()}.webm`, { type: 'video/webm' })]);
                    };

                    mediaRecorder.start();
                    setRecording(true);
                    setMediaStream(stream);
                })
                .catch((error) => {
                    console.error('Error accessing media devices:', error);
                });
        }
    };

    const stopRecording = () => {
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
        }
    };

    const captureImage = () => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            fetch(imageSrc)
                .then((res) => res.blob())
                .then((blob) => {
                    console.log('Captured image:', blob);
                    setMediaFiles(prevFiles => [...prevFiles, new File([blob], `image-${Date.now()}.jpeg`, { type: 'image/jpeg' })]);
                })
                .catch((error) => {
                    console.error('Error capturing image:', error);
                });
        }
    };


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files).filter((file: File) => file.type.split('/')[0] === 'image' || file.type.split('/')[0] === 'video');
            console.log(files)
            setMediaFiles([...mediaFiles,...files])
        }
    };

    const deleteMedia = (index: number) => {
        setMediaFiles(prevFiles => prevFiles.filter((_file, i) => i !== index));
    };

    const clearAllMedia = () => {
        setMediaFiles([]);
    };

    return (
        <div className="flex flex-col items-center justify-center relative">
            {mediaFiles.length < 5 && (
                <>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        className='rounded-lg border-4 border-blue-700'
                        videoConstraints={{
                            facingMode: cam,
                        }}
                    />
                    <div className={`sticky -mt-16 left-0 right-0 flex justify-center`}>
                        {!recording ? (
                            <>
                                <button className='bg-blue-700 w-10 h-10 m-2 border-2 text-white rounded-full'  onClick={() => document.getElementById('profile-upload')?.click()}><i className='fa fa-image'></i></button>
                                <input multiple id="profile-upload" onChange={handleFileChange} type="file" className="hidden" />
                                <button className='text-blue-700 w-10 h-10 m-2 bg-white rounded-full' onClick={() => {
                                    setCam(cam === 'user' ? 'environment' : 'user')
                                }}><i className='fa fa-refresh'></i></button>
                                <button className='bg-red-700 w-10 h-10 m-2 border-2 text-white rounded-full' onClick={startRecording}><i className='fa fa-video-camera'></i></button>
                                <button className='text-blue-700 w-10 h-10 m-2 bg-white rounded-full' onClick={captureImage}><i className='fa fa-camera'></i></button>
                            </>
                        ) : (
                            <>
                                <button className='bg-red-700 animate-pulse w-10 h-10 border-2 border-white p-1 m-2 text-white rounded-full' onClick={stopRecording}><i className='fa fa-stop-circle w-4 h-4 '></i></button>
                            </>
                        )}
                        {mediaFiles.length > 0 && <button className='text-red-700 w-10 h-10 aspect-square m-2 bg-white rounded-full' onClick={clearAllMedia}><i className='fa fa-trash'></i> </button>}
                    </div>
                </>
            )}
            {mediaFiles.length >= 5 && (
                <>
                    <center><h1 className='text-red-700 text-xl font-semibold'>Maximum Post Reached</h1></center>
                    {mediaFiles.length > 0 && <button className='text-red-700 p-2 px-3 m-2 bg-white rounded-full' onClick={clearAllMedia}><i className='fa fa-trash'></i> Clear All</button>}
                </>
            )}
            <div className="w-[80%] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-5">
                {mediaFiles.map((file, index) => (
                    <div key={index} className='rounded-md p-3 media-item relative' data-index={index} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
                        {
                            file.type.startsWith('image') ?
                                (
                                    <div>
                                        <img crossOrigin="anonymous" src={URL.createObjectURL(file)} className='w-40 h-40 aspect-square object-cover rounded-md' alt={file.name} draggable onDragStart={(e) => handleDragStart(e, index)} />
                                        <div className="absolute top-4 right-4">
                                            <button className='text-red-700 w-6 h-6 m-1 bg-white rounded-full' onClick={() => deleteMedia(index)}><i className='fa fa-trash'></i></button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <video
                                            crossOrigin="anonymous"
                                            className='w-full rounded-md border-2'
                                            src={URL.createObjectURL(file)}
                                            controls={false}
                                            onMouseOver={(e) => {
                                                e.currentTarget.controls = true;
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.controls = false;
                                            }}
                                            draggable
                                            onDragStart={(e: any) => handleDragStart(e, index)}
                                        />

                                        <div className="absolute top-4 right-4">
                                            <button className='text-red-700 w-6 h-6 m-1 bg-white rounded-full' onClick={() => deleteMedia(index)}><i className='fa fa-trash'></i></button>
                                        </div>
                                    </div>
                                )
                        }
                    </div>
                ))}
            </div>
            {mediaFiles.length > 0 && (
                <div className='w-full'>
                    <center>
                        <button onClick={() => setMedia(mediaFiles)} className='text-white bg-green-700 font-medium p-2 px-4 w-[100px] '>  Next <i className='fa fa-skipfa fa-angle-double-right ml-3'></i></button>
                    </center>
                </div>
            )}
        </div>
    );


};

export default Camera;
