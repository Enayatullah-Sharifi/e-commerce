import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x._id === item._id);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x,
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // calculate item price
      state.itemPrice = addDecimals(
        state.cartItems.reduce(
          (acc, item) =>
            acc + (item.discountedPrice ?? item.realPrice) * item.qty,
          0,
        ),
      );

      // calculate shipping price (if over $100 free else $10);
      state.shippingPrice = addDecimals(state.itemPrice < 100 ? 10 : 0);

      // calculate tax price
      state.taxPrice = addDecimals(Number((0.15 * state.itemPrice).toFixed(2)));

      // calculate total price
      state.totalPrice = (
        Number(state.itemPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      const item = action.payload;

      state.cartItems = state.cartItems.filter((x) => x._id !== item._id);

      // calculate item price
      state.itemPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
      );

      // calculate shipping price (if over $100 free else $10);
      state.shippingPrice = addDecimals(
        state.itemPrice < 100 && state.itemPrice > 0 ? 10 : 0,
      );

      // calculate tax price
      state.taxPrice = addDecimals(Number((0.15 * state.itemPrice).toFixed(2)));

      // calculate total price
      state.totalPrice = (
        Number(state.itemPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCart: (state) => {
      ((state.cartItems = []), localStorage.setItem("cart", []));
      state.itemPrice = 0;
      state.shippingPrice = 0;
      state.taxPrice = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
