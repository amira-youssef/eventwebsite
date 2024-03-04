import React from 'react';
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCheck, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'; // Changed to more convenient icons

function Sidebar() {
  return (
    <Nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-dark sidebar flex-column">
      <div className="position-sticky">
        <Nav.Item>
          <Nav.Link disabled className="text-white fw-bold">Management Section</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/manageUsers" className="text-white">
            <FontAwesomeIcon icon={faUsers} className="me-2" />
            Manage Users
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/manageEvents" className="text-white">
            <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
            Manage Events
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/manageRegist" className="text-white">
            <FontAwesomeIcon icon={faCheck} className="me-2" />
            Manage Registrations
          </Nav.Link>
        </Nav.Item>
        {/* Add more menu items as needed */}
      </div>
    </Nav>
  );
}

export default Sidebar;
