import styled from "@emotion/styled";
import React, { Component } from "react";
import Cart from "./Cart";
import { LinkStyle } from "../Header";

class Overlay extends Component {
  render() {
    return (
      <StyledOverlay show={this.props.show}>
        <Cart
          cartItems={this.props.cartItems}
          symbol={this.props.symbol}
          total={this.props.total}
          handleAddQty={this.props.handleAddQty}
          handleSubQty={this.props.handleSubQty}
          handleRemove={this.props.handleRemove}
        />
        <button>
          <LinkStyle to="cart">VIEW BAG</LinkStyle>
        </button>
        <button>CHECKOUT</button>
      </StyledOverlay>
    );
  }
}

export default Overlay;

const StyledOverlay = styled.div((props) => ({
  display: props.show ? "block" : "none",
  position: "absolute",
  top: "50px",
  right: "-30px",
  backgroundColor: "#f1f1f1",
  minWidth: "160px",
  boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
  zIndex: 1,
}));
