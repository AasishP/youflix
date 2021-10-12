import React from "react";
import TorrentPlayer from "./TorrentPlayer";
import YouTubePlayer from "./YouTubePlayer";

function VideoPlayer(props) {
  return (
    <div
      className="video_player_overlay"
      style={{
        height: "100vh",
        width: "100vw",
        position: "fixed",
        zIndex: "20",
        background: "#000000EA",
      }}
    >
      <div
        className="video_player"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          zIndex: "10",
          transform: "translate(-50%,-50%)",
          width: "80vw",
          height: "45vw",
        }}
      >
        {props.videoType === "YouTube" && (
          <YouTubePlayer yt_trailer_code={props.yt_trailer_code} />
        )}
        {props.videoType === "torrent" && (
          <TorrentPlayer
            movie_title={props.movie_title}
            torrent_hash={props.torrent_hash}
          />
        )}
      </div>
    </div>
  );
}

export default VideoPlayer;
