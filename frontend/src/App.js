import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home.js';
import LoginSignup from './components/User/loginSignup';
import AllMovies from './components/Movies/AllMovies.js';
import { useSelector, useDispatch } from "react-redux";

function App() {
  const { isAuthenticated, user } = useSelector(state => state.user);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signin" element={<LoginSignup />}></Route>
          { user && isAuthenticated && <Route path="/allmovies" element={<AllMovies />}></Route>}
        </Routes>
      </Router>
    </>
  );
}

export default App;
