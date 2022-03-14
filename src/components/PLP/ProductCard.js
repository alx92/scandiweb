import React, { Component } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import AttributeSet from "../PDP/AttributeSet";
import ProductOptions from "./ProductOptions";

/* 
  ------------- ProductCard Component -------------
*/

class ProductCard extends Component {
  render() {
    const { id, gallery, name, prices, inStock, attributes } =
      this.props.product;

    return (
      <CardLink to={`/${id}`}>
        <ProdContainer inStock={inStock}>
          <CardImageContainer>
            <img src={gallery[0]} alt={name} />
          </CardImageContainer>
          {!inStock ? (
            <strong className="out-of-stock">OUT OF STOCK</strong>
          ) : (
            ""
          )}

          <button>ADD</button>

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
      </CardLink>
    );
  }
}

export default ProductCard;

/* 
  ------------- Styled Components -------------
*/

const ProdContainer = styled.div((props) =>
  !props.inStock
    ? {
        "h3, h4": { paddingLeft: "25px" },

        opacity: "0.4",
        filter: "alpha(opacity=40)",
        boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.15)",
        padding: "5px",
        textDecoration: "none",

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
          backgroundColor: "#6dc93e",
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
        "h3, h4": { paddingLeft: "25px" },

        boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.15)",
        padding: "5px",
        textDecoration: "none",

        img: {
          objectFit: "contain",
          width: "100%",
          height: "100%",
        },

        position: "relative",

        button: {
          position: "absolute",
          backgroundColor: "#6dc93e",
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
  margin: "5px",
});

const CardLink = styled(Link)({
  textDecoration: "none",
  color: "black",
});
