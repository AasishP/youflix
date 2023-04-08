import React, { useState } from "react";
import "./SearchBox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSlidersH } from "@fortawesome/free-solid-svg-icons";
import useSearch from "../hooks/useSearch";
import { useHistory } from "react-router-dom";
import FilterBox from "./FilterBox";

function SearchBox() {
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState();
  const [searchOptions, setSearchOptions] = useSearch();
  const history = useHistory();

  function handleChange(e) {
    setSearchTerm(e.target.value);
  }

  function handleSearch(e) {
    e.preventDefault();
    history.push(
      `/search?queryTerm=${searchOptions.queryTerm}${
        searchOptions.genre ? "&genre=" + searchOptions.genre : ""
      }${searchOptions.quality ? "&quality=" + searchOptions.quality : ""}${
        searchOptions.sortBy ? "&sortBy=" + searchOptions.sortBy : ""
      }${searchOptions.orderBy ? "&orderBy=" + searchOptions.orderBy : ""}${
        searchOptions.page ? "&page=" + searchOptions.page : ""
      }`
    );
    setSearchOptions((prev) => {
      return {
        ...prev,
        queryTerm: searchTerm,
      };
    });
  }

  function handleFilterBtnClick() {
    setShowFilter((preValue) => !preValue);
  }

  return (
    <form className="search_box_container">
      <div className="search_box">
        <button type="submit" className="search_btn" onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} color="#f2f2f2" />
        </button>
        <input
          type="search"
          name="search"
          placeholder="I'm searching for... "
          onChange={handleChange}
        />
        <button
          className="filter_btn"
          type="button"
          onClick={handleFilterBtnClick}
        >
          <FontAwesomeIcon icon={faSlidersH} color="#f2f2f2" />
        </button>
      </div>
      {showFilter && <FilterBox />}
    </form>
  );
}

export default SearchBox;
