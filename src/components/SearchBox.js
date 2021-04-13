import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSlidersH } from "@fortawesome/free-solid-svg-icons";

function SearchBox() {
  return (
    <div className="search_box">
      <button className="search_btn">
        <FontAwesomeIcon icon={faSearch} color="#f2f2f2" />
      </button>
      <input type="search" name="search" placeholder="I'm searching for... " />
      <button className="filter_btn">
        <FontAwesomeIcon icon={faSlidersH} color="#f2f2f2" />
      </button>
    </div>
  );
}

export default SearchBox;
