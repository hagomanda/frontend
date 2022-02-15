import { createSlice } from "@reduxjs/toolkit";
import { VIEW_OPTION, ROLE } from "../constants";
const initialState = {
  option: VIEW_OPTION.MAIN_VIEW,
  data: {},
  displayed: {},
  index: 0,
  isFetching: true,
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

export const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    getMandal: state => {
      state.isFetching = true;
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
      state.isFetching = false;
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
  },
});

export const { getMandal, setMandal, displayMain, displaySub, displayFull } =
  viewSlice.actions;
export default viewSlice.reducer;
