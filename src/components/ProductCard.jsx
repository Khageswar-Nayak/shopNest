import React from "react";
import Rating from "@mui/material/Rating";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (item) => {
    dispatch(cartActions.addToCart({ ...item, quantity: 1 }));
  };

  return (
    <>
      <div className="bg-white ml-4 rounded-lg overflow-hidden shadow-2xl h-fit max-w-64 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110">
        <div className=" relative">
          <img
            className="w-full h-48  overflow-hidden"
            src={product.thumbnail}
            alt={product.title}
          />
          <div className="absolute bottom-0 left-0">
            <Rating
              name="half-rating-read"
              defaultValue={product.rating}
              precision={0.2}
              readOnly
            />
          </div>

          <div className=" right-1 bottom-1 bg-pink-600 font-medium text-white absolute p-1 rounded text-[10px] ">
            {product.brand}
          </div>
        </div>
        <div className="p-2">
          <div className=" flex justify-between ">
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            <p>In Stock : {product.stock}</p>
          </div>

          <p className="text-gray-600 text-sm mb-[2px]">
            {product.description}
          </p>
          <p className=" text-[#388e3c] font-medium text-base	">special price</p>
          <div className="flex  gap-1 items-center">
            <span className="text-xl font-bold text-slate-700">
              ₹{product.price}
            </span>
            <span className="text-xs text-gray-500 line-through">
              ₹
              {(product.price * (1 + product.discountPercentage / 100)).toFixed(
                2
              )}
            </span>
            <span className=" text-[#388e3c] font-medium text-[14px]">
              {product.discountPercentage}% off
            </span>
          </div>
        </div>
        <button
          onClick={() => addToCartHandler(product)}
          className=" text-center bg-[#1976D2] w-full text-white  py-2 font-medium "
        >
          Add to Cart
        </button>
      </div>
    </>
  );
};

export default ProductCard;
