import React from "react";
import Header from "./Header";
import MoviesRow from "./MoviesRow";
import genres from "../genres";
import { useLocation } from "react-router";

function Home() {
  const searchTerm = useLocation().search.substring(8);

  return (
    <>
      {/*To Display Search Results when searchTerm exist */}
      {searchTerm && <MoviesRow title="Results" query={searchTerm} />}

      {/*To show other components when searchTerm doesnot exist */}
      {!searchTerm && (
        <>
          <Header />
          <MoviesRow title="Trending" genre_id={28} />
          <MoviesRow title="Popular" genre_id={12} />
          {genres.map((genre) => {
            return (
              <MoviesRow
                title={genre.name}
                genre_id={genre.id}
                key={genre.id}
              />
            );
          })}
        </>
      )}
    </>
  );
}

export default Home;
