import React, { useRef, useState } from 'react';
import io from 'socket.io-client';

const ScreenCapture: React.FC = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const socket = useRef<any>(null);

  const startCapture = async () => {
    try {
      const captureStream = await navigator.mediaDevices.getDisplayMedia({ video: true,audio:true });
      setStream(captureStream);

      socket.current = io('http://localhost:5000');

      // Send the stream to the backend
      socket.current.emit('stream', captureStream);

      // Handle screen capture errors
      captureStream.getTracks()[0].onended = () => {
        console.log('Screen sharing ended');
        stopCapture();
      };
    } catch (error) {
      console.error('Error capturing screen:', error);
    }
  };

  const stopCapture = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);

      // Close WebSocket connection
      if (socket.current) {
        socket.current.disconnect();
        socket.current = null;
      }
    }
  };

  return (
    <div className='bg-[#333] text-white'>
      {!stream ? (
        <button onClick={startCapture}>Start Screen Capture</button>
      ) : (
        <div>
          <video src={''} controls autoPlay className='w-52 h-52'></video>
          <button onClick={stopCapture}>Stop Screen Capture</button>
        </div>
      )}
    </div>
  );
};

export default ScreenCapture;
