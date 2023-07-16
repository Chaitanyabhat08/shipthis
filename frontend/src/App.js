import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home.js';
import LoginSignup from './components/User/loginSignup';
import AllMovies from './components/Movies/AllMovies.js';
import { useSelector, useDispatch } from 'react-redux';
import Search from "./components/Search/Search.js"

function App() {
  const { isAuthenticated, user } = useSelector(state => state.user);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Search" element={<Search/>} />
        <Route path="/signin" element={<LoginSignup />} />
        <Route path="/allMovies" element={<AllMovies />} />
        <Route path="/allMovies/:keyWord" element={<AllMovies />} />
      </Routes>
    </Router>
  );
}

export default App;
