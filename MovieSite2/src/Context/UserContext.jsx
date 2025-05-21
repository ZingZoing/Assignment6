import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [addedMovies, setAddedMovies] = useState([]);

  const registerUser = (userData) => {
    setUser(userData);
  };

  const loginUser = (userData) => {
    setUser(userData);
  };

  const logoutUser = () => {
    setUser(null);
    setCart([]);
    setAddedMovies([]);
  };

  const updateFirstName = (firstName) => {
    setUser((prevUser) => ({ ...prevUser, firstName }));
  };

  const updateLastName = (lastName) => {
    setUser((prevUser) => ({ ...prevUser, lastName }));
  };

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
    setAddedMovies((prev) => [...prev, item.id]);
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    setAddedMovies((prev) => prev.filter((id) => id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
    setAddedMovies([]);
  };
  
  const updatePreferredGenres = (genres) => {
    setUser((prevUser) => ({ ...prevUser, genres }));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        cart,
        addedMovies,
        registerUser,
        loginUser,
        logoutUser,
        updateFirstName,
        updateLastName,
        updatePreferredGenres,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};