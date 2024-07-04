import React, { useEffect, useRef } from 'react';

const StreamComponent: React.FC = () => {
    const screenVideoRef = useRef<HTMLVideoElement>(null);

    const startStreaming = async () => {
        try {
            const ws = new WebSocket('ws://localhost:8080/');
            ws.binaryType = 'arraybuffer';

            ws.onopen = () => {
                console.log('WebSocket connection opened');
            };

            ws.onerror = (error) => {
                console.error('WebSocket error:', error);
            };

            ws.onclose = () => {
                console.log('WebSocket connection closed');
            };

            // Get screen stream
            const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
            if (screenVideoRef.current) {
                screenVideoRef.current.srcObject = screenStream;
            }

            // Combine screen stream
            const combinedStream = new MediaStream([...screenStream.getTracks()]);

            const mediaRecorder = new MediaRecorder(combinedStream, { mimeType: 'video/webm; codecs=vp8' });

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0 && ws.readyState === WebSocket.OPEN) {
                    const reader = new FileReader();
                    reader.onload = () => {
                        const arrayBuffer:any = reader.result;
                        console.log('Sending data:', new Uint8Array(arrayBuffer));
                        ws.send(arrayBuffer);
                    };
                    reader.readAsArrayBuffer(event.data);
                }
            };

            mediaRecorder.onerror = (error) => {
                console.error('MediaRecorder error:', error);
            };

            mediaRecorder.onstop = () => {
                console.log('MediaRecorder stopped');
            };

            mediaRecorder.start(1000); // Send data every second

        } catch (error) {
            console.error('Error capturing media:', error);
        }
    };

    useEffect(() => {
        startStreaming();
    }, []);

    return (
        <div>
            <video ref={screenVideoRef} autoPlay muted controls></video>
        </div>
    );
};

export default StreamComponent;
