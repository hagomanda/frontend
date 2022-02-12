import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  isFetching: true,
  error: null,
};

const goalListSlice = createSlice({
  name: "goalList",
  initialState,
  reducers: {
    getGoalList: state => {
      state.isFetching = true;
    },
    getGoalListSuccess: state => {
      state.isFetching = false;
    },
    getGoalListError: (state, action) => {
      state.error = action.payload;
    },
    setGoalList: (state, action) => {
      state.data = action.payload;
    },
    deleteGoal: state => state,
    deleteGoalError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  getGoalList,
  getGoalListSuccess,
  getGoalListError,
  setGoalList,
  deleteGoal,
  deleteGoalError,
} = goalListSlice.actions;
export default goalListSlice.reducer;
