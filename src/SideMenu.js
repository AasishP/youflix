import React from "react";
import "./SideMenu.css";

function SideMenu() {
  return (
    <div className="side-menu">
      <input type="checkbox" id="menu-toggle" />
      <button>Home</button>
      <button>Movies</button>
    </div>
  );
}

export default SideMenu;
