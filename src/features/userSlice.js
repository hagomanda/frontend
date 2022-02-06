import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loginLoading: false,
  loginSucceed: false,
  loginError: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRequest: state => {
      state.loginLoading = true;
      state.loginSucceed = false;
      state.loginError = null;
    },
    loginSucceed: (state, action) => {
      state.loginLoading = false;
      state.loginSucceed = true;
      state.loginError = null;
      state.user = action.payload;
    },
    loginFailed: (state, action) => {
      state.loginLoading = false;
      state.loginSucceed = false;
      state.loginError = action.payload;
    },
    join: state => {
      state.loginLoading = true;
      state.loginSucceed = false;
      state.loginError = null;
    },
    refresh: state => state,
  },
});

export const { loginRequest, loginSucceed, loginFailed, join, refresh } =
  userSlice.actions;
export default userSlice.reducer;
