import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSlidersH } from "@fortawesome/free-solid-svg-icons";

function SearchBox() {
  const [searchInputValue, setSearchInputValue] = useState();

  function handleChange(e) {
    setSearchInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    window.location.href = `/youflix?search=${searchInputValue}`;
  }

  return (
    <form className="search_box" onSubmit={handleSubmit}>
      <button type="submit" className="search_btn">
        <FontAwesomeIcon icon={faSearch} color="#f2f2f2" />
      </button>
      <input
        type="search"
        name="search"
        placeholder="I'm searching for... "
        onChange={handleChange}
      />
      <button className="filter_btn">
        <FontAwesomeIcon icon={faSlidersH} color="#f2f2f2" />
      </button>
    </form>
  );
}

export default SearchBox;
