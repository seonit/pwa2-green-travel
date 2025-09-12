import { configureStore } from "@reduxjs/toolkit";
import festivalReducer from './slices/festivalSlive.js';

export default configureStore({
  reducer: {
    festival: festivalReducer,
  }
})