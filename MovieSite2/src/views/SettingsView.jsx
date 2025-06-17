import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import genres from "../../components/Genres"; // Import the genres list
import axios from "axios";
import "./SettingsView.css";

function SettingsView() {
  const navigate = useNavigate();
  const { user, updateFirstName, updateLastName, updatePreferredGenres, purchases } = useContext(UserContext);

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [preferredGenres, setPreferredGenres] = useState(user?.genres || []);
  const [purchasedMovies, setPurchasedMovies] = useState([]);

  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  // Fetch purchased movie details
  useEffect(() => {
    async function fetchPurchasedMovies() {
      if (!purchases || purchases.length === 0) {
        setPurchasedMovies([]);
        return;
      }
      try {
        const moviePromises = purchases.map((id) =>
          axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
        );
        const responses = await Promise.all(moviePromises);
        setPurchasedMovies(responses.map((res) => res.data));
      } catch (error) {
        setPurchasedMovies([]);
      }
    }
    fetchPurchasedMovies();
  }, [purchases, API_KEY]);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleGenreChange = (e) => {
    const genreId = e.target.value;
    if (e.target.checked) {
      setPreferredGenres((prev) => [...prev, genreId]);
    } else {
      setPreferredGenres((prev) => prev.filter((id) => id !== genreId));
    }
  };

  const handleSave = () => {
    updateFirstName(firstName);
    updateLastName(lastName);
    updatePreferredGenres(preferredGenres);
    alert("Profile updated successfully!");
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <p>Manage your account settings here.</p>
      <div className="form2-group">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={handleFirstNameChange}
        />
      </div>
      <div className="form2-group">
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={handleLastNameChange}
        />
      </div>
      <div className="form2-group">
        <label>Preferred Genres:</label>
        <div className="genre-checkboxes">
          {genres.map((genre) => (
            <div key={genre.id} className="checkbox-group">
              <input
                type="checkbox"
                id={`genre-${genre.id}`}
                value={genre.id}
                checked={preferredGenres.includes(String(genre.id))}
                onChange={handleGenreChange}
              />
              <label htmlFor={`genre-${genre.id}`}>{genre.name}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="settings-buttons-group">
        <button className="settings-action-button" onClick={handleSave}>
          Save Changes
        </button>
        <button className="settings-action-button" onClick={() => navigate("/movies/now_playing")}>
          Back to Movies
        </button>
      </div>

      <h2 style={{ marginTop: "40px" }}>Your Purchased Movies</h2>
      {purchasedMovies.length === 0 ? (
        <p>You have not purchased any movies yet.</p>
      ) : (
        <div className="movie-grid">
          {purchasedMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                className="movie-poster"
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="movie-title">{movie.title}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SettingsView;