import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./MovieDetailView.css";

function MovieDetailView() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [trailerKey, setTrailerKey] = useState(null);
    const navigate = useNavigate();

    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

    useEffect(() => {
        async function fetchMovieDetails() {
            try {
                const movieResponse = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&include_adult=false`
                );

                setMovie(movieResponse.data);

                const trailerResponse = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&include_adult=false`
                );
                const trailers = trailerResponse.data.results.filter(
                    (video) => video.type === "Trailer" && video.site === "YouTube"
                );
                if (trailers.length > 0) {
                    setTrailerKey(trailers[0].key);
                }
            } catch (error) {
                console.error("Error fetching movie details or trailer:", error);
            }
        }

        fetchMovieDetails();
    }, [movieId, API_KEY]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div className="movie-detail-container">
            <button className="back-button" onClick={() => navigate(-1)}>
                Back
            </button>
            <div className="movie-detail-content">
                <img
                    className="movie-detail-poster"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                />
                <div className="movie-detail-info">
                    <h1>{movie.title}</h1>
                    <p className="movie-release-date"><strong>Release Date:</strong> {movie.release_date}</p>
                    <p className="movie-overview"><strong>Overview:</strong> {movie.overview}</p>
                    <p className="movie-rating"><strong>Rating:</strong> {movie.vote_average} / 10</p>
                    <p><strong>Genres:</strong> {movie.genres.map((genre) => genre.name).join(", ")}</p>
                    {trailerKey && (
                        <div className="movie-trailer">
                            <h2>Trailer</h2>
                            <iframe
                                width="560"
                                height="315"
                                src={`https://www.youtube.com/embed/${trailerKey}`}
                                title="Movie Trailer"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MovieDetailView;