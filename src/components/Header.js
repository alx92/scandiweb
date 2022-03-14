import styled from "@emotion/styled";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Overlay from "./Cart/Overlay";
import Currency from "./Currency/Currency";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  render() {
    return (
      <NavBar>
        <div className="left">
          <LinkStyle to="/">ALL</LinkStyle>
          <LinkStyle to="clothes">CLOTHES</LinkStyle>
          <LinkStyle to="tech">TECH</LinkStyle>
        </div>
        <div className="right">
          <Currency
            currencies={this.props.currencies}
            handleCurrencyChange={this.props.handleCurrencyChange}
          />
          <DropDown>
            <button onClick={() => this.setState({ show: !this.state.show })}>
              🛒 &#9660;<span className="badge">{this.props.badgeCount}</span>
            </button>
            <Overlay
              show={this.state.show}
              cartItems={this.props.cartItems}
              symbol={this.props.symbol}
              total={this.props.total}
              handleAddQty={this.props.handleAddQty}
              handleSubQty={this.props.handleSubQty}
              handleRemove={this.props.handleRemove}
            />
          </DropDown>
        </div>
      </NavBar>
    );
  }
}

export default Header;

const DropDown = styled.div({
  position: "relative",
  display: "inline-block",

  button: {
    background: "white",
    border: "none",
    boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.15)",
    marginLeft: "8px",
  },

  ".badge": {
    position: "absolute",
    top: "-15px",
    right: "-5px",
    padding: "3px 7px",
    borderRadius: "50%",
    background: "#6dc93e",
    color: "white",
  },
});

export const LinkStyle = styled(Link)({
  margin: "0px 5px",
  paddingLeft: "5px",
  textDecoration: "none",
  fontSize: "1em",
  color: "black",
  lineHeight: "0.8em",

  ":hover": {
    textDecoration: "underline",
    textUnderlineOffset: "20px",
    textDecorationThickness: "2px",
    color: "lightgreen",
  },
});

const NavBar = styled.nav({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: "solid 2px lightgreen",
  boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.15)",
  padding: "5px 30px",
  minHeight: 50,
  backgroundColor: "white",
  margin: "0px 60px 60px 60px",
});
