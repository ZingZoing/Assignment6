import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import "./LoginView.css";

export default function LoginView() {
  const navigate = useNavigate();
  const { loginWithEmail, loginWithGoogle } = useContext(UserContext);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const result = await loginWithEmail(email, password);
    if (result.success) {
      navigate('/movies/now_playing');
    } else {
      setError("Login failed. Please check your credentials.");
    }
  };

  const handleGoogleLogin = async () => {
    const result = await loginWithGoogle();
    if (result.success) {
      navigate('/movies/now_playing');
    } else {
      setError("Google login failed.");
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
        <h2 className="register-title">Login</h2>
        {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}
        <form onSubmit={handleSubmit} className="form">
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
          </div>
          <button type="submit" className="submit-btn">
            Login
          </button>
          <button
            type="button"
            className="submit-btn"
            onClick={handleGoogleLogin}
            style={{ backgroundColor: "#4285F4", marginTop: "10px" }}
          >
            Sign in with Google
          </button>
          <button
            type="button"
            className="submit-btn"
            onClick={() => navigate('/register')}
          >
            Not a member? Register here
          </button>
        </form>
      </div>
    </div>
  );
}