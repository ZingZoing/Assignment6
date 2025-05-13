import axios from "axios";
import { useState, useEffect } from "react";
import "./MovieTileView.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";

function MovieTileView() {
  const { genre } = useParams();
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  useEffect(() => {
    async function getData() {
      try {
        let url;

        if (genre) {

          url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genre}&include_adult=false`;
        } else if (location.pathname.includes("now_playing")) {
          url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&include_adult=false`;
        } else if (location.pathname.includes("popular")) {
          url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&include_adult=false`;
        } else if (location.pathname.includes("top_rated")) {
          url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&include_adult=false`;
        } else if (location.pathname.includes("upcoming")) {
          url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&include_adult=false`;
        }

        const response = await axios.get(url);
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }

    getData();
  }, [genre, location.pathname]);

  return (
    <div className="movie-container">
      {movies.map((movie) => (
        <div
          className="movie-card"
          key={movie.id}
          onClick={() => navigate(`/movies/${movie.id}`)}
        >
          <h1>{movie.title}</h1>
          <img
            className="movie-poster"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
      ))}
    </div>
  );
}

export default MovieTileView;