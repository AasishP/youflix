import React, { useState, useEffect, useCallback } from "react";
import "./MoviesRow.css";
import useSearch from "../hooks/useSearch";
import yts from "../api/yts";
import { Link } from "react-router-dom";

function SearchResultsPage(props) {
  const [searchOptions] = useSearch();
  const [loading, setLoading] = useState(true);
  const [movieCount, setMovieCount] = useState(0);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const getMovies = useCallback(async () => {
    const movies = await yts
      .get(`/list_movies.json`, {
        params: {
          page,
          quality: searchOptions.quality,
          query_term: searchOptions.queryTerm,
          genre: searchOptions.genre,
          sort_by: searchOptions.sortBy,
          order_by: searchOptions.orderBy,
        },
      })
      .then((res) => {
        return res.data.data;
      });
    return movies;
  }, [searchOptions, page]);

  useEffect(() => {
    getMovies().then((result) => {
      console.log(result);
      setMovies(result.movies);
      setMovieCount(result.movie_count);
      setLoading(false);
    });
  }, [getMovies]);

  return (
    <div className="movies_row">
      <h1 className="title">Search Results</h1>
      <div
        className="posters_container"
        style={{
          flexWrap: "wrap",
          justifyContent:"space-evenly",
        }}
      >
        {movies.map((movie) => {
          return (
            <Link
              key={movie.imdb_code}
              to={{
                pathname: `/MovieInfo/${movie.imdb_code}`,
              }}
            >
              <img
                className="poster"
                src={movie.medium_cover_image}
                alt={movie.medium_cover_image}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default SearchResultsPage;
