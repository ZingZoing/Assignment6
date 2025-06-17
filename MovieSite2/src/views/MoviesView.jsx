import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import genres from "../../components/Genres";
import "./MoviesView.css";
import { useState, useContext, useEffect, useCallback } from "react";
import { UserContext } from "../Context/UserContext";
import debounce from "lodash.debounce";

function MoviesView() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, genres: preferredGenres, logoutUser } = useContext(UserContext);
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

  const handleSearch = useCallback(
    debounce((query) => {
      navigate(`/movies/search?query=${query}&page=1`);
    }, 500),
    []
  );

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(searchQuery);
    }
  };

  useEffect(() => {
    return () => {
      handleSearch.cancel();
    };
  }, [handleSearch]);

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
            onKeyPress={handleSearchKeyPress}
          />
          <button className="search-button" onClick={() => handleSearch(searchQuery)}>
            Search
          </button>
        </div>
        <div className="welcome-message">
          {user && (
            <span>
              Welcome, {user.firstName || user.displayName || user.email}!
            </span>
          )}
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
          {preferredGenres.map((genreId) => {
            const genre = genres.find((g) => g.id === parseInt(genreId));
            if (!genre) return null;
            return (
              <button
                key={genre.id}
                className="genre-button"
                onClick={() => navigate(`/movies/genre/${genre.id}`)}
              >
                {genre.name}
              </button>
            );
          })}
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
          <Outlet context={{ currentPage, setCurrentPage, searchQuery }} />
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