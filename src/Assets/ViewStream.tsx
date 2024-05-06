import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const StreamViewer: React.FC<{ match: any }> = ({ match }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const socket = useRef<any>(null);

  useEffect(() => {
    const socketId = match.params.socketId;

    // Connect to the server with the provided socket ID
    socket.current = io('http://localhost:5000', {
      query: { socketId },
    });

    // Receive the stream from the server
    socket.current.on('stream', (stream: MediaStream) => {
      setStream(stream);
    });

    return () => {
      // Disconnect from the server when the component unmounts
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [match.params.socketId]);

  return (
    <div className='bg-[#333] text-white'>
      {stream && (
        <video
          ref={videoRef}
          src={stream}
          autoPlay
          controls
          className='w-52 h-52'
        ></video>
      )}
      {!stream && <p>Loading...</p>}
    </div>
  );
};

export default StreamViewer;