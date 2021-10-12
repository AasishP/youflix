import React, { useEffect, useState } from "react";
import "./MovieInfoPage.css";
import tmdb from "../api/tmdb";
import yts from "../api/yts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faVideo } from "@fortawesome/free-solid-svg-icons";
import VideoPlayer from "./VideoPlayer";
import TorrentPicker from "./TorrentPicker";

function MovieInfoPage(props) {
  const movieID = props.match.params.id;
  const [movieDetails, setMovieDetails] = useState([]);
  const [VideoPlayerHidden, setVideoPlayerHidden] = useState(true);
  const [videoType, setVideoType] = useState([]);
  const [activeTorrent, setActiveTorrent] = useState([]);

  function showVideoPlayer(type) {
    setVideoType(type);
    setVideoPlayerHidden(false); //set videoPlayerHidden to false to show the video player when we click on play/trailer button or torrentQuality selector.
  }
  function hideVideoPlayer() {
    setVideoPlayerHidden(true); //this will hide the video player.
  }

  useEffect(() => {
    tmdb.get(`/movie/${movieID}`).then((res) => {
      setMovieDetails(res.data);
      yts
        .get(`/list_movies.json`, {
          params: {
            query_term: res.data.imdb_id, //we are quering the yts for movie details of the movie with imdbId which is res.data.imdb_id
          },
        })
        .then((res) => {
          const {
            rating,
            yt_trailer_code,
            torrents,
          } = res.data.data?.movies[0];
          setMovieDetails((prevMovieDetails) => {
            return { ...prevMovieDetails, rating, yt_trailer_code, torrents }; //adding the extra details about the movie that we get from yts.
          });
          setActiveTorrent(torrents[0]);
        });
    });
  }, [movieID]);

  return (
    <div
      className="movie_info_page"
      onClick={(e) => {
        e.target.classList.contains("video_player_overlay") &&
          hideVideoPlayer();
      }}
    >
      {!VideoPlayerHidden && (
        <VideoPlayer
          videoType={videoType}
          yt_trailer_code={movieDetails.yt_trailer_code}
          torrent_hash={activeTorrent?.hash}
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
              (movieDetails.poster_path &&
                `https://www.themoviedb.org/t/p/w300${movieDetails.poster_path}`) ||
              (!movieDetails.poster_path &&
                "https://placeholder.pics/svg/300x441/C8C8C8/C8C8C8-C8C8C8")
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
            <button
              className="btn play_btn"
              onClick={() => {
                showVideoPlayer("torrent");
              }}
            >
              <FontAwesomeIcon icon={faPlay} color="#E50914" /> Play
            </button>
            <button
              className="btn trailer_btn"
              onClick={() => {
                showVideoPlayer("YouTube");
              }}
            >
              <FontAwesomeIcon icon={faVideo} color="#f2f2f2" /> Trailer
            </button>
            <TorrentPicker
              torrents={movieDetails.torrents}
              setActiveTorrent={setActiveTorrent}
              showVideoPlayer={showVideoPlayer}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieInfoPage;
