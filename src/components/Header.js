import styled from "@emotion/styled";
import React from "react";

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <nav>
        <LinkStyle to="/">All</LinkStyle>
        <LinkStyle to="clothes">Clothes</LinkStyle>
        <LinkStyle to="tech">Tech</LinkStyle>
      </nav>
    </div>
  );
};

export default Header;

const LinkStyle = styled(Link)({
  marginRight: "5px",
});
