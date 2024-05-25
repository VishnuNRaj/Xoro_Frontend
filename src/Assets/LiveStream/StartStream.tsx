import React,{ useEffect, useRef, useState } from 'react';
import { arrayBuffer } from 'stream/consumers';
import { useSocket } from '../../Socket';
// import NavBar from './NavBar';

const StartStream:React.FC = () => {
    const cameraVideoRef = useRef<HTMLVideoElement>(null);
    const screenVideoRef = useRef<HTMLVideoElement>(null);
    const socket = useSocket()
    const socketRef = useRef<WebSocket | null>(null);
    const [start,setStart] = useState<boolean>(false)

    const [cameraScreen, setCameraScreen] = useState(false)


    const initializeWebSocket = () => {
        if (!socketRef.current) {
            console.log("socket connected")
            socketRef.current = new WebSocket("ws://localhost:6700");
        } else {
            console.log("no socket connection");
        }
    };

    const closeWebSocket = () => {
        console.log("close request");
        if (socketRef.current) {
            socketRef.current.close();
            socketRef.current = null;
        }
    };

    useEffect(() => {
        // initializeWebSocket()

        return () => closeWebSocket()
    }, [])

    // const dataToSend = JSON.stringify({
    //     section: "type"
    // })
    // socketRef.current && socketRef.current.send(dataToSend);

    const Record = async (stream: MediaStream, type: string) => {
        const mediaRecorder = new MediaRecorder(stream);
        // console.log("recording started...", stream, mediaRecorder)
        // const chunks: any = [];

        mediaRecorder.ondataavailable = async (event) => {
            // if (socketRef.current && type === 'screen') {
            //     socketRef.current.send(event.data);
            // }
            if(socket && type) socket.emit(type,event.data)
        };


        mediaRecorder.onstop = () => {
            // const recordedBlob = new Blob(chunks, { type: 'video/webm' });
            // console.log(recordedBlob);
        };

        mediaRecorder.start(1000);
    };








    useEffect(() => {

        const startCamera = async () => {
            try {

                const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true,audio:false });
                if (screenVideoRef.current) {
                    screenVideoRef.current.srcObject = screenStream;
                    Record(screenStream, "screen")
                }

                const cameraStream = await navigator.mediaDevices.getUserMedia({ video: true,audio:false });
                if (cameraVideoRef.current) {
                    cameraVideoRef.current.srcObject = cameraStream;
                    Record(cameraStream, "camera")
                }

            } catch (error) {
                console.error("Error capturing media: ", error);
            }

        };



        if (cameraScreen) {
            startCamera();
            socket?.emit('start','alannixon')
            setCameraScreen(false)
        }


    }, [cameraScreen]);


    const stopCamera = () => {
        closeWebSocket()
    }

    useEffect(() => {
        if (socketRef && socketRef.current) {
            socketRef.current.onmessage = (event: MessageEvent) => {

            };
        }
    }, [socketRef])



    return (
        <>
            {/* <NavBar /> */}
            <div style={{ marginTop: "5%", display: "flex", marginLeft: "auto" }} className='text-white'>
                <div style={{ display: "flex", marginTop: "13%", marginLeft: "20.5%", marginBottom: "14%", width: "auto", height: "auto", position: "relative", transform: "scale(2.2)", border: "1px solid white" }} className="">
                    <video ref={screenVideoRef} className='w-[300px]' autoPlay ></video>
                    <div style={{ width: "85px", height: "65px", position: "absolute", bottom: 0, right: 0 }}>
                        <video ref={cameraVideoRef} style={{ width: "100%", height: "100%", transform: 'scaleX(-1)' }} autoPlay playsInline />
                    </div>
                </div>
            </div>
            <div className='text-white' style={{ position: "absolute" }}>
                <button onClick={() => setCameraScreen(true)}>start Live</button><br />
                <button onClick={stopCamera} className='cursor-pointer'>stop live</button>
            </div>
            <br />

        </>
    );
}

export default StartStream;