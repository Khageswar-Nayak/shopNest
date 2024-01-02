import React from "react";

const product = {
  brand: "OPPO",
  category: "smartphones",
  description:
    "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ",
  discountPercentage: 17.91,
  id: 4,
  price: 280,
  rating: 4.3,
  stock: 123,
  thumbnail: "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
  title: "OPPOF19",
};
const CartItem = () => {
  return (
    <div className="flex items-center justify-between border-b-2 border-gray-300 py-2">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-14 h-14 object-cover rounded"
      />

      <div className="flex items-center ml-2">
        <div className=" flex flex-col">
          <h2 className="text-lg font-semibold">{product.title}</h2>
          <p className="text-sm text-gray-500 hidden md:block">
            {product.description}
          </p>
        </div>
        <div className="flex items-center mt-2">
          <span className="text-green-500 font-semibold">₹1345.67</span>
          <div className="flex items-center ml-2 space-x-2">
            <button className="bg-gray-200 px-2 py-1 rounded">-</button>
            <span>1</span>
            <button className="bg-gray-200 px-2 py-1 rounded">+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
