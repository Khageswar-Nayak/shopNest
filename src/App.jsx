import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Products from "./components/Products";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "./store/authSlice";
import { cartActions } from "./store/cartSlice";

const App = () => {
  const token = useSelector((state) => state.auth.token);
  const email = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const savedEmail = (await localStorage.getItem("email")) || "";
      const savedToken = (await localStorage.getItem("token")) || "";
      const savedCartProducts =
        JSON.parse(await localStorage.getItem(`${savedEmail}`)) || [];

      console.log("savedEmail", savedEmail);
      console.log("savedCartProducts", savedCartProducts);

      const data = {
        email: savedEmail,
        token: savedToken,
      };

      dispatch(authActions.login(data));
      dispatch(cartActions.setCart(savedCartProducts));
    };

    fetchData();
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
