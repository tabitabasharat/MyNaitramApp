'use client';

import { useRef, useState } from 'react';

export default function VideoPlayer() {
  const videoRef = useRef<any>(null);
  const overlayRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handlePlayButton = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
      overlayRef.current.style.display = 'none';
    }
    setIsPlaying(!isPlaying);
  };

  const handleMuteButton = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreenButton = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.webkitRequestFullscreen) { /* Safari */
      videoRef.current.webkitRequestFullscreen();
    } else if (videoRef.current.msRequestFullscreen) { /* IE11 */
      videoRef.current.msRequestFullscreen();
    }
  };

  return (
    <div className="relative w-full md:w-3/5 mx-auto">
      <video
        ref={videoRef}
        className="rounded-2xl w-full"
        controls
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        autoPlay
      >
        <source src="/About/ABOUT-VIDEO.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div
        ref={overlayRef}
        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-2xl cursor-pointer"
        onClick={handlePlayButton}
      >
        {/* <img src="/About/play.svg" alt="Play" className="w-16 h-16" /> */}
      </div>
      {/* <div className="flex justify-between mt-2">
        <button className="p-2 bg-gray-800 text-white rounded" onClick={handlePlayButton}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button className="p-2 bg-gray-800 text-white rounded" onClick={handleMuteButton}>
          {isMuted ? 'Unmute' : 'Mute'}
        </button>
        <button className="p-2 bg-gray-800 text-white rounded" onClick={handleFullscreenButton}>
          Fullscreen
        </button>
      </div> */}
    </div>
  );
};


