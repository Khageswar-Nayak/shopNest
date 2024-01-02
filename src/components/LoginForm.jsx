import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Import eye icons from a suitable library
import Layout from "../layout/Layout";

const LoginForm = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: userName,
        password: password,
        // expiresInMins: 60, // optional
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res", res);
      });
  };

  return (
    <Layout>
      <div className="min-h-[100vh] flex items-center justify-center">
        <div className="max-w-xs w-full p-8 bg-white shadow-2xl	 rounded">
          <h2 className="text-2xl text-center font-bold mb-4">Login</h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                UserName
              </label>
              <input
                type="text"
                className="border border-gray-300 px-3 py-2 w-full rounded focus:outline-[#1976D2]"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
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
            </div>
            <button
              type="submit"
              className="bg-[#1976D2] text-white px-4 py-2  w-full"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default LoginForm;
