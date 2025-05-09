import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import OrderSlice from "./OrderSlice";
import CategorySlice from "./CategorySlice";
import ProductSlice from "./ProductSlice";

import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistStore, persistReducer } from 'redux-persist';

// combine all slices here
const rootReducer = combineReducers({
  Auth: AuthSlice,
  Order: OrderSlice,
  Category: CategorySlice,
  Product: ProductSlice,
});

// persist config
const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['Auth'], // only persist Auth slice (optional)
};

// create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// export store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

// export persistor
export const persistor = persistStore(store);
