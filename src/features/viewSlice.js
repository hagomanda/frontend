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
    chageToFullView: state => {
      state.option = "fullView";
    },
  },
});

export const { changeToMainGoal, changeToSubGoal, chageToFullView } =
  viewSlice.actions;
export default viewSlice.reducer;
