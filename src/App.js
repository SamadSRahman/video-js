import React, { useRef, useEffect, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const App = () => {
  const [isComponentMounted, setIsComponentMounted] = useState(false);
  const videoRef = useRef(null);
  let player;

  useEffect(() => {
    setIsComponentMounted(true); // Set component mounted flag to true when the component mounts
    return () => {
      setIsComponentMounted(false); // Set component mounted flag to false when the component unmounts
    };
  }, []);

  useEffect(() => {
    // Check if the component is mounted before initializing the Video.js player
    if (isComponentMounted && videoRef.current) {
      player = videojs(videoRef.current, {
        width: 430,
        height: 180,
        autoplay: true,
        controls: true,
         responsive:true,
        sources: [
          {
            src: '//vjs.zencdn.net/v/oceans.mp4', 
            type: 'video/mp4',
          },
        ],
      });
      // Dispose the player on component unmount
      return () => {
        if (player) {
          player.dispose();
        }
      };
    }
  }, [isComponentMounted]); // Re-run this effect whenever isComponentMounted changes

  return (
    <div className="App">
      <div data-vjs-player>
        <video ref={videoRef} className="video-js vjs-big-play-centered" data-setup='{}'  />
      </div>
    </div>
  );
};

export default App;
