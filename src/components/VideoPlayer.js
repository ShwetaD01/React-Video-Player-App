import React, { useRef, useState, useEffect } from "react";

const VideoPlayer = ({ playing }) => {
  // console.log(playing, "play");

  let videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [autoplay, setAutoplay] = useState(true);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  const handleTime = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleSeek = (e) => {
    const newTime = e.target.value;
    setCurrentTime(newTime);
    videoRef.current.currentTime = newTime;
  };
  // console.log(videoRef)

  const handleAutoplayToggle = () => {
    setAutoplay(!autoplay);
  };

  const handleSpeedChange = (e) => {
    setPlaybackSpeed(parseFloat(e.target.value));
  };
  useEffect(() => {
    // Load the new video when the video prop changes
    if (videoRef.current) {
      videoRef.current.src = playing;
      videoRef.current.load();
      if (autoplay) {
        videoRef.current.play();
      }
    }

    return () => {
      // Cleanup when the component is unmounted
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = "";
      }
    };
  }, [playing, autoplay]);

  return (
    <div className="flex-col justify-center w-screen h-screen bg-black">
      <video
      //  controls
        width="1400"
        height="4000"
        key={playing}
        ref={videoRef}
        onTimeUpdate={handleTime}
        // autoPlay={autoplay}
      >
        <source src={playing} type="video/mp4"></source>
      </video>

      {/* <input
          type="range"
          value={currentTime}
          max={videoRef.duration}
          onChange={handleSeek}
          className="w-[70rem]"
        />  */}
      <input
        type="range"
        value={currentTime}
        max={videoRef.current ? videoRef.current.duration : 0}
        onChange={handleSeek}
        className="w-[70rem]"
      />

      <span className="text-cyan-50">{`${currentTime}: ${videoRef?.current?.duration} `}</span>
      <div className="flex items-center justify-center">
        <button
          onClick={handlePlayPause}
          className="bg-orange-500 text-cyan-50 p-2 rounded-lg  m-6"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>

         <label className="text-cyan-50">
          Autoplay
          <input
            type="checkbox"
            onChange={handleAutoplayToggle}
            checked={autoplay}
            className="bg-orange-500 text-cyan-50 p-2 rounded-lg mx-2"
          />
        </label> 

         <label className="text-cyan-50">
          Speed
          <select
            onChange={handleSpeedChange}
            value={playbackSpeed}
            className="bg-orange-500 text-cyan-50 px-2 py-2 rounded-lg  m-6"
          >
            <option value="0.5">0.5x</option>
            <option value="1">1x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
        </label> 
      </div>
    </div>
  );
};

export default VideoPlayer;
