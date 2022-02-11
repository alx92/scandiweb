import React from "react";
import ProductDetail from "./ProductDetail";

const Category = ({ categories }) => {
  const { name, products } = categories;

  return (
    <div>
      <h1>{name.toUpperCase()}</h1>
      {products?.map((prod) => (
        <li key={prod.id}>
          <ProductDetail product={prod} />
        </li>
      ))}
    </div>
  );
};

export default Category;
