import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: null,
  orders: [],
  error: null,
};

const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    SetOrders: (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    },
    AddOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    ClearOrders: (state) => {
      state.orders = [];
    },
  },
});

export const { SetOrders, AddOrder, ClearOrders } = OrderSlice.actions;
export default OrderSlice.reducer;
