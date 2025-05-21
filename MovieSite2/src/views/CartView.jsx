import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import "./CartView.css";

function CartView() {
  const { cart, removeFromCart, clearCart } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((movie) => (
            <li key={movie.id} className="cart-item">
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="cart-item-poster"
              />
              <div className="cart-item-details">
                <h3>{movie.title}</h3>
                <button onClick={() => removeFromCart(movie.id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {cart.length > 0 && (
        <button className="clear-cart-button" onClick={clearCart}>
          Clear Cart
        </button>
      )}
      <button className="back-button" onClick={() => navigate("/movies/now_playing")}>
        Back to Movies
      </button>
    </div>
  );
}

export default CartView;