import VideoCard from "./VideoCard";
import { useSelector } from "react-redux";

const VideoContainer = () => {
  const { categories } = useSelector((state) => state.cardsReducer);
  const categoryNames = Object.keys(categories);

  const handleActiveCategory = () => {};

  return (
    <>
      <ul>
        {categoryNames.map((data, i) => {
          return (
            <li key={i} onClick={handleActiveCategory}>
              {data}
            </li>
          );
        })}
      </ul>
      <div className="video-container">
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
      </div>
    </>
  );
};

export default VideoContainer;
