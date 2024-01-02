import React from "react";
import CartItem from "./CartItem";

const Cart = () => {
  return (
    <>
      <h1 className=" text-center font-serif font-bold pt-2 text-2xl ">Cart</h1>
      <div className=" px-4">
        <CartItem />
        <div className=" flex justify-between ">
          <h1 className=" font-bold">Total Amount</h1>
          <h1 className=" font-bold">₹ 500</h1>
        </div>
      </div>
    </>
  );
};

export default Cart;
