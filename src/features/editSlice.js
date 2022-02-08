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
  },
});

export const { changeEditMode } = editSlice.actions;
export default editSlice.reducer;
