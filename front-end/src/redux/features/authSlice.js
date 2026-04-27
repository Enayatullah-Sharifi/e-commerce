import { createSlice } from "@reduxjs/toolkit";
import { MdDarkMode } from "react-icons/md";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Login user
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, actions) => {
      state.isLoading = false;
      state.error = null;
      state.userInfo = actions.payload;
      localStorage.setItem("userInfo", JSON.stringify(actions.payload));
    },
    loginFailure: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },

    // Logout user
    logoutStart: (state) => {
      state.isLoading = true;
    },
    logoutSuccess: (state) => {
      state.isLoading = false;
      state.error = null;
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
    logoutFailure: (state, actions) => {
      console.log("logout failure");
      state.isLoading = false;
      state.error = actions.payload;
    },
  },
});

export default authSlice.reducer;
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
} = authSlice.actions;
