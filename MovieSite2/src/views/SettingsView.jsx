import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import genres from "../../components/Genres"; // Import the genres list
import "./SettingsView.css";

function SettingsView() {
  const navigate = useNavigate();
  const { user, updateFirstName, updateLastName, updatePreferredGenres } = useContext(UserContext);

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [preferredGenres, setPreferredGenres] = useState(user?.genres || []);

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
      <button className="save-button" onClick={handleSave}>
        Save Changes
      </button>
      <button className="back-button" onClick={() => navigate("/movies/now_playing")}>
        Back to Movies
      </button>
    </div>
  );
}

export default SettingsView;