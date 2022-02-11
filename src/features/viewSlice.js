import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  option: "mainGoal",
  selectedId: "",
};

export const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    changeToMainGoal: state => {
      state.option = "mainGoal";
      state.selectedId = "";
    },
    changeToSubGoal: (state, action) => {
      state.option = "subGoal";
      state.selectedId = action.payload;
    },
    changeToFullView: state => {
      state.option = "fullView";
      state.selectedId = "";
    },
  },
});

export const { changeToMainGoal, changeToSubGoal, changeToFullView } =
  viewSlice.actions;
export default viewSlice.reducer;
