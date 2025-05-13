import { useEffect, useState } from "react";
import axios from "axios";
import "./Feature.css";

function Feature() {
  const [featuredMovies, setFeaturedMovies] = useState([]);

  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&include_adult=false`
        );
        const movies = response.data.results;

        const randomMovies = movies.sort(() => 0.5 - Math.random()).slice(0, 3);
        setFeaturedMovies(randomMovies);
      } catch (error) {
        console.error("Error fetching featured movies:", error);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div className="HeroExtention">
      <div className="Advert">Watch movies we did not steal!</div>
      <div className="HeroFeaturing">Featured Movies</div>
      <div className="featured-movies">
        {featuredMovies.map((movie) => (
          <div key={movie.id} className="featured-movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="featured-movie-poster"
            />
            <h3 className="featured-movie-title">{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feature;