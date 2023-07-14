import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home.js';
import LoginSignup from './components/User/loginSignup';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signin" element={<LoginSignup />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
