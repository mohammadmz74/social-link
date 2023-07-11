import { createSlice } from "@reduxjs/toolkit";
const uiSlice = createSlice({
  name: "ui",
  initialState: { formIsVisible: false,editForm:false },
  reducers: {
    openHandler(state) {
      state.formIsVisible = true;
    },
    editHandler(state) {
      state.formIsVisible = true;
      state.editForm=true
    },
    closeHandler(state) {
      state.formIsVisible = false;
      state.editForm=false
    },
  },
});
export const uiActions = uiSlice.actions;
export default uiSlice;
