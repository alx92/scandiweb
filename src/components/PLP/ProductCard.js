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
  // border: "2px solid red",
  boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.15)",
  padding: "5px",
  gridTemplateRows: "max-content 200px 1fr",
  img: {
    objectFit: "contain",
    width: "100%",
    height: "100%",
  },
  position: "relative",
  button: {
    position: "absolute",
    backgroundColor: "#4CAF50",
    border: "none",
    color: "white",
    padding: "10px 10px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    borderRadius: "50%",
    bottom: "70px",
    right: "25px",
  },
});

const CardImageContainer = styled.div({
  height: 300,
  position: "relative",
  // boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.15)",
  margin: "5px",
});

const ProdLink = styled(Link)({
  textDecoration: "none",
  cursor: "pointer",
});
