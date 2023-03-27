import React from "react";

const VideoCard = () => {
  return (
    <div className="video-card">
      <iframe src="https://www.youtube.com/watch?v=wU1cQcQFimw" />
      <span>Name</span> <span>category</span>
    </div>
  );
};

export default VideoCard;
