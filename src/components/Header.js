import React, { useState, useEffect } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faVideo } from "@fortawesome/free-solid-svg-icons";
import tmdb,{tmdbImageBaseUrl} from "../api/tmdb";
import {getMovieGenres} from "../genres";

function Header() {

  const [movie, setMovie] = useState([]);

  async function getRandomMovie() {
    const randomMovie = (await tmdb.get("/trending/movie/day")).data.results[
      Math.floor(Math.random() * 20)
    ];
    return randomMovie;
  }
  useEffect(() => {
    getRandomMovie().then((randomMovie) => {
      const genres_list = getMovieGenres(randomMovie);
      setMovie({ ...randomMovie, genres_list });
    });
  }, []);

  return (
    <div
      className="header"
      style={
        movie.backdrop_path && {
          backgroundImage: `url(${tmdbImageBaseUrl}/original${movie.backdrop_path})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }
      }
    >
      <div className="overlay">
        <div className="top_fading_overlay"></div>
        <h1 className="movie_title">{movie.title}</h1>
        <div className="movie_info_container">
          <span className="year">
            {movie.release_date && movie.release_date.slice(0, 4)}
          </span>
          <span className="age">
            {(movie.adult && "18+") || (!movie.adult && "PG")}
          </span>
          <span className="rating">IMDB {movie.vote_average}</span>
          <span className="length">1 h 56 min</span>
          <div className="genres_list">{movie.genres_list}</div>
        </div>
        <p className="movie_discription">{movie.overview}</p>
        <button className="primary_btn play_btn">
          <FontAwesomeIcon icon={faPlay} color="#E50914" /> Play
        </button>
        <button className="primary_btn">
          <FontAwesomeIcon icon={faVideo} color="#f2f2f2" />
          Trailer
        </button>
      </div>
    </div>
  );
}

export default Header;
