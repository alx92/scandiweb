import React, { Component } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import { LinkStyle } from "../Header";

class ProductCard extends Component {
  render() {
    const { id, gallery, name, prices, inStock } = this.props.product;
    console.log(this.props.product);

    return (
      <LinkStyle to={`/${id}`}>
        <ProdContainer inStock={inStock}>
          <CardImageContainer>
            <img src={gallery[0]} alt={name} />
          </CardImageContainer>
          {!inStock ? (
            <strong className="out-of-stock">OUT OF STOCK</strong>
          ) : (
            ""
          )}
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
      </LinkStyle>
    );
  }
}

export default ProductCard;

const ProdContainer = styled.div((props) =>
  !props.inStock
    ? {
        opacity: "0.4",
        filter: "alpha(opacity=40)",
        boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.15)",
        padding: "5px",
        // gridTemplateRows: "max-content 150px 1fr",
        img: {
          objectFit: "contain",
          width: "100%",
          height: "100%",
        },
        position: "relative",
        ".out-of-stock": {
          position: "absolute",
          top: "35%",
          right: "35%",
          fontSize: "1.5em",
          fontWeight: "400",
        },
        button: {
          position: "absolute",
          backgroundColor: "lightgreen",
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
      }
    : {
        boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.15)",
        padding: "5px",
        // gridTemplateRows: "max-content 150px 1fr",
        img: {
          objectFit: "contain",
          width: "100%",
          height: "100%",
        },
        position: "relative",
        button: {
          position: "absolute",
          backgroundColor: "lightgreen",
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
      }
);

const CardImageContainer = styled.div({
  height: 300,
  position: "relative",
  // boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.15)",
  margin: "5px",
});

// const ProdLink = styled(Link)({
//   textDecoration: "none",
//   cursor: "pointer",
// });
