import styled from "@emotion/styled";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Currency from "./Currency/Currency";

class Header extends Component {
  render() {
    return (
      <div>
        <nav>
          <div className="left">
            <LinkStyle to="/">All</LinkStyle>
            <LinkStyle to="clothes">Clothes</LinkStyle>
            <LinkStyle to="tech">Tech</LinkStyle>
          </div>
          <div className="right">
            <LinkStyle to="/cart">Cart</LinkStyle>
            <Currency
              currencies={this.props.currencies}
              handleCurrencyChange={this.props.handleCurrencyChange}
            />
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;

const LinkStyle = styled(Link)({
  marginRight: "5px",
});
