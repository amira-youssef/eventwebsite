// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const currentUser = localStorage.getItem('currentUser') ;
  const logout = () => {
    // Clear user's login status from local storage
    localStorage.removeItem('currentUser');
    // Perform any other necessary cleanup, such as redirecting to the login page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">My App</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/events">Events</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/createE">Create Event</Link>
            </li>
            {currentUser ? (
              <li className="nav-item">
                          <button className="btn btn-outline-primary" onClick={logout}>Logout</button>

              </li>
            )  : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              )}
            </ul>  
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
