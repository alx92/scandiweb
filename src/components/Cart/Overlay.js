import styled from "@emotion/styled";
import React, { Component } from "react";
import Cart from "./Cart";
import { Link } from "react-router-dom";

/* 
  ------------- Overlay Component -------------
*/

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
              <StyledLink to="cart">VIEW BAG</StyledLink>
            </button>
            <button id="button2">CHECKOUT</button>
          </Buttons>
        </StyledCart>
      </StyledOverlay>
    );
  }
}

export default Overlay;

/* 
  ------------- Styled Components -------------
*/

const StyledLink = styled(Link)({
  margin: "0px 5px",
  paddingLeft: "5px",
  textDecoration: "none",
  fontSize: "1em",
  color: "black",
  lineHeight: "0.8em",
});

const StyledCart = styled.div({
  margin: "0px 60px 60px 60px",
});
const Buttons = styled.div({
  display: "flex",
});

const StyledOverlay = styled.div((props) => ({
  "#button1:hover": {
    backgroundColor: "#6dc93e",
    color: "white",
  },

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
  background: "white",
  minWidth: "160px",
  boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
  zIndex: 1,
}));
