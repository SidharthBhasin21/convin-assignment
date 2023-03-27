import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
const initialState = {
  categories: {
    education: {
      id: uuid(),
      name: "education",
      data: [
        {
          id: 1,
          name: "1 some video",
          link: "https: //shubambhasin.com",
        },
        {
          id: 2,
          name: "2 some video",
          link: "https: //shubambhasin.com",
        },
        {
          id: 3,
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
          id: 1,
          name: "1 motivation Video",
          link: "https: //shubambhasin.com",
        },
        {
          id: 2,
          name: "2  video",
          link: "https: //shubambhasin.com",
        },
        {
          id: 3,
          name: "3 some video",
          link: "https://shubambhasin.com",
        },
      ],
    },
  },
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
            id: 1,
            name: action.payload,
            data: [],
          },
        },
      };
    },
  },
});

export const { setNewCategory } = cardSlice.actions;
export default cardSlice.reducer;
