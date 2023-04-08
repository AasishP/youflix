import React from "react";
import "./Nav.css";
import SearchBox from "./SearchBox";
import { Link } from "react-router-dom";
import logo from "../logo.png";

function Nav() {
  return (
    <nav>
      <Link to="/">
        <img className="main_logo" src={logo} alt="logo" />
      </Link>
      <SearchBox />
    </nav>
  );
}

export default Nav;
