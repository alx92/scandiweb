import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import CategoryList from "../components/PLP/CategoryList";
import Product from "../components/PDP/Product";

class Pages extends Component {
  render() {
    return (
      <div>
        <Routes>
          <Route path="/" element={<CategoryList name="all" />} />
          <Route path="/clothes" element={<CategoryList name="clothes" />} />
          <Route path="/tech" element={<CategoryList name="tech" />} />
          <Route path=":id" element={<Product />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </div>
    );
  }
}

export default Pages;
