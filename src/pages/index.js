import React from "react";
import { Route, Routes } from "react-router-dom";
import CategoryPage from "./CategoryPage";
import Categories from "../components/Categories";

const Pages = ({ input }) => {
  return (
    <Routes>
      <Route path="/" element={<CategoryPage />} />
      <Route path={`/category/${input}`} element={<CategoryPage />} />
    </Routes>
  );
};

export default Pages;
