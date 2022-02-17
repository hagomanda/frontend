import { createSlice } from "@reduxjs/toolkit";
import { VIEW_OPTION, ROLE } from "../constants";

const initialState = {
  option: VIEW_OPTION.MAIN_VIEW,
  data: {},
  displayed: {},
  index: 0,
  isFetching: true,
  createMandal: null,
  error: null,
};

const makeArray = (mandal, child) => {
  const results = [];

  mandal[child].forEach(({ title, level, _id }) => {
    results.push({ title, level, _id, role: child });
  });

  const { title, level } = mandal;

  results.splice(4, 0, {
    title,
    level,
    _id: mandal._id,
    role: child === ROLE.TODO ? ROLE.SUBMAIN : ROLE.MAIN,
  });

  return results;
};

export const mandalSlice = createSlice({
  name: "mandal",
  initialState,
  reducers: {
    getMandal: state => {
      state.isFetching = true;
      state.createMandal = null;
    },
    getMandalSuccess: state => {
      state.isFetching = false;
    },
    getMandalError: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    setMandal: (state, action) => {
      state.data = action.payload;
      if (state.option === VIEW_OPTION.SUB_VIEW) {
        state.displayed = makeArray(
          state.data.subGoals[state.index],
          ROLE.TODO,
        );
      } else {
        state.displayed = makeArray(state.data, ROLE.SUBGOAL);
      }
    },
    displayMain: state => {
      state.option = VIEW_OPTION.MAIN_VIEW;
      state.displayed = makeArray(state.data, ROLE.SUBGOAL);
    },
    displayFull: state => {
      state.option = VIEW_OPTION.FULL_VIEW;
      state.displayed = state.data;
    },
    displaySub: (state, action) => {
      state.option = VIEW_OPTION.SUB_VIEW;
      state.displayed = makeArray(
        state.data.subGoals[action.payload],
        ROLE.TODO,
      );
      state.index = action.payload;
    },
    createMandal: state => state,
    createMandalError: (state, action) => {
      state.error = action.payload;
    },
    createMandalSuccess: (state, action) => {
      state.createMandal = action.payload;
    },
    modifyMandal: state => state,
    modifyMandalError: (state, action) => {
      state.error = action.payload;
    },
    initializeMandalError: state => {
      state.error = null;
    },
  },
});

export const {
  getMandal,
  setMandal,
  displayMain,
  displaySub,
  displayFull,
  getMandalSuccess,
  getMandalError,
  createMandal,
  createMandalError,
  createMandalSuccess,
  modifyMandal,
  modifyMandalError,
  initializeMandalError,
} = mandalSlice.actions;
export default mandalSlice.reducer;
