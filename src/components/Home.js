import React from "react";
import Header from "./Header";
import MoviesRow from "./MoviesRow";
import genres from "../genres";
function Home() {
  return (
    <div className="home">
      <Header />
      <MoviesRow title="Popular" genre_id={12} />
      <MoviesRow title="Trending" genre_id={28} />
      {genres.map((genre) => {
        return (
          <MoviesRow title={genre.name} genre_id={genre.id} key={genre.id} />
        );
      })}
    </div>
  );
}

export default Home;
