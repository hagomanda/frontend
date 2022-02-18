import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loginLoading: false,
  loginSucceed: false,
  loginError: null,
  logoutLoading: false,
  refreshLogin: false,
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
      state.refreshLogin = true;
    },
    loginFailed: (state, action) => {
      state.loginLoading = false;
      state.loginSucceed = false;
      state.loginError = action.payload;
    },
    logoutRequest: state => {
      state.logoutLoading = true;
      state.loginError = null;
    },
    logoutSucceed: state => {
      state.user = null;
      state.loginLoading = false;
      state.loginSucceed = false;
      state.loginError = null;
      state.logoutLoading = false;
    },
    logoutFailed: (state, action) => {
      state.logoutLoading = false;
      state.loginError = action.payload;
    },
    join: state => {
      state.loginLoading = true;
      state.loginSucceed = false;
      state.loginError = null;
    },
    refresh: state => {
      state.loginLoading = true;
      state.refreshLogin = false;
    },
  },
});

export const {
  loginRequest,
  loginSucceed,
  loginFailed,
  logoutRequest,
  logoutSucceed,
  logoutFailed,
  join,
  refresh,
} = userSlice.actions;
export default userSlice.reducer;
