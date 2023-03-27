import { useState, useEffect, useRef } from "react";
import VideoCard from "./VideoCard";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import {
  moveCardToCategory,
  removeCardFromCategory,
  setNewCategory,
} from "../features/reducers/cardSlice";
const VideoContainer = () => {
  const ref = useRef();
  const dispatch = useDispatch();
  const [tempCategoryName, setTempCategoryName] = useState("");
  const [activeCardData, setActiveCardData] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [items, setItems] = useState([]);
  const c = useSelector((state) => state.cardsReducer);
  const { categories } = c;
  const categoryNames = Object.keys(categories);

  const moveCard = (moveTo, a, _cat) => {
    console.log(a, _cat);
    console.log(ref);
    console.log(activeCategory);
    // return;
    // return;
    dispatch(
      removeCardFromCategory({
        name: _cat?.name,
        cardId: ref.current?.id,
      })
    );
    dispatch(
      moveCardToCategory({
        name: moveTo,
        data: ref.current,
      })
    );
  };

  const handleActiveCategory = (data) => {
    setActiveCategory(categories[data]);
  };

  const handleChange = (e) => {
    setTempCategoryName(e.target.value);
  };

  const addCategory = (e) => {
    e.preventDefault();
    dispatch(setNewCategory(tempCategoryName));
    setTempCategoryName("");
  };

  useEffect(() => {
    setActiveCategory(categories[activeCategory?.name]);
  }, [categories]);

  useEffect(() => {
    if (activeCategory) {
      let _items = categoryNames.filter((_data) => _data);
      let localArr = _items.map((_data) => {
        return {
          key: uuid(),
          label: (
            <button
              onClick={() => moveCard(_data, activeCardData, activeCategory)}
            >
              {_data}
            </button>
          ),
        };
      });
      setItems(localArr);
    }
  }, [activeCategory]);

  return (
    <div>
      <ul>
        {categoryNames?.map((data, i) => {
          return (
            <li key={i} onClick={() => handleActiveCategory(data)}>
              {data}
            </li>
          );
        })}
      </ul>
      <div>
        <form onSubmit={addCategory}>
          <input onChange={handleChange} value={tempCategoryName} />
        </form>
        <button>History</button>
      </div>
      <div className="video-container">
        {activeCategory
          ? activeCategory.data.map((_data) => {
              return (
                <VideoCard
                  data={_data}
                  name={_data.name}
                  key={_data.id}
                  category={activeCategory}
                  items={items}
                  setActiveCardData={ref}
                />
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default VideoContainer;
