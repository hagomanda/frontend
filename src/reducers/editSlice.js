import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: false,
};

export const editSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    changeEditMode: state => {
      state.mode = !state.mode;
    },
    leaveEditMode: state => {
      state.mode = false;
    },
  },
});

export const { changeEditMode, leaveEditMode } = editSlice.actions;
export default editSlice.reducer;
