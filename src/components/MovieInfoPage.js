import React, { useEffect, useState } from "react";
import "./MovieInfoPage.css";
import tmdb from "../api/tmdb";
import yts from "../api/yts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faVideo } from "@fortawesome/free-solid-svg-icons";
import VideoPlayer from "./VideoPlayer";
import TorrentPicker from "./TorrentPicker";
import Skeleton from "./Skeleton";

function MovieInfoPage(props) {
  const movieID = props.match.params.id;
  const [loading, setLoading] = useState(true);
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
    const getMovieId = new Promise((resolve, reject) => {
      if (movieID.charAt(0) === "t") {
        tmdb
          .get(`find/${movieID}`, {
            params: {
              external_source: "imdb_id",
            },
          })
          .then((res) => {
            resolve(res.data.movie_results[0].id);
          });
      } else {
        resolve(movieID);
      }
    });

    getMovieId.then((movieId) => {
      tmdb.get(`movie/${movieId}`).then((res) => {
        setMovieDetails(res.data);
        yts
          .get(`/list_movies.json`, {
            params: {
              query_term: res.data.imdb_id, //we are querying the yts for movie details of the movie with imdbId which is res.data.imdb_id
            },
          })
          .then((res) => {
            const { rating, yt_trailer_code, torrents } =
              res.data.data?.movies[0];
            setMovieDetails((prevMovieDetails) => {
              return { ...prevMovieDetails, rating, yt_trailer_code, torrents }; //adding the extra details about the movie that we get from yts.
            });
            setActiveTorrent(torrents[0]);
            setLoading(false);
          });
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
            <h1 className="title">
              {loading ? (
                <Skeleton height={"1em"} width={"15em"} borderRadius={"5em"} />
              ) : (
                movieDetails.title
              )}
            </h1>

            <div className="movie_stats">
              {loading ? (
                <Skeleton height={"1.8em"} width={"4em"} borderRadius={"4px"} />
              ) : (
                <div className="age bordered">
                  {(movieDetails.adult && "18+") ||
                    (!movieDetails.adult && "PG-13")}
                </div>
              )}

              {loading ? (
                <Skeleton height={"1.8em"} width={"4em"} borderRadius={"4px"} />
              ) : (
                <div className="rating bordered">
                  IMDB {movieDetails.rating}
                </div>
              )}
              {loading ? (
                <Skeleton height={"1.8em"} width={"4em"} borderRadius={"4px"} />
              ) : (
                <div className="year">
                  {movieDetails.release_date?.slice(0, 4)}
                </div>
              )}

              {loading ? (
                <Skeleton height={"1.8em"} width={"4em"} borderRadius={"4px"} />
              ) : (
                <div className="runtime">
                  {parseInt(movieDetails.runtime / 60)}h{" "}
                  {parseInt(
                    movieDetails.runtime -
                      parseInt(movieDetails.runtime / 60) * 60
                  )}
                  m
                </div>
              )}
              <br />

              {loading ? (
                <Skeleton height={"1.8em"} width={"4em"} borderRadius={"4px"} />
              ) : (
                <div className="genres">
                  {movieDetails.genres?.reduce((genre_list, genre) => {
                    return genre_list + genre.name + ", ";
                  }, "")}
                </div>
              )}
            </div>

            {loading ? (
              <Skeleton height={"2em"} width="40em" borderRadius={"5em"} />
            ) : (
              <h1 className="tagline">{movieDetails.tagline}</h1>
            )}

            <div className="overview">
              <h1>Overview</h1>
              <p className="overview">
                {loading ? (
                  <>
                    <Skeleton
                      height={"0.8em"}
                      width={"20em"}
                      borderRadius={"1em"}
                      margin={"0.5em 0"}
                    />
                    <Skeleton
                      height={"0.8em"}
                      width={"20em"}
                      borderRadius={"1em"}
                      margin={"0.5em 0"}
                    />
                    <Skeleton
                      height={"0.8em"}
                      width={"20em"}
                      borderRadius={"1em"}
                      margin={"0.5em 0"}
                    />
                    <Skeleton
                      height={"0.8em"}
                      width={"20em"}
                      borderRadius={"1em"}
                      margin={"0.5em 0"}
                    />
                    <Skeleton
                      height={"0.8em"}
                      width={"10em"}
                      borderRadius={"1em"}
                      margin={"0.5em 0"}
                    />
                  </>
                ) : (
                  movieDetails.overview
                )}
              </p>
            </div>

            {!loading && (
              <button
                className="btn play_btn"
                onClick={() => {
                  showVideoPlayer("torrent");
                }}
              >
                <FontAwesomeIcon icon={faPlay} color="#E50914" /> Play
              </button>
            )}

            {!loading && (
              <button
                className="btn trailer_btn"
                onClick={() => {
                  showVideoPlayer("YouTube");
                }}
              >
                <FontAwesomeIcon icon={faVideo} color="#f2f2f2" /> Trailer
              </button>
            )}

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
