import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import "./RegisterView.css";

const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 80, name: "Crime" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 9648, name: "Mystery" },
  { id: 878, name: "Sci-Fi" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

export default function RegisterView() {
  const navigate = useNavigate();
  const { registerUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      alert("Passwords do not match! Please try again.");
      return;
    }

    const selectedGenres = formData.getAll("genres");
    if (selectedGenres.length < 5) {
      alert("Please select at least 5 genres.");
      return;
    }

    const userData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      genres: selectedGenres,
    };

    registerUser(userData);

    navigate(`/movies/now_playing`)
  };

  return (
    <div className="register-container">
      <div className="BackMovies"></div>

      <div class="GradiantTop"></div>
      <div class="GradiantBottom"></div>
      <div class="GradiantRight"></div>
      <div class="GradiantLeft"></div>

      <div class="Footer2">
        <div class="FooterBoldBox About">About</div>
        <div class="FooterBox WhoWeAre">Who are we?</div>
        <div class="FooterBox Hiring">We're hiring!</div>

        <div class="FooterBoldBox Help">Help</div>
        <div class="FooterBox Payments">Payments</div>
        <div class="FooterBox Delivery">Delivery</div>
        <div class="FooterBox ContactUs">Contact us</div>

        <div class="FooterBoldBox LawOrder">Law</div>
        <div class="FooterBox TermsNService">Terms N service</div>
        <div class="FooterBox Cookies">Cookies</div>

        <div class="FooterBoldBox Media">Media</div>
        <div class="FooterBox Youtube">Youtube</div>
        <div class="FooterBox Instagram">Instagram</div>
      </div>

      <div className="register-form">
        <h2 className="register-title">Register</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input
              type="text"
              name="firstName"
              className="form-input"
              required
            />
            <label className="form-label">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-input"
              required
            />
            <label className="form-label">Re-enter Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Preferred Genres</label>
            <div className="genre-checkboxes">
              {genres.map((genre) => (
                <div key={genre.id} className="checkbox-group">
                  <input
                    type="checkbox"
                    id={`genre-${genre.id}`}
                    name="genres"
                    value={genre.id}
                  />
                  <label htmlFor={`genre-${genre.id}`}>{genre.name}</label>
                </div>
              ))}
            </div>
          </div>
          <button type="submit" className="submit-btn">
            Register
          </button>
          <button
            type="button"
            className="submit-btn"
            onClick={() => navigate('/login')}
          >
            Already a member? Login here
          </button>
        </form>
      </div>
    </div>
  );
}