import React, { useEffect } from 'react';
import WebFont from 'webfontloader';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home.js';
import LoginSignup from './components/User/loginSignup';
import AllMovies from './components/Movies/AllMovies.js';
import { useSelector, useDispatch } from 'react-redux';
import Search from "./components/Search/Search.js"
import MovieDetails from './components/Movies/MovieDetails.js'
import Store from './store.js';
import { LoadUser } from './actions/userAction.js';

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Sans-serif", "Droid Sans", "Chilanka"]
      }
    })
    Store.dispatch(LoadUser())
  }, []);
  const { isAuthenticated, user } = useSelector(state => state.user);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Search" element={<Search/>} />
        <Route path="/signin" element={<LoginSignup />} />
        <Route path="/allMovies" element={<AllMovies />} />
        <Route path="/allMovies/:keyWord" element={<AllMovies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
