import React from "react";
import { Route, Routes } from "react-router-dom";
import Categories from "../components/PLP/Categories";
import ProductCard from "../components/PDP/ProductCard";

const Pages = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Categories name="all" />} />
        <Route path="clothes" element={<Categories name="clothes" />} />
        <Route path="tech" element={<Categories name="tech" />} />
        <Route path=":id" element={<ProductCard />} />
      </Routes>
    </div>
  );
};

export default Pages;
