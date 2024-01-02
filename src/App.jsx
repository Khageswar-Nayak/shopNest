import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Products from "./components/Products";
import Cart from "./components/Cart";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "./store/authSlice";

const App = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  // console.log("token", token);
  const savedEmail = localStorage.getItem("email");
  const savedToken = localStorage.getItem("token");

  const data = {
    email: savedEmail,
    token: savedToken,
  };

  useEffect(() => {
    dispatch(authActions.login(data));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route
          path="/products"
          element={token ? <Products /> : <LoginForm />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
