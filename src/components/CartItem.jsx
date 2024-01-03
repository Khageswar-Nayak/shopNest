import React from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cartSlice";
import { useSelector } from "react-redux";

const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);

  const increaseCartItem = (product) => {
    const price = product.price / product.quantity;
    const quantity = 1;
    const modifiedNewProduct = { ...product, price, quantity };

    dispatch(cartActions.addToCart({ modifiedNewProduct, email }));
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
