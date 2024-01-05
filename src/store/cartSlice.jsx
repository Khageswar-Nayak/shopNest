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
      state.cartProducts = action.payload.updatedCartProducts;

      state.totalAmount += action.payload.price;
    },
    removeFromCart: (state, action) => {
      state.cartProducts = action.payload.updatedCartProducts;
      state.totalAmount -= action.payload.price;
    },
    setCart: (state, action) => {
      state.cartProducts = action.payload;
      state.totalAmount = action.payload.reduce(
        (sum, product) => sum + product.price,
        0
      );
      // console.log("action.payload", action.payload);
    },
    clearCart: (state, action) => {
      state.cartProducts = [];
      state.totalAmount = 0;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
