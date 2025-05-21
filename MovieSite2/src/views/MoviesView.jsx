import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import genres from "../../components/Genres";
import "./MoviesView.css";
import { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";

function MoviesView() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logoutUser } = useContext(UserContext); // Access user and logoutUser from context
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    console.log("Search query:", searchQuery);
  };

  return (
    <div className="movies-container">
      <div className="GradiantTop1"></div>

      <div className="top-bar">
        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="search-button" onClick={handleSearchClick}>
            Search
          </button>
        </div>
        <div className="welcome-message">
          {user && <span>Welcome, {user.firstName}!</span>}
        </div>
        <div className="top-bar-buttons">
          <button className="top-bar-button" onClick={() => navigate("/cart")}>
            Cart
          </button>
          <button className="top-bar-button" onClick={() => navigate("/settings")}>
            Settings
          </button>
          <button className="top-bar-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="side-genre">
        <ul>
          {genres.map((genre) => (
            <button
              key={genre.id}
              className="genre-button"
              onClick={() => navigate(`/movies/genre/${genre.id}`)}
            >
              {genre.name}
            </button>
          ))}
        </ul>
      </div>

      <div className="view-container">
        <h1 className="movies-title">Movies</h1>
        <nav className="movies-nav">
          <NavLink to="/movies/now_playing" className="nav-link">
            Now Playing
          </NavLink>
          <NavLink to="/movies/popular" className="nav-link">
            Popular
          </NavLink>
          <NavLink to="/movies/top_rated" className="nav-link">
            Top Rated
          </NavLink>
          <NavLink to="/movies/upcoming" className="nav-link">
            Upcoming
          </NavLink>
        </nav>
        <div className="movies-content">
          <Outlet context={{ currentPage, searchQuery }} />
        </div>
        {!/^\/movies\/\d+$/.test(location.pathname) && (
          <div className="pagination-buttons">
            <button
              className="pagination-button"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="current-page">Page {currentPage}</span>
            <button className="pagination-button" onClick={handleNextPage}>
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MoviesView;