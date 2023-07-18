import React, { Fragment, useRef, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import MetaData from '../layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { clearErrors, Login, Register } from '../../actions/userAction';
import './loginSignup.css';
import Loader from '../layout/Loader';
import { useAlert } from 'react-alert';

const LoginSignup = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, loading, isAuthenticated } = useSelector(state => state.user);
  const navigateTo = useNavigate();
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const [loginEmail, setLoginEmail] = useState(null);
  const [loginPassword, setLoginPassword] = useState(null);
  const [user, setUser] = useState({
    age: 0,
    name: "",
    email: "",
    password: "",
  });
  const [passwordShown, setPasswordShown] = useState(false);

  const { age, name, email, password } = user;
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("/man.png");
  const redirect = "/allMovies";
  useEffect(() => {
    if (error) {
      alert.show(error);
      dispatch(clearErrors());
    }
    if (user && isAuthenticated) {
      navigateTo(redirect)
    }
  }, [dispatch, error, navigateTo, alert, user, isAuthenticated, redirect]);

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value })
    }
  }

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(Login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const userData = {
      age: age.toString(),
      name,
      email,
      password,
      avatar,
    };
    dispatch(Register(userData));
  };

  return (
    loading ? <Loader/> :
  <Fragment>
    <MetaData title={`Login/Signup Page`} />
    <div className="container">
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />
        <div className="signup">
          <form ref={registerTab} encType="multipart/form-data" onSubmit={registerSubmit} autoComplete='false'>
            <label htmlFor="chk" aria-hidden="true">
              Sign Up
            </label>
            <div className="registermailInput">
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name"
                required
                value={name}
                onChange={registerDataChange}
              />
            </div>
            <div className="registermailInput">
              <input
                type="number"
                name="age"
                placeholder="Enter Your Age"
                required
                value={age}
                onChange={registerDataChange}
              />
            </div>
            <div className="registermailInput">
              <input
                type="email"
                name="email"
                placeholder="Enter You Email"
                required
                value={email}
                onChange={registerDataChange}
              />
            </div>
            <div className="registermailInput">
              <input
                type={passwordShown ? "text" : "password"}
                name="password"
                placeholder="Enter You Password"
                required
                value={password}
                onChange={registerDataChange}
              />
              <br />
              <button
                type="button"
                className="btn"
                onClick={() => setPasswordShown((prevValue) => !prevValue)}
              >
                {passwordShown ? "🙈" : "👀"}
              </button>
            </div>
            <img className="avaImage" src={avatarPreview} alt="Avatar Preview" />
            <div id="registerImage" style={{ height: "auto", overflow: "scroll" }}>
              <input type="file" name="avatar" accept="image/*" onChange={registerDataChange} required/>
            </div>
            <button type="submit" value="register" className="btn btn-primary">
              Sign up
            </button>
          </form>
        </div>
        <div className="login">
          <form className="login_form" ref={loginTab} onSubmit={loginSubmit}>
            <label htmlFor="chk" aria-hidden="true">
              Login
            </label>
            <div className="loginmailInput">
              <input
                type="email"
                className="emailInput"
                name="loginEmail"
                placeholder="enter Email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="loginPasswordInput">
              <input
                type={passwordShown ? "text" : "password"}
                className="passwordInput"
                name="loginPassword"
                placeholder="enter password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <br />
              <button
                type="button"
                className="btn"
                onClick={() => setPasswordShown((prevValue) => !prevValue)}
              >
                {passwordShown ? "🙈" : "👀"}
              </button>
            </div>
            <button type="submit" value="Login" className="btn btn-primary mx-1">
              Login
            </button>
          </form>
          <Link to="/forgotPassword">Forgot Password?</Link>
        </div>
      </div>
    </div>
      </Fragment>
  );
};

export default LoginSignup;