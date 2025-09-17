import { configureStore } from "@reduxjs/toolkit";
import festivalReducer from './slices/festivalSlice.js';
import FestivalShowReducer from './slices/festivalShowSlice.js';

export default configureStore({
  reducer: {
    festival: festivalReducer,
    festivalShow: FestivalShowReducer,
  }
});