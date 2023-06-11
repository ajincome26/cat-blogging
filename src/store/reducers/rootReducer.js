import { combineReducers } from "@reduxjs/toolkit";
import globalSlice from "./globalSlice";

const rootReducer = combineReducers({
  global: globalSlice,
});

export default rootReducer;
