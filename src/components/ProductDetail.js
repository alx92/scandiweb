import React from "react";

const ProductDetail = ({ product }) => {
  const { id, name } = product;

  return (
    <div>
      <p>{id}</p>
      <h3>{name}</h3>
    </div>
  );
};

export default ProductDetail;
