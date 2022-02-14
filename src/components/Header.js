import React from "react";

import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <div>
      <nav>
        <Link to="/">All</Link>
        <Link to="clothes">Clothes</Link>
        <Link to="tech">Tech</Link>
      </nav>
    </div>
  );
};

export default Header;
