import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <nav>
        <div className="left">
          <LinkStyle to="/">All</LinkStyle>
          <LinkStyle to="clothes">Clothes</LinkStyle>
          <LinkStyle to="tech">Tech</LinkStyle>
        </div>
        <div className="right">

        </div>
      </nav>
    </div>
  );
};

export default Header;

const LinkStyle = styled(Link)({
  marginRight: "5px",
});
