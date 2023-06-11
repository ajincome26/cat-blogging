import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggleMenu: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    toggleMenu: (state, action) => ({
      ...state,
      toggleMenu: action.payload,
    }),
  },
});

export default globalSlice.reducer;
export const { toggleMenu } = globalSlice.actions;
