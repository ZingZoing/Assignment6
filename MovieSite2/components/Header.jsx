import { useNavigate } from "react-router-dom";
import "./Header.css";

function HeaderView() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="TitleBox Title">CoolFlix</div>
      <button className="login button1" onClick={() => navigate('/login')}>Login</button>
      <button className="register button1" onClick={() => navigate('/register')}>Register</button>
    </div>
  );
}

export default HeaderView;
