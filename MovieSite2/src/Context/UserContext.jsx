import React, { createContext, useState } from "react";
import { auth, googleProvider, firestore } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [addedMovies, setAddedMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [purchases, setPurchases] = useState([]); // <-- Add this line

  // Save purchases to Firestore
  const saveUserPurchases = async (uid, purchasesArr) => {
    await setDoc(doc(firestore, "users", uid), { purchases: purchasesArr }, { merge: true });
    setPurchases(purchasesArr);
  };

  // Save genres and cart to Firestore
  const saveUserGenres = async (uid, genresArr) => {
    await setDoc(doc(firestore, "users", uid), { genres: genresArr }, { merge: true });
    setGenres(genresArr);
  };

  const saveUserCart = async (uid, cartArr) => {
    await setDoc(doc(firestore, "users", uid), { cart: cartArr }, { merge: true });
  };

  // Load user profile (genres, cart, names, purchases)
  const loadUserProfile = async (uid) => {
    const docSnap = await getDoc(doc(firestore, "users", uid));
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.genres) setGenres(data.genres);
      if (data.cart) {
        setCart(data.cart);
        setAddedMovies(data.cart.map((item) => item.id));
      } else {
        setCart([]);
        setAddedMovies([]);
      }
      if (data.purchases) setPurchases(data.purchases); // <-- Add this line
      else setPurchases([]);
      return data;
    } else {
      setGenres([]);
      setCart([]);
      setAddedMovies([]);
      setPurchases([]); // <-- Add this line
      return {};
    }
  };

  const registerWithEmail = async (email, password, genresArr, firstName, lastName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(
        doc(firestore, "users", userCredential.user.uid),
        { genres: genresArr, firstName, lastName, cart: [], purchases: [] }, // <-- purchases: []
        { merge: true }
      );
      const profile = await loadUserProfile(userCredential.user.uid);
      setUser({ ...userCredential.user, firstName: profile.firstName, lastName: profile.lastName });
      return { success: true };
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        return { success: false, error: "Email already in use." };
      }
      return { success: false, error: error.message };
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const profile = await loadUserProfile(userCredential.user.uid);
      setUser({ ...userCredential.user, firstName: profile.firstName, lastName: profile.lastName });
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const loginWithGoogle = async () => {
    try {
      googleProvider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, googleProvider);
      const profile = await loadUserProfile(result.user.uid);
      setUser({ ...result.user, firstName: profile.firstName || result.user.displayName, lastName: profile.lastName });
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const logoutUser = () => {
    setUser(null);
    setCart([]);
    setAddedMovies([]);
    setGenres([]);
    setPurchases([]); // <-- Add this line
  };

  const updateFirstName = async (firstName) => {
    setUser((prevUser) => ({ ...prevUser, firstName }));
    if (user) {
      await setDoc(
        doc(firestore, "users", user.uid),
        { firstName },
        { merge: true }
      );
    }
  };

  const updateLastName = async (lastName) => {
    setUser((prevUser) => ({ ...prevUser, lastName }));
    if (user) {
      await setDoc(
        doc(firestore, "users", user.uid),
        { lastName },
        { merge: true }
      );
    }
  };

  // Save cart to Firestore whenever it changes and user is logged in
  const addToCart = (item) => {
    setCart((prevCart) => {
      const newCart = [...prevCart, item];
      if (user) saveUserCart(user.uid, newCart);
      return newCart;
    });
    setAddedMovies((prev) => [...prev, item.id]);
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.id !== itemId);
      if (user) saveUserCart(user.uid, newCart);
      return newCart;
    });
    setAddedMovies((prev) => prev.filter((id) => id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
    setAddedMovies([]);
    if (user) saveUserCart(user.uid, []);
  };

  const updatePreferredGenres = async (genresArr) => {
    if (user) {
      await saveUserGenres(user.uid, genresArr);
    }
  };

  // Checkout: mark all cart items as bought
  const checkout = async () => {
    if (user) {
      const boughtIds = cart.map((movie) => movie.id);
      const newPurchases = Array.from(new Set([...purchases, ...boughtIds]));
      await saveUserPurchases(user.uid, newPurchases);
      clearCart();
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        cart,
        addedMovies,
        genres,
        purchases, // <-- Add this line
        registerWithEmail,
        logoutUser,
        updateFirstName,
        updateLastName,
        updatePreferredGenres,
        addToCart,
        removeFromCart,
        clearCart,
        loginWithEmail,
        loginWithGoogle,
        checkout, // <-- Add this line
      }}
    >
      {children}
    </UserContext.Provider>
  );
};