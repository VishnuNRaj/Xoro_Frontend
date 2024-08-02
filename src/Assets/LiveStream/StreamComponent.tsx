import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';
import ViewStream from './ViewStream';
import config from '../../Configs/config';
const StreamScreen: React.FC = () => {
  const { streamKey } = useParams<{ streamKey: string }>();
  const socketRef = useRef<Socket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    console.log(config.SOCKET)
    socketRef.current = io(config.SOCKET);
    console.log(socketRef.current?.id)
    navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
      .then((stream) => {
        streamRef.current = stream;

        mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9' });
        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            const reader = new FileReader();
            reader.onload = () => {
              const arrayBuffer = reader.result as ArrayBuffer;
              console.log(arrayBuffer)
              socketRef.current?.emit('stream-data', { streamKey, data: arrayBuffer });
            };
            reader.readAsArrayBuffer(event.data);
          }
        };
        mediaRecorderRef.current.start(1000);

        socketRef.current?.emit('start-stream', { streamKey });
      });

    return () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      socketRef.current?.emit('end-stream', { streamKey });
      socketRef.current?.disconnect();
    };
  }, [streamKey]);

  return (
    <div>
      <h1>Streaming Screen</h1>
      <ViewStream />
    </div>
  );
};

export default StreamScreen;
