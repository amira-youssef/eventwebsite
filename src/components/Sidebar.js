import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBed, faCalendar  } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
  return (
    <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-dark sidebar">
      <div className="position-sticky">
        <ul className="nav flex-column">
          {/* Management Section */}
          <li className="nav-item">
            <span className="nav-link text-white">Management Section</span>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="manageUsers">
              <FontAwesomeIcon icon={faUsers} className="me-2" />
              Manage Users
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/userParams">
              <FontAwesomeIcon icon={faUsers} className="me-2" />
              Users params
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/manageEvents">
              <FontAwesomeIcon icon={faBed} className="me-2" />
              Manage Events
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/manageRegist">
              <FontAwesomeIcon icon={faCalendar} className="me-2" />
              Manage Registrations
            </a>
          </li>
          {/* Add more menu items as needed */}
        </ul>
      </div>
    </nav>
);
};

export default Sidebar