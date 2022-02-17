import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSearchSuccess: false,
  isShareSuccess: false,
  message: "검색 결과가 여기에 나타납니다.",
  user: {},
};

export const shareSlice = createSlice({
  name: "share",
  initialState,
  reducers: {
    getUserInfo: state => state,
    getUserInfoSuccess: (state, action) => {
      state.isSearchSuccess = true;
      state.user = action.payload;
      state.message = "검색 결과가 여기에 나타납니다.";
    },
    getUserInfoFailure: state => {
      state.isSearchSuccess = false;
      state.message = "검색 결과가 없습니다.";
      state.user = {};
    },
    getUserInfoError: state => {
      state.isSearchSuccess = false;
      state.message = "오류가 발생했습니다.";
      state.user = {};
    },
    shareMandal: state => state,
    shareMandalSuccess: state => {
      state.isShareSuccess = true;
      state.message = "검색 결과가 여기에 나타납니다.";
    },
    shareMandalError: state => {
      state.isShareSuccess = false;
      state.message = "오류가 발생했습니다.";
    },
    initializeShareSuccess: state => {
      state.isShareSuccess = false;
    },
  },
});

export const {
  getUserInfo,
  getUserInfoSuccess,
  getUserInfoFailure,
  getUserInfoError,
  shareMandal,
  shareMandalSuccess,
  shareMandalError,
  initializeShareSuccess,
} = shareSlice.actions;
export default shareSlice.reducer;
