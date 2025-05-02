import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { persistStore, persistReducer } from 'redux-persist'


const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['Auth']
}

const persistedReducers = persistReducer(persistConfig, AuthSlice)

export const store = configureStore({
  reducer: {
    Auth: persistedReducers,
  },
});

export const persistor = persistStore(store)