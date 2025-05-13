import { useNavigate } from "react-router-dom";
import "./RegisterView.css";

export default function RegisterView() {

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/movies/now_playing');
  };

  return (
    <div className="register-container">

      <div className="BackMovies"></div>

      <div class="GradiantTop"></div>
      <div class="GradiantBottom"></div>
      <div class="GradiantRight"></div>
      <div class="GradiantLeft"></div>

      <div class="Footer2"><div class="FooterBoldBox About">About</div>
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
        <div class="FooterBox Instagram">Instagram</div></div>

      <div className="register-form">
        <h2 className="register-title">Register</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input
              type="text"
              name="name"
              className="form-input"
              required
            />
            <label className="form-label">Last Name</label>
            <input
              type="text"
              name="name"
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
              name="password"
              className="form-input"
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Register
          </button>
          <button className="submit-btn" onClick={() => navigate('/login')}>
            Already a member? Login here
          </button>
        </form>
      </div>
    </div>
  );
}
