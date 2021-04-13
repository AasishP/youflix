import React, { useEffect, useState } from "react";
import "./MovieInfoPage.css";
import { useLocation } from "react-router-dom";
import tmdb from "../api/tmdb";
import yts from "../api/yts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faVideo } from "@fortawesome/free-solid-svg-icons";
import VideoPlayer from "./VideoPlayer";

function MovieInfoPage() {
  const movieID = useLocation().search.slice(1);
  const [movieDetails, setMovieDetails] = useState([]);
  const [VideoPlayerHidden, setVideoPlayerHidden] = useState(true);
  const [videoType, setVideoType] = useState();

  function showVideoPlayer(e) {
    e.target.classList.contains("play_btn") && setVideoType("torrent");
    e.target.classList.contains("trailer_btn") && setVideoType("YouTube");
    setVideoPlayerHidden(false);
  }
  function hideVideoPlayer() {
    setVideoPlayerHidden(true);
  }

  useEffect(() => {
    tmdb.get(`/movie/${movieID}`).then((res) => {
      setMovieDetails(res.data);
      yts
        .get(`/list_movies.json`, {
          params: {
            query_term: res.data.imdb_id,
          },
        })
        .then((res) => {
          const { rating, yt_trailer_code, torrents } = res.data.data.movies[0];
          setMovieDetails((prevMovieDetails) => {
            return { ...prevMovieDetails, rating, yt_trailer_code, torrents };
          });
        });
    });
  }, [movieID]);

  return (
    <div
      className="movie_info_page"
      onClick={(e) => {
        console.log("clicked");
        e.target.classList.contains("overlay") && hideVideoPlayer();
      }}
    >
      {!VideoPlayerHidden && (
        <VideoPlayer
          videoType={videoType}
          yt_trailer_code={movieDetails.yt_trailer_code}
          torrent_hash={movieDetails.torrents[0]?.hash}
          movie_title={movieDetails.title}
        />
      )}
      <div
        className="info_banner"
        style={
          movieDetails.backdrop_path && {
            backgroundImage: `url("https://www.themoviedb.org/t/p/original${movieDetails.backdrop_path}")`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }
        }
      >
        <div className="overlay">
          <img
            src={
              movieDetails.poster_path &&
              `https://www.themoviedb.org/t/p/w300${movieDetails.poster_path}`
            }
            alt={`${movieDetails.original_title}`}
            className="poster"
          />
          <div className="info_container">
            <h1 className="title">{movieDetails.title}</h1>
            <div className="movie_stats">
              <div className="age bodered">
                {(movieDetails.adult && "18+") ||
                  (!movieDetails.adult && "PG-13")}
              </div>
              <div className="rating bodered">IMDB {movieDetails.rating}</div>
              <div className="year">
                {movieDetails.release_date?.slice(0, 4)}
              </div>
              <div className="runtime">
                {parseInt(movieDetails.runtime / 60)}h{" "}
                {parseInt(
                  movieDetails.runtime -
                    parseInt(movieDetails.runtime / 60) * 60
                )}
                m
              </div>
              <br />
              <div className="genres">
                {movieDetails.genres?.reduce((genre_list, genre) => {
                  return genre_list + genre.name + ", ";
                }, "")}
              </div>
            </div>
            <h1 className="tagline">{movieDetails.tagline}</h1>
            <div className="overview">
              <h1>Overview</h1>
              <p className="overview">{movieDetails.overview}</p>
            </div>
            <div className="btn play_btn" onClick={showVideoPlayer}>
              <FontAwesomeIcon icon={faPlay} color="#E50914" /> Play
            </div>
            <div className="btn trailer_btn" onClick={showVideoPlayer}>
              <FontAwesomeIcon icon={faVideo} color="#f2f2f2" /> Trailer
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieInfoPage;
