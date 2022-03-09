import React, { Component } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

class ProductCard extends Component {
  render() {
    const { id, gallery, name, prices } = this.props.product;

    return (
      <ProdLink to={`/${id}`}>
        <ProdContainer>
          <h4>{id}</h4>
          <img src={gallery[0]} alt={name} />
          <h3>{name}</h3>
          <h4>
            {
              prices.find(
                (price) => price.currency.symbol === this.props.symbol
              ).currency.symbol
            }
            {
              prices.find(
                (price) => price.currency.symbol === this.props.symbol
              ).amount
            }
          </h4>
        </ProdContainer>
      </ProdLink>
    );
  }
}

export default ProductCard;

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
