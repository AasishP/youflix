import axios from "axios";

export const tmdbImageBaseUrl = "https://image.tmdb.org/t/p";
const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZmU4ZmJkYjI0NTczNjU1NTczMTc0N2UwMzk0OTdiYiIsInN1YiI6IjYwNmM3NjUwZTFhZDc5MDAyOTYwNDQ3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZEi4_OuDuMhhxf0Fl5Xu1ovr7D9fjkcLG7FmNmoFH0A",
  },
});
export default tmdb;
