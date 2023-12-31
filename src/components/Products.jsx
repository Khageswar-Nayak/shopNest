import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { lazy, Suspense } from "react";
import ProductSkeleton from "./ProductSkeleton";

const ProductCard = lazy(() => import("./ProductCard"));

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.products);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
  };
  console.log(products);

  return (
    <Layout>
      <div className=" p-8 pl-16 pt-28">
        <div className=" flex justify-between mb-[16px]">
          <div>
            <select className=" rounded border-[1px] border-slate-500	 focus:border-slate-500 p-1 outline-none w-32	">
              <option>All products</option>
              <option>smartphones</option>
              <option>laptops</option>
              <option>fragrances</option>
              <option>skincare</option>
              <option>groceries</option>
              <option>home-decoration</option>
            </select>
            <select className=" rounded border-[1px] border-slate-500	 focus:border-slate-500 p-1 outline-none w-16 ml-1	">
              <option value="" disabled selected hidden>
                sort
              </option>
              <option>low to high</option>
              <option>high to low</option>
            </select>
          </div>
          <input
            type="search"
            placeholder="Search products..."
            className=" mr-12 border-[1px] border-slate-500 outline-none p-1 rounded "
          />
        </div>
        <div className="grid grid-cols-4 gap-y-12 ">
          {loading
            ? products.map((_, index) => <ProductSkeleton key={index} />)
            : products.map((product) => (
                <Suspense key={product.id} fallback={<ProductSkeleton />}>
                  <ProductCard product={product} key={product.id} />
                </Suspense>
              ))}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
