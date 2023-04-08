import React from "react";
import Header from "./Header";
import MoviesRow from "./MoviesRow";
import genres from "../genres";

function Home() {
  return (
    <>
      <Header />
      <MoviesRow title="Trending" genre_id={28} />
      <MoviesRow title="Popular" genre_id={12} />
      {genres.map((genre) => {
        return (
          <MoviesRow title={genre.name} genre_id={genre.id} key={genre.id} />
        );
      })}
    </>
  );
}

export default Home;
