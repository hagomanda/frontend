import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  option: "mainGoal",
  data: {},
  displayed: {},
  isFetching: true,
};

const MAIN_VIEW = "subGoals";
const SUB_VIEW = "todos";

const makeArray = (mandal, view) => {
  const results = [];

  mandal[view].forEach(({ title, level, _id }) => {
    results.push({ title, level, _id, role: view });
  });

  const { title, level } = mandal;
  results.splice(4, 0, {
    title,
    level,
    _id: mandal._id,
    role: view === SUB_VIEW ? "submain" : "main",
  });

  return results;
};

export const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    getMandal: state => {
      state.isFetching = true;
    },
    setMandal: (state, action) => {
      state.data = action.payload;
      state.displayed = makeArray(action.payload, MAIN_VIEW);
      state.isFetching = false;
    },
    displayMain: state => {
      state.option = "mainGoal";
      state.displayed = makeArray(state.data, MAIN_VIEW);
    },
    displayFull: state => {
      state.option = "full";
      state.displayed = state.data;
    },
    displaySub: (state, action) => {
      state.option = "subGoal";
      state.displayed = makeArray(
        state.data.subGoals[action.payload],
        SUB_VIEW,
      );
    },
  },
});

export const { getMandal, setMandal, displayMain, displaySub, displayFull } =
  viewSlice.actions;
export default viewSlice.reducer;
