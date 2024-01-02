import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  cartProducts: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart: (state, action) => {
      state.cartProducts.push(action.payload);
    },
    removeFromCart: (state, action) => {},
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
