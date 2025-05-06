import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: null,
  products: [],
  error: null,
};

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    SetProducts: (state, action) => {
      state.products = action.payload;
      state.loading = false;
    },
    AddProduct: (state, action) => {
      state.products.push(action.payload);
    },
  },
});

export const { SetProducts, AddProduct } = ProductSlice.actions;
export default ProductSlice.reducer;
