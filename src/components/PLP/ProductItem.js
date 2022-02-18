import React from "react";
import styled from "@emotion/styled";
import Price from "../Price";
import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
  const { id, name, gallery, prices } = product;
  // console.log(gallery[0]);

  return (
    <ProdLink to={`/${id}`}>
      <ProdContainer>
        <h4>{id}</h4>

        <img src={gallery[0]} alt={name} />

        <h3>{name}</h3>
        <h4>
          {prices[0].currency.symbol}
          {prices[0].amount}
        </h4>
      </ProdContainer>
    </ProdLink>
  );
};

export default ProductItem;

const ProdContainer = styled.div({
  backgroundColor: "#2eab4f",
  border: "2px solid red",
  img: {
    objectFit: "cover",
    width: "50%",
    height: "50%",
  },
});

const ProdLink = styled(Link)({});
