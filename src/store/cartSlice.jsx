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
      const existingProduct = state.cartProducts.find(
        (product) => product.id === action.payload.modifiedNewProduct.id
      );

      if (existingProduct) {
        const updatedProduct = {
          ...existingProduct,
          quantity:
            existingProduct.quantity +
            action.payload.modifiedNewProduct.quantity,
          price:
            existingProduct.price + action.payload.modifiedNewProduct.price,
        };

        const updatedCartProducts = state.cartProducts.map((product) =>
          product.id === action.payload.modifiedNewProduct.id
            ? updatedProduct
            : product
        );
        state.cartProducts = updatedCartProducts;
      } else {
        const newCartProducts = [
          ...state.cartProducts,
          action.payload.modifiedNewProduct,
        ];
        state.cartProducts = newCartProducts;
      }

      state.totalAmount += action.payload.modifiedNewProduct.price;
      localStorage.setItem(
        `${action.payload.email}`,
        JSON.stringify(state.cartProducts)
      );
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
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
