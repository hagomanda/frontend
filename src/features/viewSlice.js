import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  option: "mainGoal",
};

export const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    changeToMainGoal: state => {
      state.option = "mainGoal";
    },
    changeToSubGoal: state => {
      state.option = "subGoal";
    },
    changeToFullView: state => {
      state.option = "fullView";
    },
  },
});

export const { changeToMainGoal, changeToSubGoal, changeToFullView } =
  viewSlice.actions;
export default viewSlice.reducer;
