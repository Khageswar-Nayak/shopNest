import React from "react";
import { database_URL } from "../utils/Api";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cartSlice";

const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);
  const cartProducts = useSelector((state) => state.cart.cartProducts);

  const modifiedEmail = email.replace("@", "").replace(".", "");

  const increaseCartItem = async (cartProduct) => {
    const price = cartProduct.price / cartProduct.quantity;
    const quantity = 1;
    // const modifiedNewProduct = { ...product, price, quantity };

    const existingProduct = cartProducts.find(
      (product) => product.id === cartProduct.id
    );

    if (existingProduct) {
      const updatedProduct = {
        ...existingProduct,
        quantity: existingProduct.quantity + quantity,
        price: existingProduct.price + price,
      };

      try {
        const updateProduct = await fetch(
          `${database_URL}${modifiedEmail}/${existingProduct.firebaseId}.json`,
          {
            method: "PUT",
            body: JSON.stringify(updatedProduct),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (updateProduct.ok) {
          const updatedCartProducts = cartProducts.map((product) =>
            product.id === existingProduct.id ? updatedProduct : product
          );
          console.log("updatedCartProducts", updatedCartProducts);

          dispatch(
            cartActions.addToCart({
              updatedCartProducts,
              price: price,
            })
          );
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const decreaseCartItem = (product) => {
    dispatch(cartActions.removeFromCart({ product, email }));
  };

  return (
    <div className="flex items-center justify-between border-b-2 border-gray-300 py-2 mr-4">
      <div className=" flex">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-14 h-14 object-cover rounded"
        />

        <div className="flex items-center ml-2">
          <div className=" flex flex-col 	">
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-sm text-gray-500 hidden md:block">
              {product.description}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center mt-2">
        <span className="text-green-500 font-semibold">₹{product.price}</span>
        <div className="flex items-center ml-2 space-x-2">
          <button
            onClick={() => decreaseCartItem(product)}
            className="bg-gray-200 px-2 py-1 rounded"
          >
            -
          </button>
          <span>{product.quantity}</span>
          <button
            onClick={() => increaseCartItem(product)}
            className="bg-gray-200 px-2 py-1 rounded"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
