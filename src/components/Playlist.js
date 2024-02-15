import React, { useState } from 'react';

const Playlist = ({ videos, onVideoClick, onOrderVideos }) => {
  const [draggedItem, setDraggedItem] = useState(null);

  const handleReorderStart = (index) => {
    setDraggedItem(index);
  };

  const handleReorderOver = (index) => {
    if (draggedItem === null || draggedItem === index) {
      return;
    }

    const newVideos = [...videos];
    const draggedVideo = newVideos[draggedItem];

    newVideos.splice(draggedItem, 1);
    newVideos.splice(index, 0, draggedVideo);

    setDraggedItem(null);
    onOrderVideos(newVideos);
  };

  return (
    <div className="flex-col flex-wrap overflow-y-scroll h-screen">

    {/* <h2 className='m-2'>Videos</h2> */}
      {videos.map((ele, i) => (
      
        <div
          key={i}
          draggable
          onDragStart={() => handleReorderStart(i)}
          onDragOver={() => handleReorderOver(i)}
          onClick={() => onVideoClick(ele.sources[0])}
        >


          <div className="p-2 m-2 w-[25 rem] shadow-lg flex-col h-[18rem] justify-center items-center bg-black ">
            <div className="text-lg text-cyan-50">{ele?.title}</div>
            <img
              src={`http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/${ele?.thumb}`}
              alt={ele?.title}
            />
          
          </div>
        </div>
      ))}
    </div>
  );
};

export default Playlist;

