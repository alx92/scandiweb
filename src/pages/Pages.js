import React from "react";
import { Route, Routes } from "react-router-dom";
import Categories from "../components/Categories";

const Pages = ({ input }) => {
  return (
    <Routes>
      <Route path="/" element={<Categories name="all" />} />
      <Route path="/category/clothes" element={<Categories name="clothes" />} />
      <Route path="/category/tech" element={<Categories name="tech" />} />
    </Routes>
  );
};

export default Pages;
