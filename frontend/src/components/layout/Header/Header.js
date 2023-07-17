import React from 'react';
import { useSelector } from 'react-redux';
import './Header.css';

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          FletNix
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className={`nav-item ${isAuthenticated ? '' : 'disabled'}`}>
              <a className="nav-link" href="/allmovies">
                Movies
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/about">
                About Me
              </a>
            </li>
            <li className="nav-item active">
              {isAuthenticated ? (
                <a className="nav-link" href="/profile">
                  {user.name}
                </a>
              ) : (
                  <a className="nav-link active" href="/signin">
                  Sign In
                </a>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;