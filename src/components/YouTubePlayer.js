import React from 'react'

function YouTubePlayer(props) {
    return (
      <>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${props.yt_trailer_code}`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </>
    );
}

export default YouTubePlayer
