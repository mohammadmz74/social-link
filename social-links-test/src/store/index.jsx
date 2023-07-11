import { configureStore } from "@reduxjs/toolkit";
import infoSlice from "./info-slice";
import uiSlice from "./ui-slice";
const store = configureStore({
  reducer: { ui: uiSlice.reducer, info: infoSlice.reducer },
});
export default store;
