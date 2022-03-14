import styled from "@emotion/styled";
import React, { Component } from "react";
import Cart from "./Cart";
import { LinkStyle } from "../Header";

class Overlay extends Component {
  render() {
    return (
      <StyledOverlay show={this.props.show}>
        <StyledCart>
          <Cart
            cartItems={this.props.cartItems}
            symbol={this.props.symbol}
            total={this.props.total}
            handleAddQty={this.props.handleAddQty}
            handleSubQty={this.props.handleSubQty}
            handleRemove={this.props.handleRemove}
          />
          <Buttons>
            <button id="button1">
              <LinkStyle to="cart">VIEW BAG</LinkStyle>
            </button>
            <button id="button2">CHECKOUT</button>
          </Buttons>
        </StyledCart>
      </StyledOverlay>
    );
  }
}

export default Overlay;

const StyledCart = styled.div({
  margin: "0px 60px 60px 60px",
});
const Buttons = styled.div({
  // justifyContent: "space-between",
  display: "flex",
});

const StyledOverlay = styled.div((props) => ({
  "#button1": {
    backgroundColor: "white",
    color: "black",
    border: "2px solid black",
    padding: "10px 30px",
    textAlign: "center",
    textDecoration: "none",
    fontSize: "12px",
    transitionDuration: "0.4s",
    whiteSpace: "nowrap",
  },
  "#button1:hover": {
    backgroundColor: "#6dc93e",
    color: "white",
  },
  "#button2": {
    backgroundColor: "#6dc93e",
    color: "white",
    border: "none",
    padding: "10px 30px",
    textAlign: "center",
    textDecoration: "none",
    fontSize: "12px",
    whiteSpace: "nowrap",
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
