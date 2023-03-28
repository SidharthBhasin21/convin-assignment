import { useState, useEffect, useRef } from "react";
import VideoCard from "./VideoCard";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import { Button, Modal, Input } from "antd";
import { HistoryOutlined } from "@ant-design/icons";
import { v4 as uuid } from "uuid";
import {
  moveCardToCategory,
  removeCardFromCategory,
  setNewCategory,
} from "../features/reducers/cardSlice";
const VideoContainer = () => {
  const ref = useRef();
  const dispatch = useDispatch();
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [tempCategoryName, setTempCategoryName] = useState("");
  const [activeCardData, setActiveCardData] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [items, setItems] = useState([]);

  const { history } = useSelector((state) => state.cardsReducer);
  const c = useSelector((state) => state.cardsReducer);
  const { categories } = c;

  const categoryNames = Object.keys(categories);
  console.log(history);
  const moveCard = (moveTo, a, _cat) => {
    // console.log(a, _cat);
    // console.log(ref);
    // console.log(activeCategory);
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
            <span
              onClick={() => moveCard(_data, activeCardData, activeCategory)}
            >
              {_data}
            </span>
          ),
        };
      });
      setItems(localArr);
    }
  }, [activeCategory]);

  const showModal = () => {
    console.log(isHistoryModalOpen);
    setIsHistoryModalOpen(true);
    console.log(isHistoryModalOpen);
  };
  const handleOk = () => {
    setIsHistoryModalOpen(false);
  };

  return (
    <div>
      <Modal
        width={700}
        title="History"
        open={isHistoryModalOpen}
        onOk={handleOk}
      >
        {history.map((data, i) => {
          return (
            <div className="history-container">
              <span>{data.name}</span>
              <span>
                Time: {dayjs(data.date).format("{YYYY} MM-DDTHH:mm:ss A")}
              </span>
            </div>
          );
        })}
      </Modal>
      <ul className="categories-container">
        {categoryNames?.map((data, i) => {
          return (
            <li
              className="categories"
              key={i}
              onClick={() => handleActiveCategory(data)}
            >
              {data}
            </li>
          );
        })}
      </ul>
      <div>
        <form onSubmit={addCategory}>
          <Input
            className="category-input"
            placeholder="Add category"
            onChange={handleChange}
            value={tempCategoryName}
          />
        </form>
        <Button
          className="history-btn"
          type="primary"
          shape="circle"
          onClick={showModal}
        >
          <HistoryOutlined />
        </Button>
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
