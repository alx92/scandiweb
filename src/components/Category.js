import React from "react";
import ProductDetail from "./ProductDetail";

//------ Route/Cat -------

const Category = ({ categories }) => {
  const { name, products } = categories;

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

export default Category;
