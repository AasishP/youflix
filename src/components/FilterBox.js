import React, { useEffect, useState } from "react";
import "./FilterBox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import useSearch from "../hooks/useSearch";
import { Link, useHistory } from "react-router-dom";

function snakeCaseToCapitalize(str) {
  return str.split(/[_-]/).reduce((acc, val) => {
    return acc + " " + val.charAt(0).toUpperCase() + val.slice(1);
  }, "");
}

function FilterItems({ label, options, value, setValue }) {
  function handleChange(e) {
    setValue(e.target.value);
  }
  return (
    <div className="filter_items">
      <label htmlFor={label}>{label}</label>
      <div className="custom_select">
        <select name={label} id={label} value={value} onChange={handleChange}>
          <option selected="true" disabled="disabled">
            Select
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {snakeCaseToCapitalize(option)}
            </option>
          ))}
        </select>
        <span class="custom_arrow"></span>
      </div>
    </div>
  );
}

function FilterBox() {
  const [searchOptions, setSearchOptions] = useSearch();
  const [genre, setGenre] = useState();
  const [quality, setQuality] = useState();
  const [sortBy, setSortBy] = useState();
  const [orderBy, setOrderBy] = useState();
  const history = useHistory();

  useEffect(() => {
    setSearchOptions((prev) => {
      return {
        ...prev,
        genre,
        quality,
        sortBy,
        orderBy,
      };
    });
  }, [genre, quality, sortBy, orderBy, setSearchOptions]);

  function handleFilterBtnClick(e) {
    e.preventDefault();
    if (searchOptions.queryTerm || genre || sortBy || orderBy || quality)
      history.push(
        `/search?queryTerm=${searchOptions.queryTerm}${
          searchOptions.genre ? "&genre=" + searchOptions.genre : ""
        }${searchOptions.quality ? "&quality=" + searchOptions.quality : ""}${
          searchOptions.sortBy ? "&sortBy=" + searchOptions.sortBy : ""
        }${searchOptions.orderBy ? "&orderBy=" + searchOptions.orderBy : ""}${
          searchOptions.page ? "&page=" + searchOptions.page : ""
        }`
      );
  }

  return (
    <div className="filter_container">
      <FilterItems
        label="Genre"
        options={[
          "all",
          "action",
          "adventure",
          "animation",
          "biography",
          "comedy",
          "crime",
          "documentary",
          "drama",
          "family",
          "fantasy",
          "film-noir",
          "game-show",
          "history",
          "horror",
          "music",
          "musical",
          "mystery",
          "news",
          "reality-tv",
          "romance",
          "sci-fi",
          "sport",
          "talk-show",
          "thriller",
          "war",
          "western",
        ]}
        value={genre}
        setValue={setGenre}
      />
      <FilterItems
        label="Quality"
        options={["720p", "1080p", "2160p", "3D"]}
        value={quality}
        setValue={setQuality}
      />
      <FilterItems
        label="Sort By"
        options={[
          "title",
          "year",
          "rating",
          "peers",
          "seeds",
          "download_count",
          "like_count",
          "date_added",
        ]}
        value={sortBy}
        setValue={setSortBy}
      />
      <FilterItems
        label="Order By"
        options={["asc", "desc"]}
        value={orderBy}
        setValue={setOrderBy}
      />
      <button className="search_btn" onClick={handleFilterBtnClick}>
        <FontAwesomeIcon icon={faSearch} color="#f2f2f2" />
      </button>
    </div>
  );
}

export default FilterBox;
