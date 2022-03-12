import styled from "@emotion/styled";
import React, { Component } from "react";
import Cart from "./Cart";

class Overlay extends Component {
  render() {
    return (
      <StyledOverlay>
        <Cart
          cartItems={this.props.cartItems}
          symbol={this.props.symbol}
          total={this.props.total}
          handleAddQty={this.props.handleAddQty}
          handleSubQty={this.props.handleSubQty}
          handleRemove={this.props.handleRemove}
        />
        <button>VIEW BAG</button>
        <button>CHECKOUT</button>
      </StyledOverlay>
    );
  }
}

export default Overlay;

const StyledOverlay = styled.div({
  margin: "auto",
  width: "80%",
  margin: "20px 0",
  float: "right",
  background: "white",
  width: "320px",
  position: "relative",
  borderRadius: "3px",
  padding: "20px",
  ":after": {
    bottom: "100%",
    left: "89%",
    border: "solid transparent",
    content: '" "',
    height: 0,
    width: 0,
    position: "absolute",
    pointerEvents: "none",
    borderBottomColor: "white",
    borderWidth: "8px",
    marginLeft: "-8px",
  },
});
