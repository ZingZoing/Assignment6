import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import "./CartView.css";
import "./MovieTileView.css"; // Make sure this is imported for buy-button styles

function CartView() {
  const { cart, removeFromCart, clearCart, purchases, checkout } = useContext(UserContext);
  const navigate = useNavigate();

  // Show a message when checkout is clicked
  const handleCheckout = async () => {
    await checkout();
    alert("Thank you for buying our over priced movies!");
  };

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
                <button
                  className={`buy-button${purchases.includes(movie.id) ? " disabled" : ""}`}
                  onClick={() => removeFromCart(movie.id)}
                  disabled={purchases.includes(movie.id)}
                >
                  {purchases.includes(movie.id) ? "Bought" : "Remove"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {cart.length > 0 && (
        <div className="cart-action-group">
          <button className="cart-action-button" onClick={clearCart}>
            Clear Cart
          </button>
          <button className="cart-action-button" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      )}
      <div className="cart-action-group">
        <button className="cart-action-button" onClick={() => navigate("/movies/now_playing")}>
          Back to Movies
        </button>
      </div>
    </div>
  );
}

export default CartView;