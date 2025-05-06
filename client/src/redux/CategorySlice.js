import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: null,
  categories: [],
  error: null,
};

const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    SetCategories: (state, action) => {
      state.categories = action.payload;
      state.loading = false;
    },
    AddCategory: (state, action) => {
      state.categories.push(action.payload);
    },
  },
});

export const { SetCategories, AddCategory } = CategorySlice.actions;
export default CategorySlice.reducer;
