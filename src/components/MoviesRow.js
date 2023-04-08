import React, { useState, useEffect, useCallback } from "react";
import "./MoviesRow.css";
import { Link } from "react-router-dom";
import tmdb, { tmdbImageBaseUrl } from "../api/tmdb";
import useSearch from "../hooks/useSearch";

function MoviesRow(props) {
  const [searchOptions] = useSearch();
  const [movies, setMovies] = useState([]);

  const getMovies = useCallback(
    async (title, genre_id) => {
      let movies;
      switch (title) {
        case "Popular":
          movies = (
            await tmdb.get("/discover/movie", {
              params: {
                sort_by: "popularity.desc",
              },
            })
          ).data.results;
          break;
        case "Trending":
          movies = (await tmdb.get("/trending/movie/day")).data.results;
          break;
        case "Results":
          movies = (
            await tmdb.get("/search/movie", {
              params: { query: searchOptions.query },
            })
          ).data.results;
          break;
        default:
          movies = (
            await tmdb.get("/discover/movie", {
              params: {
                with_genres: genre_id,
              },
            })
          ).data.results;
      }
      return movies;
    },
    [searchOptions]
  );

  useEffect(() => {
    getMovies(props.title, props.genre_id).then((result) => {
      setMovies(result);
    });
  }, [props.genre_id, props.title,getMovies]);

  return (
    <div className="movies_row" id={props.title}>
      <h1 className="title">{props.title}</h1>
      <div
        className="posters_container"
        style={
          (props.title === "Results" && {
            flexWrap: "wrap",
            justifyContent: "center",
          }) ||
          (props.title !== "Results" && {})
        }
      >
        {movies.map((movie) => {
          if (movie.poster_path == null) {
            return "";
          }
          return (
            <Link
              key={movie.id}
              to={{
                pathname: `/MovieInfo/${movie.id}`,
              }}
            >
              <img
                className="poster"
                src={`${tmdbImageBaseUrl}/w200${movie.poster_path}`}
                alt={`${tmdbImageBaseUrl}/w200${movie.poster_path}`}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default MoviesRow;
