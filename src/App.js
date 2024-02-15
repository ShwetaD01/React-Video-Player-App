import "./App.css";
import Playlist from "./components/Playlist";
import VideoPlayer from "./components/VideoPlayer";
import { mediaJSON } from "../src/data.js/media";
import { useState } from "react";
function App() {
  const [oderedData, setOrderedData] = useState(
    mediaJSON.categories[0].videos
  );



  const [currentVideo, setCurrentVideo] = useState(oderedData[0].sources[0]);

// console.log(currentVideo, "currrr")
  return (
    <div className="flex">
      
        <VideoPlayer playing={currentVideo}></VideoPlayer>

      <Playlist
        videos={oderedData}
        onVideoClick={(current) => setCurrentVideo(current)}
        onOrderVideos={(newOrder) => setOrderedData(newOrder)}
      ></Playlist>
    </div>
  );
}

export default App;
