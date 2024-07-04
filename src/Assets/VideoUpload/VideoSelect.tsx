import React, { useRef } from 'react';
import { toast } from 'react-hot-toast';
import { useEssentials } from '../../Functions/CommonFunctions'
interface selectVideoProps {
    Video: File | null;
    setVideo: React.Dispatch<React.SetStateAction<File | null>>;
    setThumbnail: React.Dispatch<React.SetStateAction<string[]>>;
}


const generateThumbnails = async (videoSrc: string) => {
    return new Promise<string[]>(async (resolve, reject) => {
        try {
            const video = document.createElement('video');
            video.src = videoSrc;
            video.addEventListener('loadedmetadata', async () => {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');

                if (!context) {
                    reject(new Error('Canvas context is not supported.'));
                    return;
                }

                const { videoWidth, videoHeight } = video;
                canvas.width = videoWidth;
                canvas.height = videoHeight;

                const thumbs: string[] = [];
                const interval = video.duration / 2;
                for (let time = 0; time <= video.duration && thumbs.length < 3; time += interval) {
                    video.currentTime = time;
                    await video.play();
                    context.drawImage(video, 0, 0, videoWidth, videoHeight);
                    thumbs.push(canvas.toDataURL('image/jpeg'));
                }

                resolve(thumbs);
            });

            video.addEventListener('error', (error) => {
                reject(error);
            });

            await video.load();
        } catch (error) {
            reject(error);
        }
    });
};



const SelectVideo: React.FC<selectVideoProps> = ({ setVideo, Video, setThumbnail }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { navigate } = useEssentials
        ()

    const handleThumbnails = async () => {
        if (!Video) return;
        try {
            const thumbnails = await generateThumbnails(URL.createObjectURL(Video));
            console.log(thumbnails)
            setThumbnail(thumbnails);
        } catch (error) {
            console.error('Error generating thumbnails:', error);
        }
    };

    const validateFile: Function = (file: File) => {
        if (file) {
            if (file.type.startsWith("video/")) {
                setVideo(file);
            } else {
                toast.error('Please Select Video File', {
                    position: 'top-right',
                    duration: 1000,
                });
            }
        }
    }

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            validateFile(selectedFile);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const droppedFile: File = event.dataTransfer.files[0];
        if (droppedFile) {
            validateFile(droppedFile)
        }
    };

    return (
        <div>
            <div className=" sm:px-8 md:px-16 sm:py-8 flex" onDragOver={handleDragOver} onDrop={handleDrop}>
                <main className="md:w-1/2 iteflexms-center justify-center mx-auto max-w-screen-lg h-full">
                    <article aria-label="File Upload Modal" className="relative h-full flex flex-col bg-white shadow-xl rounded-md">
                        <div className="float-left w-[35px] mt-3 ml-3">
                            <button id="cancel" onClick={() => navigate(-1)} className="rounded-sm py-1 px-3 float-left w-full hover:bg-gray-300 focus:shadow-outline focus:outline-none">
                                <i className='fa fa-arrow-left'></i>
                            </button>
                        </div>
                        <section className="h-full overflow-auto p-8 w-full flex flex-col">
                            {!Video && (
                                <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
                                    <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                                        <span>Drag and drop your</span>&nbsp;<span>files anywhere or</span>
                                    </p>
                                    <input
                                        ref={fileInputRef}
                                        id="hidden-input"
                                        type="file"
                                        className="hidden"
                                        onChange={handleFileInputChange}
                                        accept="video/*"
                                    />
                                    <button
                                        id="button"
                                        className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
                                        onClick={handleButtonClick}
                                    >
                                        Upload a file
                                    </button>
                                </header>
                            )}

                            <h1 className="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
                                To Upload
                            </h1>

                            <ul id="gallery" className="flex flex-1 flex-wrap -m-1">
                                {!Video ? (
                                    <>
                                        <li id="empty" className="h-full w-full text-center flex flex-col items-center justify-center">
                                            <img className="mx-auto w-32" src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png" alt="no data" />
                                            <span className="text-small text-gray-500">No files selected</span>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <video src={URL.createObjectURL(Video)} className='rounded-lg w-full' controls></video>
                                    </>
                                )}
                            </ul>
                        </section>

                        <footer className="flex justify-end px-8 pb-8 pt-4">
                            <button id="submit" onClick={() => handleThumbnails()} disabled={!Video ? true : false} className={`rounded-sm cursor-pointer px-3 py-1 ${Video ? 'bg-blue-700 hover:bg-blue-500' : 'bg-gray-400'} text-white focus:shadow-outline focus:outline-none`}>
                                Continue
                            </button>
                            <button id="cancel" onClick={() => setVideo(null)} className="ml-3 rounded-sm px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
                                Clear
                            </button>
                        </footer>
                    </article>
                </main>
            </div>

        </div>
    );
};

export default SelectVideo;
