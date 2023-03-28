import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
const initialState = {
  categories: {
    education: {
      id: uuid(),
      name: "education",
      data: [
        {
          id: uuid(),
          name: "Learn React 3D animations",
          link: "https://www.youtube.com/watch?v=IyBhFma4H1A&t=3186s",
        },
        {
          id: uuid(),
          name: "Learn Vite – Frontend Build Tool Course",
          link: "https://www.youtube.com/watch?v=VAeRhmpcWEQ",
        },
        {
          id: uuid(),
          name: "Learn React 18 with Redux Toolkit – Full Tutorial for Beginners",
          link: "https://www.youtube.com/watch?v=2-crBg6wpp0&t=14654s",
        },
        {
          id: uuid(),
          name: "Harvard CS50’s Web Programming with Python and JavaScript",
          link: "https://www.youtube.com/watch?v=vzGllw18DkA&t=43s",
        },
        {
          id: uuid(),
          name: "Full HTTP Networking Course – Fetch and REST APIs in JavaScript",
          link: "https://www.youtube.com/watch?v=2JYT5f2isg4",
        },
      ],
    },
    motivation: {
      id: uuid(),
      name: "motivation",
      data: [
        {
          id: uuid(),
          name: "DON'T MAKE EXCUSES - Motivational Speech",
          link: "https://www.youtube.com/watch?v=PGRlbzi2o9Y",
        },
        {
          id: uuid(),
          name: "STOP DOUBTING YOURSELF - Best Motivational Video",
          link: "https://www.youtube.com/watch?v=Gs3BDvHDUfM",
        },
        {
          id: uuid(),
          name: "How To Stay Motivated - The Locus Rule",
          link: "https://www.youtube.com/watch?v=8ZhoeSaPF-k",
        },
        {
          id: uuid(),
          name: "LION MENTALITY - Motivational Video",
          link: "https://www.youtube.com/watch?v=ERClHCOF14c",
        },
        {
          id: uuid(),
          name: "I WON'T QUIT - Motivational Speech",
          link: "https://www.youtube.com/watch?v=K714ZvMw60g",
        },
      ],
    },
  },
  history: [],
};

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setNewCategory: (state, action) => {
      return {
        ...state,
        categories: {
          ...state.categories,
          [action.payload]: {
            id: uuid(),
            name: action.payload,
            data: [],
          },
        },
      };
    },
    moveCardToCategory: (state, action) => {
      console.log(action);
      console.log(state.categories[action.payload.name]);
      // return;
      return {
        ...state,
        categories: {
          ...state.categories,
          [action.payload.name]: {
            ...state.categories[action.payload.name],
            data: [
              ...state.categories[action.payload.name].data,
              {
                id: uuid(),
                name: action.payload.data?.name,
                link: action.payload.data?.link,
              },
            ],
          },
        },
      };
    },
    removeCardFromCategory: (state, action) => {
      console.log(action);

      // return;
      return {
        ...state,
        categories: {
          ...state.categories,
          [action.payload.name]: {
            ...state.categories[action.payload.name],
            data: state.categories[action.payload.name]?.data.filter(
              (_data) => _data.id !== action.payload.cardId
            ),
          },
        },
      };
    },
    renameCard: (state, action) => {
      console.log(action);
      return {
        ...state,
        categories: {
          ...state.categories,
          [action.payload.name]: {
            ...state.categories[action.payload.name],
            data: state.categories[action.payload.name]?.data.map((_data) => {
              if (_data.id === action.payload.cardId) {
                return {
                  name: action.payload.cardName,
                  link: action.payload.link,
                };
              } else {
                return {
                  ..._data,
                };
              }
            }),
          },
        },
      };
    },
    addToHistory: (state, action) => {
      console.log(action);
      return {
        ...state,
        history: [
          ...state.history,
          {
            ...action.payload,
          },
        ],
      };
    },
  },
});

export const moveCard = (data, categoryName) => {
  moveCardToCategory({
    name: categoryName,
    data: data,
  });
};
export const removeCard = (categoryName, cardId) => {
  removeCardFromCategory({
    name: categoryName,
    cardId: cardId,
  });
};

export const {
  setNewCategory,
  moveCardToCategory,
  removeCardFromCategory,
  renameCard,
  addToHistory,
} = cardSlice.actions;
export default cardSlice.reducer;
