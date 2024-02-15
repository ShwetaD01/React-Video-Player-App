import React, { useRef, useState, useEffect } from "react";

const VideoPlayer = ({ playing }) => {


  let videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [autoplay, setAutoplay] = useState(true);
  const [volume, setVolume] = useState(1);
 
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
 

  const handleAutoplayToggle = () => {
    setAutoplay(!autoplay);
  };

  const handleSpeedChange = (e) => {
    setPlaybackSpeed(parseFloat(e.target.value));
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(parseFloat(newVolume));
    videoRef.current.volume = newVolume;
  };
  
  useEffect(() => {

    if (videoRef.current) {
      videoRef.current.src = playing;
      videoRef.current.load();
      if (autoplay) {
        videoRef.current.play();
      }
    }

    // return () => {
   
    //   if (videoRef.current) {
    //     videoRef.current.pause();
    //   }
    // };
  }, [playing, autoplay]);
  // const handlePlay = () => {
  //   videoRef.current.play();
  // };
  
  return (
    <div className="flex-col justify-center w-screen h-screen bg-black">
      <video
      //  controls
        width="1400"
        height="4000"
        key={playing}
        ref={videoRef}
        onTimeUpdate={handleTime}
        autoPlay={autoplay}
        // muted 
      >
        <source src={playing} type="video/mp4"></source>
      </video>

  
      <input
        type="range"
        value={currentTime}
        max={videoRef.current ? videoRef.current.duration : 0}
        onChange={handleSeek}
        className="md:w-[70rem] w-[65vw] m-2"
      />

      <span className="text-cyan-50">{`${currentTime}: ${videoRef?.current?.duration} `}</span>
      <div className="flex items-center justify-center">
        <button
          onClick={handlePlayPause}
          className="bg-orange-500 text-cyan-50 p-2 rounded-lg  md:m-6 m-2"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>

         <label className="text-cyan-50">
          Autoplay
          <input
            type="checkbox"
            onChange={handleAutoplayToggle}
            checked={autoplay}
            className="bg-orange-500 text-cyan-50 p-2 rounded-lg md:mx-2 mx-1"
          />
        </label> 

         <label className="text-cyan-50">
          Speed
          <select
            onChange={handleSpeedChange}
            value={playbackSpeed}
            className="bg-orange-500 text-cyan-50 p-2 rounded-lg  md:m-6 m-2"
          >
            <option value="0.5">0.5x</option>
            <option value="1">1x</option>
            <option value="1.5">1.5x</option>
          </select>
        </label> 

        <label className="bg-orange-500 text-cyan-50 p-1 rounded-lg">
          Volume
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => handleVolumeChange(e.target.value)}
            className="bg-orange-500 text-cyan-50  rounded-lg  md:m-2"
          />
        </label>

      </div>
    </div>
  );
};

export default VideoPlayer;
