import React from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link } from "react-router-dom";
import { Badge } from "@mui/material";

const Navbar = () => {
  return (
    <nav className="bg-[#1976D2] p-4 fixed w-full z-50">
      <div className="container mx-auto flex items-center justify-around">
        <div className="text-white text-3xl font-bold">ShopNest</div>

        <div className="flex space-x-4 md:gap-32">
          <Link
            to="/products"
            className="text-white hover:text-gray-300 text-xl"
          >
            Products
          </Link>
          <Badge badgeContent={4} color="secondary">
            <AddShoppingCartIcon className=" text-white cursor-pointer" />
          </Badge>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
