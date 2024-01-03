import React from "react";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars-2";

const Cart = () => {
  const cartProducts = useSelector((state) => state.cart.cartProducts);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  return (
    <>
      <h1 className=" text-center font-serif font-bold pt-2 text-2xl ">Cart</h1>
      <div className=" px-4 ">
        <div className=" max-h-[21rem] ">
          <Scrollbars autoHeight>
            {cartProducts?.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </Scrollbars>
        </div>

        <div className=" flex justify-between ">
          <h1 className=" font-bold">Total Amount</h1>
          <h1 className=" font-bold">₹ {totalAmount}</h1>
        </div>
      </div>
    </>
  );
};

export default Cart;
