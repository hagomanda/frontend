import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loginLoading: false,
  loginSucceed: false,
  loginError: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loginLoading = true;
      state.loginSucceed = false;
      state.loginError =  null;
    },
    loginSucceed: (state, action) => {
      state.loginLoading = false;
      state.loginSucceed = true;
      state.loginError = null;
      console.log(111,action)
      state.user = action.payload;
    },
    loginFailed: (state, action) => {
      state.loginLoading = false;
      state.loginSucceed = false;
      state.loginError = action.payload;
    },
    join: (state) => {
      state.loginLoading = true;
      state.loginSucceed = false;
      state.loginError =  null;
    }
  },
});

export const { loginRequest, loginSucceed, loginFailed, join } = userSlice.actions;
export default userSlice.reducer;