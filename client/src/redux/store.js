import { configureStore } from "@reduxjs/toolkit";
import { getProductDetailsReducer, getProductsReducer } from "./reducers/productReducer"; // Named import
import { cartReducer } from "./reducers/cartReducer"; // Assuming you have a cartReducer defined somewhere
import { thunk } from "redux-thunk"; // Correct import
// import { authReducer } from "./reducers/authReducer";

const store = configureStore({
  reducer: {
    getProducts: getProductsReducer, 
    getProductDetails: getProductDetailsReducer, 
    cart: cartReducer, // Assuming you have a cartReducer defined somewhere
    // auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Adding thunk
});

export default store;
