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
          name: "1 some video",
          link: "https: //shubambhasin.com",
        },
        {
          id: uuid(),
          name: "2 some video",
          link: "https: //shubambhasin.com",
        },
        {
          id: uuid(),
          name: "3 some video",
          link: "https://shubambhasin.com",
        },
      ],
    },
    motivation: {
      id: uuid(),
      name: "motivation",
      data: [
        {
          id: uuid(),
          name: "1 motivation Video",
          link: "https: //shubambhasin.com",
        },
        {
          id: uuid(),
          name: "2  video",
          link: "https: //shubambhasin.com",
        },
        {
          id: uuid(),
          name: "3 some video",
          link: "https://shubambhasin.com",
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
