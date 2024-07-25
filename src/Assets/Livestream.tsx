import React, { useEffect, useRef, useState } from 'react';
import VideoPlayer from './ViewStream';
import { useSocket } from '../Socket';

const VideoCapture:React.FC = () => {
  const videoRef = useRef<any>(null);
  const socketRef = useRef<any>(null);
  const mediaRecorderRef = useRef<any>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [show, setShow] = useState(false);
  const socket = useSocket()
  useEffect(() => {
    socketRef.current = socket;
    return () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const startStreaming = () => {
    navigator.mediaDevices.getDisplayMedia({ audio: true, video: true }).then((stream) => {
      videoRef.current.srcObject = stream;

      socketRef.current.emit('start-stream');

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm; codecs=vp9'
      });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          socketRef.current.emit('stream', event.data);
        }
      };

      mediaRecorder.onstop = () => {
        socketRef.current.emit('stop-stream');
      };

      mediaRecorder.start(100); // Send data in chunks every 100ms
      mediaRecorderRef.current = mediaRecorder;
      setIsStreaming(true);
    });
  };

  const stopStreaming = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsStreaming(false);
  };

  const toggleStreaming = () => {
    if (isStreaming) {
      stopStreaming();
    } else {
      startStreaming();
    }
  };

  return (
    <>
      <video ref={videoRef} autoPlay muted></video>
      <button className='p-2 px-3 text-white bg-blue-700' onClick={toggleStreaming}>
        {isStreaming ? 'Stop Streaming' : 'Start Streaming'}
      </button>
      <button className='p-2 px-3 text-white bg-blue-700' onClick={() => setShow(!show)}>Show</button>
      {show && <VideoPlayer />}
    </>
  );
};

export default VideoCapture;
