import { NavLink, Outlet, useNavigate } from "react-router-dom";
import genres from "../../components/Genres";
import "./MoviesView.css";
import { useState } from "react";

function MoviesView() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="movies-container">
      <div className="GradiantTop1"></div>

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
          <Outlet />
        </div>
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
      </div>
    </div>
  );
}

export default MoviesView;