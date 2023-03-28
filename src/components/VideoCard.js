import React, { useState } from "react";
import { Button, Dropdown, Modal } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import YouTube from "react-youtube";
import {
  addToHistory,
  removeCardFromCategory,
  renameCard,
} from "../features/reducers/cardSlice";
import Input from "antd/es/input";
const VideoCard = ({ data, name, category, items, setActiveCardData }) => {
  //   console.log(data);

  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState({
    viewer: false,
    editor: false,
  });
  const [inputData, setInputData] = useState({
    name: data.name,
    link: data.link,
  });

  const onPlayerReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleMove = () => {
    setActiveCardData.current = data;
    console.log("hereeee");
  };

  const showModal = (type) => {
    if (type === "editor") {
      setIsModalOpen({
        ...isModalOpen,
        editor: true,
      });
    } else {
      setIsModalOpen({
        ...isModalOpen,
        viewer: true,
      });

      dispatch(
        addToHistory({
          date: new Date(),
          name: data.name,
          link: data.link,
        })
      );
    }
  };

  const handleOk = () => {
    setIsModalOpen({
      editor: false,
      viewer: false,
    });
    dispatch(
      renameCard({
        name: category.name,
        link: inputData.link,
        cardId: data.id,
        cardName: inputData.name,
      })
    );
    setInputData({
      name: data.name,
      link: data.link,
    });
  };

  const handleCancel = () => {
    setIsModalOpen({
      viewer: false,
      editor: false,
    });
    setInputData({
      name: data.name,
      link: data.link,
    });
  };

  const handleCardInfoChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  console.log(inputData);
  return (
    <>
      <div className="video-card">
        <span>{name}</span> <span>{category.name}</span>
        <Button onClick={() => showModal("viewer")}>View</Button>
        <Button onClick={() => showModal("editor")}>Edit</Button>
        <Dropdown
          menu={{ items }}
          trigger="click"
          placement="bottomLeft"
          arrow={{ pointAtCenter: true }}
        >
          <Button onClick={() => handleMove()}>Move</Button>
        </Dropdown>
        <Button
          onClick={() => {
            console.log(name, data);

            //   return;
            dispatch(
              removeCardFromCategory({
                name: category.name,
                cardId: data.id,
              })
            );
          }}
        >
          Delete
        </Button>
      </div>
      <Modal
        title="Basic Modal"
        open={isModalOpen.editor}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          value={inputData.name}
          placeholder="video name"
          name="name"
          onChange={handleCardInfoChange}
        />
        <Input
          value={inputData.link}
          placeholder="video link"
          name="link"
          onChange={handleCardInfoChange}
        />
      </Modal>
      <Modal
        width={700}
        title="Video Viewer"
        open={isModalOpen.viewer}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <YouTube videoId="2g811Eo7K8U" opts={opts} onReady={onPlayerReady} />
      </Modal>
    </>
  );
};

export default VideoCard;
