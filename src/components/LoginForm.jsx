import React, { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Import eye icons from a suitable library
import Layout from "../layout/Layout";
import { auth_KEY } from "../utils/Api";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../store/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin((prevState) => !prevState);
  };

  useEffect(() => {
    if (token) {
      navigate("/products");
    }
  }, []);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (
      !isLogin &&
      confirmPassword.length > 0 &&
      confirmPassword !== password
    ) {
      toast.error("Password doesn't match", {
        position: "top-right",
        theme: "colored",
        autoClose: 3000,
      });
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } else {
      let url;
      if (isLogin) {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${auth_KEY}`;
      } else {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${auth_KEY}`;
      }

      try {
        const res = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          console.log(data);

          if (!data.registered && !isLogin) {
            console.log("User has successfully signed up");
            dispatch(authActions.login(data));

            navigate("/");
            toast.success("Welcome to E-shop!", {
              position: "top-right",
              theme: "colored",
              autoClose: 3000,
            });
          }

          if (data.registered) {
            dispatch(authActions.login(data));
            navigate("/");
          }
        } else {
          const data = await res.json();

          let errorMessage = "Authentication failed!";
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          console.log(data);

          throw new Error(errorMessage);
        }
      } catch (err) {
        toast.error(err.message, {
          position: "top-right",
          theme: "colored",
          autoClose: 3000,
        });
      }
    }

    // try {
    //   const response = await fetch("https://dummyjson.com/auth/login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       username: userName,
    //       password: password,
    //     }),
    //   });

    //   const data = await response.json();
    //   console.log("data", data);
    //   if (data.message === "Invalid credentials") {
    //     // alert("Invalid credentials");
    //     toast.error("Invalid credentials", {
    //       position: "top-right",
    //       autoClose: 3000,
    //       theme: "colored",
    //     });
    //   } else {
    //     dispatch(authActions.login(data));
    //     const savedCartProducts =
    //       JSON.parse(await localStorage.getItem(`${data.email}`)) || [];
    //     dispatch(cartActions.setCart(savedCartProducts));
    //     navigate("/products");
    //   }
    // } catch (error) {
    //   console.error("error", error);
    // }
  };

  return (
    <Layout>
      <div className="min-h-[100vh] flex items-center justify-center">
        <div className="max-w-xs w-full p-8 bg-white shadow-2xl	 rounded">
          <h2 className="text-2xl text-center font-bold mb-4">
            {isLogin ? "Login" : "SignUp"}
          </h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="text"
                className="border border-gray-300 px-3 py-2 w-full rounded focus:outline-[#1976D2]"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="border border-gray-300 px-3 py-2 w-full rounded focus:outline-[#1976D2]"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 px-3 py-2 outline-none	"
                  onClick={handleShowPassword}
                >
                  {showPassword ? (
                    <VisibilityOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Visibility className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
              {!isLogin && (
                <>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      className="border border-gray-300 px-3 py-2 w-full rounded focus:outline-[#1976D2]"
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      required
                    />
                  </div>
                </>
              )}
            </div>
            <button
              type="submit"
              className="bg-[#1976D2] text-white px-4 py-2  w-full"
            >
              {isLogin ? "Login" : "SignUp"}
            </button>
          </form>

          {!isLogin && (
            <div className=" mt-2">
              {" "}
              have an account?{" "}
              <span
                onClick={toggleForm}
                className=" text-blue-600 underline cursor-pointer "
              >
                please Login.
              </span>{" "}
            </div>
          )}
          {isLogin && (
            <div className=" mt-2">
              don't have an account?{" "}
              <span
                onClick={toggleForm}
                className=" text-blue-600 underline cursor-pointer"
              >
                SignUp.
              </span>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default LoginForm;
