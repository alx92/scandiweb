import React from "react";
import styled from "@emotion/styled";

const ProductDetail = ({ product }) => {
  const { id, name, gallery } = product;
  // console.log(gallery[0]);

  return (
    <ProdContainer>
      <p>{id}</p>
      <img width="300px" height="auto" src={gallery[0]} alt={name}></img>
      <h3>{name}</h3>
    </ProdContainer>
  );
};

export default ProductDetail;

const ProdContainer = styled.div`
  background-color: #2eab4f;
  border: 2px solid red;
`;
