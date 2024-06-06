import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const VideoPlayer:React.FC<{src:string}> = ({ src }) => {
  const videoRef = useRef<any>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (videoRef.current) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: true,
        preload: 'auto',
        sources: [{
          src,
          type: 'application/x-mpegURL'
        }]
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current?.dispose();
      }
    };
  }, [src]);

  return (
    <div>
      <video ref={videoRef} className="video-js vjs-default-skin" width="720" height="420" />
    </div>
  );
};

const ViewStream = () => {
  const hlsUrl = 'http://localhost:6067/hls/stream.m3u8';

  return (
    <div>
      <h1>Live Stream</h1>
      <VideoPlayer src={hlsUrl} />
    </div>
  );
};

export default ViewStream;
