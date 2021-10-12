import React from "react";

export default function TorrentPicker(props) {
  function playSelectedTorrent(index) {
    props.setActiveTorrent(props?.torrents[index]);
    console.log(props?.torrents[index]);
    props.showVideoPlayer("torrent");
  }
  return (
    <div
      className="torrent__picker"
      style={{
        display: "flex",
        margin:"1.5em"
      }}
    >
      {props.torrents?.map((torrent, index) => {
        return (
          <button
            key={index}
            className="torrent_btn"
            style={{
              background: "transparent",
              color: "white",
              border: "2px solid white",
              borderRadius: "5px",
              padding: "0.5em",
              margin: "0 1em",
              cursor: "pointer",
            }}
            onClick={() => {
              playSelectedTorrent(index);
            }}
          >
            {torrent.type.toUpperCase()} {torrent.quality}
          </button>
        );
      })}
    </div>
  );
}
