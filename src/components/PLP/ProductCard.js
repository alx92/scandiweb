import React, { Component } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

class ProductCard extends Component {
  render() {
    const { id, gallery, name, prices } = this.props.product;

    return (
      <ProdLink to={`/${id}`}>
        <ProdContainer>
          <CardImageContainer>
            <img src={gallery[0]} alt={name} />
          </CardImageContainer>
          <button onClick={(e) => e.preventDefault()}>Add</button>
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
  // backgroundColor: "#2eab4f",
  // border: "2px solid red",
  boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.15)",
  padding: "5px",
  // display: "flex",
  gridTemplateRows: "max-content 200px 1fr",
  img: {
    objectFit: "contain",
    width: "100%",
    height: "100%",
  },
});

const CardImageContainer = styled.div({
  height: 300,
  position: "relative",
  // boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.15)",
  backgroundColor: "white",
  margin: "5px",
  "::after": {
    content: '""',
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

const ProdLink = styled(Link)({
  textDecoration: "none",
  cursor: "pointer",
});
