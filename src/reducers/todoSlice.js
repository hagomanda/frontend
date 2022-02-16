import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  isFetching: true,
  error: null,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    getTodos: state => {
      state.isFetching = true;
    },
    getTodosSuccess: state => {
      state.isFetching = false;
    },
    getTodosError: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    setTodos: (state, action) => {
      state.data = action.payload;
    },
    changeCompletion: state => state,
    saveMemo: state => {
      state.isFetching = true;
    },
    saveMemoSuccess: state => {
      state.isFetching = false;
    },
    saveMemoError: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    deleteMemo: state => {
      state.isFetching = true;
    },
    deleteMemoSuccess: state => {
      state.isFetching = false;
    },
    deleteMemoError: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    saveTodo: state => state,
  },
});

export const {
  getTodos,
  getTodosSuccess,
  getTodosError,
  setTodos,
  changeCompletion,
  saveMemo,
  saveMemoSuccess,
  saveMemoError,
  deleteMemo,
  deleteMemoSuccess,
  deleteMemoError,
  saveTodo,
} = todoSlice.actions;
export default todoSlice.reducer;
