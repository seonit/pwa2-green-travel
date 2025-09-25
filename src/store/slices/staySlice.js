import { createSlice } from "@reduxjs/toolkit";
import { stayIndex } from "../thunks/stayThunk.js";
import { localStorageUtil } from "../../utils/localStorageUtil.js";

const staySlice = createSlice({
  name: 'staySlice',
  initialState: {
    list: localStorageUtil.getStayList() || [], 
    page: localStorageUtil.getStayPage() || 0, 
    scrollEventFlg: localStorageUtil.getStayScrollFlg() !== null ? localStorageUtil.getStayScrollFlg() : true, 
  },
  reducers: {
    setScrollEventFlg: (state, action) => {
      state.scrollEventFlg = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(stayIndex.fulfilled, (state, action) => {
        if(action.payload.items?.item) {
          state.list = [...state.list, ...action.payload.items.item];
          state.page = action.payload.pageNo;

          localStorageUtil.setStayList(state.list);
          localStorageUtil.setStayPage(state.page);
          localStorageUtil.setStayScrollFlg(state.scrollEventFlg);

          state.scrollEventFlg = true;
        } else {
          state.scrollEventFlg = false;
        }
      })
      .addMatcher(
        action => action.type.endsWith('/pending'),
        () => {
          console.log('숙소 목록 처리중입니다.');
        }
      )
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        (state, action) => {
          console.error('숙소 목록 에러.', action.error);
        }
      );
  }
});

export const {
  setScrollEventFlg
} = staySlice.actions;

export default staySlice.reducer;
