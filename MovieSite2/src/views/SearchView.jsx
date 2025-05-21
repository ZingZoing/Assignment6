import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import "./SearchView.css";

function SearchView() {
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Access currentPage and setCurrentPage from MoviesView via Outlet context
  const { currentPage } = useOutletContext();

  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  useEffect(() => {
    async function fetchSearchResults() {
      try {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${currentPage}&include_adult=false`;
        const response = await axios.get(url);
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }

    if (query) {
      fetchSearchResults();
    }
  }, [query, currentPage]); // Use currentPage from MoviesView

  return (
    <div className="search-results-container">
      <h1>Search Results for "{query}"</h1>
      <div className="movie-grid">
        {movies.map((movie) => (
          <div
            className="movie-card"
            key={movie.id}
            onClick={() => navigate(`/movies/${movie.id}`)}
          >
            <h2>{movie.title}</h2>
            <img
              className="movie-poster"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchView;