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
      const existingProductIndex = state.cartProducts.findIndex(
        (product) => product.id === action.payload.product.id
      );

      const existingProduct = state.cartProducts[existingProductIndex];

      let updatedCartProducts;

      if (existingProduct.quantity === 1) {
        updatedCartProducts = state.cartProducts.filter(
          (product) => product.id !== existingProduct.id
        );
        state.cartProducts = updatedCartProducts;
        localStorage.setItem(
          `${action.payload.email}`,
          JSON.stringify(state.cartProducts)
        );
        state.totalAmount -= existingProduct.price;
      } else {
        const updatedProduct = {
          ...existingProduct,
          quantity: existingProduct.quantity - 1,
          price:
            existingProduct.price -
            existingProduct.price / existingProduct.quantity,
        };

        updatedCartProducts = [...state.cartProducts];
        updatedCartProducts[existingProductIndex] = updatedProduct;
        state.cartProducts = updatedCartProducts;
        state.totalAmount -= existingProduct.price / existingProduct.quantity;
        localStorage.setItem(
          `${action.payload.email}`,
          JSON.stringify(state.cartProducts)
        );
      }
    },
    setCart: (state, action) => {
      state.cartProducts = action.payload;
      state.totalAmount = action.payload.reduce(
        (sum, product) => sum + product.price,
        0
      );
      console.log("action.payload", action.payload);
    },
    clearCart: (state, action) => {
      state.cartProducts = [];
      state.totalAmount = 0;
      localStorage.setItem(
        `${action.payload}`,
        JSON.stringify(state.cartProducts)
      );
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
