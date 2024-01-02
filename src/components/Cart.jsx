import React from "react";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const Cart = () => {
  const cartProducts = useSelector((state) => state.cart.cartProducts);

  return (
    <>
      <h1 className=" text-center font-serif font-bold pt-2 text-2xl ">Cart</h1>
      <div className=" px-4">
        {cartProducts?.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}

        <div className=" flex justify-between ">
          <h1 className=" font-bold">Total Amount</h1>
          <h1 className=" font-bold">₹ 500</h1>
        </div>
      </div>
    </>
  );
};

export default Cart;
