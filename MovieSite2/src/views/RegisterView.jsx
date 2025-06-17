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
  const { registerWithEmail, loginWithGoogle } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");

    if (password !== confirmPassword) {
      alert("Passwords do not match! Please try again.");
      return;
    }

    const selectedGenres = formData.getAll("genres");
    if (selectedGenres.length < 5) {
      alert("Please select at least 5 genres.");
      return;
    }

    const email = formData.get("email");
    // Pass firstName and lastName as additional arguments
    const result = await registerWithEmail(email, password, selectedGenres, firstName, lastName);

    if (result.success) {
      navigate(`/movies/now_playing`);
    } else {
      alert(result.error || "Registration failed.");
    }
  };

  const handleGoogleSignup = async () => {
    const result = await loginWithGoogle();
    if (result.success) {
      navigate('/movies/now_playing');
    } else {
      alert("Google signup failed.");
    }
  };

  return (
    <div className="register-container">
      <div className="BackMovies"></div>
      <div className="GradiantTop"></div>
      <div className="GradiantBottom"></div>
      <div className="GradiantRight"></div>
      <div className="GradiantLeft"></div>
      <div className="Footer2">
        <div className="FooterBoldBox About">About</div>
        <div className="FooterBox WhoWeAre">Who are we?</div>
        <div className="FooterBox Hiring">We're hiring!</div>
        <div className="FooterBoldBox Help">Help</div>
        <div className="FooterBox Payments">Payments</div>
        <div className="FooterBox Delivery">Delivery</div>
        <div className="FooterBox ContactUs">Contact us</div>
        <div className="FooterBoldBox LawOrder">Law</div>
        <div className="FooterBox TermsNService">Terms N service</div>
        <div className="FooterBox Cookies">Cookies</div>
        <div className="FooterBoldBox Media">Media</div>
        <div className="FooterBox Youtube">Youtube</div>
        <div className="FooterBox Instagram">Instagram</div>
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
            onClick={handleGoogleSignup}
            style={{ backgroundColor: "#4285F4", marginTop: "10px" }}
          >
            Sign up with Google
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