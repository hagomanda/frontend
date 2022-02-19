import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  isFetching: false,
  error: null,
  token: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    getMessages: state => {
      state.isFetching = true;
    },
    getMessagesError: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = state.messages.concat(action.payload);
      state.isFetching = false;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    saveMessages: state => state,
    saveMessagesError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  getMessages,
  getMessagesError,
  setMessages,
  setToken,
  saveMessages,
  saveMessagesError,
} = chatSlice.actions;
export default chatSlice.reducer;
