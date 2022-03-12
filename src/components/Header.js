import styled from "@emotion/styled";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Overlay from "./Cart/Overlay";
import Currency from "./Currency/Currency";

class Header extends Component {
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
          <LinkStyle to="/cart">
            🛒<span>7</span>
          </LinkStyle>
        </div>
      </NavBar>
    );
  }
}

export default Header;

const LinkStyle = styled(Link)({
  margin: "0px 5px",
  textDecoration: "none",
  fontSize: "1em",
  lineHeight: "0.8em",
  ":active": {
    color: "lightgreen",
  },
  position: "relative",
  span: {
    position: "absolute",
    top: "-15px",
    right: "-25px",
    padding: "3px 7px",
    borderRadius: "50%",
    background: "black",
    color: "white",
  },
});

const NavBar = styled.nav({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: `solid 2px lightgreen`,
  boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.15)",
  padding: "5px 30px",
  minHeight: 50,
  backgroundColor: "white",
  margin: "0px 60px 60px 60px",
});
