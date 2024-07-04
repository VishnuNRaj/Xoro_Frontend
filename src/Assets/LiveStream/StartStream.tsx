import React from 'react';
import StreamComponent from './StreamComponent';

// import { useSocket } from '../../Socket';
const StartStream: React.FC = () => {
    // const cameraVideoRef = useRef<HTMLVideoElement>(null);
    // const screenVideoRef = useRef<HTMLVideoElement>(null);
    // const socket = useSocket()
    // const [streaming, setStreaming] = useState(false);

    // useEffect(() => {
        
    // }, []);

    // const startStreaming = async () => {
    //     try {
    //         const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
    //         if (screenVideoRef.current) {
    //             screenVideoRef.current.srcObject = screenStream;
    //         }

    //         const cameraStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    //         if (cameraVideoRef.current) {
    //             cameraVideoRef.current.srcObject = cameraStream;
    //         }

    //         const combinedStream = new MediaStream([
    //             ...screenStream.getTracks(),
    //             ...cameraStream.getTracks()
    //         ]);

    //         const mediaRecorder = new MediaRecorder(combinedStream, { mimeType: 'video/webm; codecs=vp8' });

    //         mediaRecorder.ondataavailable = (event) => {
    //             if (event.data.size > 0 && socket) {
    //                 socket.emit('stream', event.data);
    //             }
    //         };

    //         mediaRecorder.start(1000);

    //         setStreaming(true);
    //     } catch (error) {
    //         console.error('Error capturing media: ', error);
    //     }
    // };

    // const stopStreaming = () => {
    //     setStreaming(false);
    //     if (socket) {
    //         socket.emit('stop');
    //     }
    // };

    // return (
    //     <>
    //         <div>
    //             <video ref={screenVideoRef} autoPlay style={{ width: '600px', height: '400px' }}></video>
    //             <video ref={cameraVideoRef} autoPlay style={{ width: '150px', height: '100px', position: 'absolute', bottom: '10px', right: '10px' }}></video>
    //         </div>
    //         <div className='bg-white'>
    //             <button onClick={startStreaming} disabled={streaming}>Start Streaming</button>
    //             <button onClick={stopStreaming} disabled={!streaming}>Stop Streaming</button>
    //         </div>
    //     </>
    // );
    return <StreamComponent/>
};

export default StartStream;
