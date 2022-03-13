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
        <button className="button1">
          <LinkStyle to="cart">VIEW BAG</LinkStyle>
        </button>
        <button className="button2">CHECKOUT</button>
      </StyledOverlay>
    );
  }
}

export default Overlay;

const StyledOverlay = styled.div((props) => ({
  ".button1": {
    backgroundColor: "white",
    color: "black",
    border: "2px solid black",
    padding: "13px 30px",
    textAlign: "center",
    textDecoration: "none",
    // display: "inline-block",
    fontSize: "12px",
    margin: "15px",
  },
  ".button2": {
    backgroundColor: "#6dc93e",
    color: "white",
    border: "none",
    padding: "15px 32px",
    textAlign: "center",
    textDecoration: "none",
    // display: "inline-block",
    fontSize: "12px",
  },
  display: props.show ? "block" : "none",
  position: "absolute",
  top: "50px",
  right: "-30px",
  boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.15)",
  background: "white",
  minWidth: "160px",
  boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
  zIndex: 1,
}));
