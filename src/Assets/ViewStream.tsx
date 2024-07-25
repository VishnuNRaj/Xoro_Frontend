import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const VideoPlayer: React.FC = () => {
  const videoRef = useRef<any>(null);
  const src = "http://localhost:6067/videos/66a0dec37a46b784a7632b03/index.m3u8";

  useEffect(() => {
    const player = videojs(videoRef.current, {
      controls: true,
      autoplay: true, 
      fluid: true,
      liveui: true,
      sources: [{
        src: src,
        type: 'application/x-mpegURL',
      }],
    });

    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [src]);

  return (
    <div>
      <video ref={videoRef} className="video-js vjs-default-skin" />
    </div>
  );
};

export default VideoPlayer;
