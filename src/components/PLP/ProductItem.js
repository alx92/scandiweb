import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

class ProductItem extends React.Component {
  render() {
    return (
      <ProdLink to={`/${this.props.product.id}`}>
        <ProdContainer>
          <h4>{this.props.product.id}</h4>

          <img
            src={this.props.product.gallery[0]}
            alt={this.props.product.name}
          />

          <h3>{this.props.product.name}</h3>
          <h4>
            {this.props.product.prices[0].currency.symbol}
            {this.props.product.prices[0].amount}
          </h4>
        </ProdContainer>
      </ProdLink>
    );
  }
}

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
