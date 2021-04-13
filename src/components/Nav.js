import React from "react";
import "./Nav.css";
import logo from "../logo.png";
import SearchBox from "./SearchBox";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <Link to="/">
        <img
          className="main_logo"
          src="https://fontmeme.com/permalink/210409/49a262482b7f208eb930a793192d2947.png"
          // src={logo}
          alt="logo"
        />
      </Link>
      <SearchBox />
    </nav>
  );
}

export default Nav;
