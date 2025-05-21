import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./Context/UserContext";

import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import MoviesView from './views/MoviesView';
import CartView from './views/CartView';
import ErrorView from './views/ErrorView';
import MovieTileView from './views/MovieTileView';
import MovieDetailView from './views/MovieDetailView';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route
            path="/movies/*"
            element={
              <ProtectedRoute>
                <MoviesView />
              </ProtectedRoute>
            }
          >
            <Route path="now_playing" element={<MovieTileView />} />
            <Route path="genre/:genre" element={<MovieTileView />} />
            <Route path="popular" element={<MovieTileView />} />
            <Route path="top_rated" element={<MovieTileView />} />
            <Route path="upcoming" element={<MovieTileView />} />
            <Route path=":movieId" element={<MovieDetailView />} />
          </Route>
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartView />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<ErrorView />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;