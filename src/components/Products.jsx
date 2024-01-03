import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { lazy, Suspense } from "react";
import ProductSkeleton from "./ProductSkeleton";
import { Scrollbars } from "react-custom-scrollbars-2";

const ProductCard = lazy(() => import("./ProductCard"));

const Products = () => {
  const [products, setProducts] = useState([]);
  const [emptyProducts, setEmptyProducts] = useState(false);
  const [category, setCategory] = useState("All products");
  const [sorting, setSorting] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData().then((products) => {
      const productsByCategory =
        category === "All products"
          ? products // If "All products" is selected, show all products
          : products.filter((product) => product.category === category);

      let sortedProducts = [];
      switch (sorting) {
        case "low to high":
          sortedProducts = [...productsByCategory].sort(
            (a, b) => a.price - b.price
          );
          break;
        case "high to low":
          sortedProducts = [...productsByCategory].sort(
            (a, b) => b.price - a.price
          );
          break;
        case "Rs. 500 and Above":
          sortedProducts = [...productsByCategory].filter(
            (product) => product.price >= 500
          );
          break;
        case "Rs. 1000 and Above":
          sortedProducts = [...productsByCategory].filter(
            (product) => product.price >= 1000
          );
          break;
        case "Rs. 0 - Rs. 1000":
          sortedProducts = [...productsByCategory].filter(
            (product) => product.price > 0 && product.price < 1000
          );
          break;
        case "Rs. 1000 - Rs. 2000":
          sortedProducts = [...productsByCategory].filter(
            (product) => product.price > 1000 && product.price < 2000
          );
          break;
      }

      if (sortedProducts.length > 0) {
        setProducts(sortedProducts);
        setEmptyProducts(false);
      } else if (
        (sortedProducts.length === 0 && sorting === "Rs. 500 and Above") ||
        (sortedProducts.length === 0 && sorting === "Rs. 1000 and Above") ||
        (sortedProducts.length === 0 && sorting === "Rs. 0 - Rs. 1000") ||
        (sortedProducts.length === 0 && sorting === "Rs. 1000 - Rs. 2000")
      ) {
        setProducts([]);
        setEmptyProducts(true);
      } else {
        setProducts(productsByCategory);
        setEmptyProducts(false);
      }
    });
  }, [sorting, category]);

  const fetchData = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      setProducts(data.products);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      return data.products;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log(products);

  return (
    <Layout>
      <div className=" p-8 pl-4 sm:pl-16 pt-20">
        <div className=" flex flex-col-reverse sm:flex-row gap-[8px] justify-between pb-4 ">
          <div className=" flex justify-between sm:justify-start">
            <select
              onChange={(e) => setCategory(e.target.value)}
              className=" rounded border-[1px] border-slate-500	 focus:border-slate-500 p-1 outline-none w-32	"
            >
              <option>All products</option>
              <option>smartphones</option>
              <option>laptops</option>
              <option>fragrances</option>
              <option>skincare</option>
              <option>groceries</option>
              <option>home-decoration</option>
            </select>
            <select
              onChange={(e) => setSorting(e.target.value)}
              className=" rounded border-[1px] border-slate-500	 focus:border-slate-500 p-1 outline-none w-[60px] sm:w-[163px] ml-1	"
            >
              <option value="" disabled hidden selected>
                sort
              </option>
              <option>low to high</option>
              <option>high to low</option>
              <option>Rs. 500 and Above</option>
              <option>Rs. 1000 and Above</option>
              <option>Rs. 0 - Rs. 1000</option>
              <option>Rs. 1000 - Rs. 2000</option>
            </select>
          </div>
          <input
            type="search"
            placeholder="Search products..."
            className="  border-[2px] border-[#5ea3e9] border-dashed	  outline-none p-1 rounded sm:mr-12"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>
        <Scrollbars style={{ width: "100%", height: "100vh" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-y-12 max-h-screen">
            {emptyProducts && (
              <p className=" text-center">No products found.</p>
            )}
            {loading
              ? products.map((_, index) => <ProductSkeleton key={index} />)
              : products
                  .filter((product) => {
                    return search.toLowerCase() === ""
                      ? product
                      : product.title.toLowerCase().includes(search);
                  })
                  .map((product) => (
                    <Suspense key={product.id} fallback={<ProductSkeleton />}>
                      <ProductCard product={product} key={product.id} />
                    </Suspense>
                  ))}
          </div>
        </Scrollbars>
      </div>
    </Layout>
  );
};

export default Products;
