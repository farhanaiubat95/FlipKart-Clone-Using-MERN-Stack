import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

// Async thunk: Add to cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (cartItem, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/customer/cart/addtocart',
        { cartItems: cartItem },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        return response.data.newCart || response.data.updatedCart;
      } else {
        toast.error(response.data.message);
        return rejectWithValue(response.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Async thunk: Fetch cart
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'http://localhost:5000/customer/cart/getcart',
        { withCredentials: true }
      );

      if (response.data.success) {
        return response.data.cart;
      } else {
        toast.error(response.data.message);
        return rejectWithValue(response.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Slice
const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: null,
    loading: false,
    error: null,
  },
  reducers: {
    // Clear cart
    clearCart: (state) => {
      state.cart = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCart } = CartSlice.actions;
export default CartSlice.reducer;
