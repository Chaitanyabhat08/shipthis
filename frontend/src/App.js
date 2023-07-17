import React, { useEffect } from 'react';
import WebFont from 'webfontloader';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home.js';
import LoginSignup from './components/User/loginSignup';
import AllMovies from './components/Movies/AllMovies.js';
import { useSelector } from 'react-redux';
import Search from "./components/Search/Search.js"
import MovieDetails from './components/Movies/MovieDetails.js'
import Store from './store.js';
import { LoadUser } from './actions/userAction.js';
import ForgotPasswordOption from './components/User/ForgotPasswordOption.js';
import ResetPasswordOption from './components/User/ResetPasswordOption.js';
import Header from './components/layout/Header/Header.js';
import AboutUs from './components/User/AboutUs.js';
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

  return (<>
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        {user && isAuthenticated && <Route path="/Search" element={<Search />} />}
        <Route path="/signin" element={<LoginSignup />} />
        {user && isAuthenticated && <Route path="/allMovies" element={<AllMovies />} />}
        {user && isAuthenticated && <Route path="/allMovies/:keyWord" element={<AllMovies />} />}
        {user && isAuthenticated && <Route path="/movies/:id" element={<MovieDetails />} />}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/forgotPassword" element={<ForgotPasswordOption />} />
        <Route path="/resetPassword/:token" element={<ResetPasswordOption />} />
      </Routes>
    </Router>
  </>
  );
}

export default App;