import React from "react";
import ProductDetail from "../components/ProductDetail";

const CategoryType = ({ category }) => {
  const { name, products } = category;

  return (
    <div>
      {name}
      {products?.map((prod) => (
        <li key={prod.id}>
          <ProductDetail name={prod.name} product={prod} />
        </li>
      ))}
    </div>
  );
};

export default CategoryType;
