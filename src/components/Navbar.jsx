import React, { useState } from "react";
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

  const dialogHandler = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const orderHandler = () => {
    dispatch(cartActions.clearCart(email));
    toast.success("Order placed successfully!", {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    });
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
    <nav className="bg-[#1976D2] p-4 fixed w-full z-50">
      <div className="container mx-auto flex items-center justify-between  sm:px-4">
        <Link to="/products" onClick={openSnakbarHandler}>
          <div className="text-white text-3xl font-bold">ShopNest</div>
        </Link>

        <div className="flex  justify-end space-x-4 md:gap-12">
          {/* cart icon for login user */}
          {token && (
            <Badge badgeContent={cartProducts.length} color="secondary">
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
          {/* logout button for desktop/laptop */}
          {token && (
            <Link
              to="/"
              onClick={() => dispatch(authActions.logout())}
              className="hidden bg-red-500 text-white px-4 pb-[2px] font-medium rounded-md hover:bg-red-600 transition duration-300 sm:block"
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
