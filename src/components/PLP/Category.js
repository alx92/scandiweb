import React from "react";
import ProductItem from "./ProductItem";
import styled from "@emotion/styled";

const Category = ({ categories }) => {
  const { name, products } = categories;

  return (
    <CategoryContainer>
      <h1>{name.toUpperCase()}</h1>
      {products?.map((prod) => (
        <div key={prod.id}>
          <ProductItem product={prod} />
        </div>
      ))}
    </CategoryContainer>
  );
};

export default Category;

const CategoryContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  border: "4px solid black",
});
