import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  option: "mainGoal",
  data: {},
  displayed: {},
};

export const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    getMandal: state => state,
    setMandal: (state, action) => {
      state.data = action.payload;
      state.displayed = action.payload;
    },
    displayMain: state => {
      state.option = "mainGoal";
      state.displayed = state.data;
    },
    displayFull: state => {
      state.option = "full";
      state.displayed = state.data;
    },
    displaySub: (state, action) => {
      state.option = "subGoal";
      state.displayed = state.data.subGoals[action.payload];
    },
  },
});

export const { getMandal, setMandal, displayMain, displaySub, displayFull } =
  viewSlice.actions;
export default viewSlice.reducer;
