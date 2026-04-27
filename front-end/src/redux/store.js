import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import themeSlice from "./features/themeSlice";
import cartSliceReducer from "./features/cartSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    theme: themeSlice,
    cart: cartSliceReducer,
  },
});

export default store;
