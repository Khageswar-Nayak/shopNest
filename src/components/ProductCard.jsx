import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import { database_URL } from "../utils/Api";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../store/cartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductCard = ({ product }) => {
  const [status, setStatus] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector((state) => state.auth.email);
  const cartProducts = useSelector((state) => state.cart.cartProducts);

  const modifiedEmail = email.replace("@", "").replace(".", "");

  const addToCartHandler = async (newProduct) => {
    if (!email) {
      navigate("/login");
      toast.warn("Please Login!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    } else {
      const modifiedNewProduct = { ...newProduct, quantity: 1 };

      const existingProduct = cartProducts.find(
        (product) => product.id === modifiedNewProduct.id
      );

      if (existingProduct) {
        const updatedProduct = {
          ...existingProduct,
          quantity: existingProduct.quantity + modifiedNewProduct.quantity,
          price: existingProduct.price + modifiedNewProduct.price,
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
              product.id === modifiedNewProduct.id ? updatedProduct : product
            );
            // console.log("updatedCartProducts", updatedCartProducts);

            dispatch(
              cartActions.addToCart({
                updatedCartProducts,
                price: newProduct.price,
              })
            );

            // notification for user
            setStatus(true);
            toast.success("Product added successfully!", {
              position: "top-right",
              autoClose: 3000,
              theme: "colored",
            });
            setTimeout(() => {
              setStatus(false);
            }, 5000);
          }
        } catch (err) {
          alert(err);
        }
      } else {
        try {
          const postProductInDatabase = await fetch(
            `${database_URL}${modifiedEmail}.json`,
            {
              method: "POST",
              body: JSON.stringify(modifiedNewProduct),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await postProductInDatabase.json();
          const firebaseIdProduct = {
            ...newProduct,
            quantity: 1,
            firebaseId: data.name,
          };
          const updatedCartProducts = [...cartProducts, firebaseIdProduct];

          if (postProductInDatabase.ok) {
            dispatch(
              cartActions.addToCart({
                updatedCartProducts,
                price: newProduct.price,
              })
            );
            setStatus(true);
            toast.success("Product added successfully!", {
              position: "top-right",
              autoClose: 3000,
              theme: "colored",
            });
            setTimeout(() => {
              setStatus(false);
            }, 5000);
          }
        } catch (err) {
          alert(err);
        }
      }
    }
  };

  return (
    <>
      <div className="bg-white ml-[10px] mr-[10px] sm:mr-0 sm:ml-4 rounded-lg overflow-hidden shadow-2xl h-fit sm:max-w-64 ">
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
          {status ? <span>Added to Cart</span> : <span>Add to Cart</span>}
        </button>
      </div>
    </>
  );
};

export default ProductCard;
