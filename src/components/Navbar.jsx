import React, { useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link } from "react-router-dom";
import { Badge, DialogContentText } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { authActions } from "../store/authSlice";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

const Navbar = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const dialogHandler = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
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
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="text-white text-3xl font-bold">ShopNest</div>

        <div className="flex  justify-end space-x-4 md:gap-12">
          <Link
            to="/products"
            className="text-white hover:text-gray-300 text-xl"
            onClick={openSnakbarHandler}
          >
            Products
          </Link>

          <Badge badgeContent={49} color="secondary">
            <AddShoppingCartIcon
              className=" text-white cursor-pointer"
              onClick={dialogHandler}
            />
          </Badge>

          {token && (
            <Link
              to="/"
              onClick={() => dispatch(authActions.logout())}
              className="bg-red-500 text-white px-4 pb-[2px] font-medium rounded-md hover:bg-red-600 transition duration-300"
            >
              Logout
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
          Please Login
        </Alert>
      </Snackbar>

      {/* this dialog open when user click on cart icon */}
      <Dialog open={openDialog} onClose={handleClose}>
        <Button onClick={handleClose}>Close</Button>
      </Dialog>
    </nav>
  );
};

export default Navbar;
