import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import ProductCard from "./components/ProductCard";
import Products from "./components/Products";
import ProductSkeleton from "./components/ProductSkeleton";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/products" element={<Products />} />
        <Route path="/s" element={<ProductSkeleton />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
