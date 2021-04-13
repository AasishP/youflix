import React, { useEffect } from "react";

function TorrentPlayer(props) {
  useEffect(() => {
    const webtor_player_sdk_script = document.createElement("script");
    webtor_player_sdk_script.src =
      "https://cdn.jsdelivr.net/npm/@webtor/player-sdk-js/dist/index.min.js";
    document.body.appendChild(webtor_player_sdk_script);
  }, []);
  return (
    <video
      src={`magnet:?xt=urn:btih:${props.torrent_hash}`}
      controls
      width="100%"
    ></video>
  );
}

export default TorrentPlayer;
