import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  isFetching: false,
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
    setTodos: state => state,
    setTodosSuccess: (state, action) => {
      state.data = action.payload;
    },
    changeCompletion: state => state,
    changeCompletionSuccess: state => {
      state.isFetching = false;
    },
    changeCompletionError: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
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
    saveTodoError: (state, action) => {
      state.error = action.payload;
    },
  },
  initializeTodosError: state => {
    state.error = null;
  },
});

export const {
  getTodos,
  getTodosSuccess,
  getTodosError,
  setTodos,
  setTodosSuccess,
  changeCompletion,
  changeCompletionSuccess,
  changeCompletionError,
  saveMemo,
  saveMemoSuccess,
  saveMemoError,
  deleteMemo,
  deleteMemoSuccess,
  deleteMemoError,
  saveTodo,
  initializeTodosError,
  saveTodoError,
} = todoSlice.actions;
export default todoSlice.reducer;
