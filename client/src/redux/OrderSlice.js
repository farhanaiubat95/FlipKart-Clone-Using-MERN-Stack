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

    UpdateOrderStatus: (state, action) => {
  const { orderId, newStatus } = action.payload;
  const order = state.orders.find(order => order._id === orderId);
  if (order) {
    order.orderStatus = newStatus;
  }
}

  },
});

export const { SetOrders, AddOrder, ClearOrders , UpdateOrderStatus } = OrderSlice.actions;
export default OrderSlice.reducer;
