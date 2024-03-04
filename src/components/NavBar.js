import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const logout = () => {
    // Clear user's login status from local storage
    localStorage.removeItem('currentUser');
    localStorage.setItem('isLoggedIn', false);
    // Reload the page to show the login page
    window.location.reload();
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
          </ul>
          <ul className="navbar-nav ml-auto">
            {currentUser ? (
              <li className="nav-item">
                <Link className="nav-link" to="/user">User Dashboard</Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={logout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
