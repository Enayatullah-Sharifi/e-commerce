import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: localStorage.getItem("darkMode")
    ? JSON.parse(localStorage.getItem("darkMode"))
    : false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    darkModeToggle: (state, actions) => {
      state.darkMode = actions.payload;
      localStorage.setItem("darkMode", JSON.stringify(actions.payload));
    },
  },
});

export default themeSlice.reducer;
export const { darkModeToggle } = themeSlice.actions;
