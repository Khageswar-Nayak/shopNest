import React, { useEffect, useState } from "react";
import logo from "../assets/shop.png";
import { database_URL } from "../utils/Api";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link } from "react-router-dom";
import { Badge, DialogActions } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { authActions } from "../store/authSlice";
import { useSelector, useDispatch } from "react-redux";
import Dialog from "@mui/material/Dialog";
import Cart from "./Cart";
import { cartActions } from "../store/cartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const email = useSelector((state) => state.auth.email);
  const cartProducts = useSelector((state) => state.cart.cartProducts);
  const dispatch = useDispatch();

  const modifiedEmail = email.replace("@", "").replace(".", "");

  const fetchCartProducts = async () => {
    console.log("modifiedEmail", modifiedEmail);
    if (modifiedEmail && email) {
      try {
        const getCartProducts = await fetch(
          `${database_URL}${modifiedEmail}.json`
        );

        const data = await getCartProducts.json();
        console.log("data", data);

        const loadedProducts = [];
        for (const key in data) {
          loadedProducts.push({ ...data[key] });
        }
        console.log("loadedProducts", loadedProducts);
        dispatch(cartActions.setCart(loadedProducts));
      } catch (error) {
        alert(error);
      }
    }
  };

  useEffect(() => {
    fetchCartProducts();
  }, [email]);

  const dialogHandler = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const orderHandler = async () => {
    try {
      const deleteProduct = await fetch(
        `${database_URL}${modifiedEmail}.json`,
        {
          method: "DELETE",
        }
      );
      console.log(deleteProduct);

      if (deleteProduct.ok) {
        dispatch(cartActions.clearCart());
        toast.success("Order placed successfully!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      }
    } catch (err) {
      alert(err);
    }
  };

  const openSnakbarHandler = () => {
    if (!token) {
      setOpenSnackbar(true);
      setTimeout(() => {
        setOpenSnackbar(false);
      }, 2000);
    }
  };
  return (
    <nav className="bg-[#1976D2] pt-[10px] fixed w-full z-50">
      <div className="container mx-auto flex items-center justify-between px-[10px]  sm:px-4 lg:max-w-[1180px]">
        <Link to="/" className=" mt-[-15px]">
          <i className="text-[40px] font-serif	 text-white font-semibold  ">
            e-
          </i>
          <img
            className=" inline  h-[46px] w-[108px] md:w-[152px] mt-[-43px] mb-[-16px] "
            src={logo}
            alt="logo"
          />
        </Link>

        <div className="flex  justify-end space-x-4 md:gap-12 mt-[-5px]">
          {/* cart icon for login user */}
          {token && (
            <Badge badgeContent={cartProducts?.length} color="secondary">
              <AddShoppingCartIcon
                className=" text-white cursor-pointer"
                onClick={dialogHandler}
              />
            </Badge>
          )}

          {/* cart icon for logout user */}
          {!token && (
            <AddShoppingCartIcon
              className=" text-white cursor-pointer"
              onClick={openSnakbarHandler}
            />
          )}

          {/* login button */}
          {!token && (
            <Link
              to="/login"
              className=" rounded bg-green-500 text-white px-3 pb-[2px] font-medium hover:bg-green-600 transition duration-300 "
            >
              Login
            </Link>
          )}

          {/* logout button for desktop/laptop */}
          {token && (
            <Link
              to="/"
              onClick={() => dispatch(authActions.logout())}
              className="hidden bg-red-500 text-white px-3 pb-[2px] font-medium rounded hover:bg-red-600 transition duration-300 sm:block"
            >
              Logout
            </Link>
          )}

          {/* logout icon for mobile device */}
          {token && (
            <Link
              className=" sm:hidden"
              to="/"
              onClick={() => dispatch(authActions.logout())}
            >
              <LogoutIcon className="   text-white sm:hidden" />
            </Link>
          )}
        </div>
      </div>

      {/* gives notification when user trying to access products without login */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Please login to access
        </Alert>
      </Snackbar>

      {/* this dialog open when user click on cart icon */}
      <Dialog open={openDialog} onClose={handleClose} maxWidth="sm">
        <Cart />
        <DialogActions>
          <button
            className=" text-[#1976D2] px-2 py-[2px] rounded hover:bg-[#1976D2] hover:text-white "
            onClick={handleClose}
          >
            Close
          </button>
          <button
            onClick={() => orderHandler()}
            className=" text-white bg-[#1976D2] rounded px-2 py-[2px]  "
          >
            Order
          </button>
        </DialogActions>
      </Dialog>
    </nav>
  );
};

export default Navbar;
