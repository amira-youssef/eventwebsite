import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { Button } from 'react-bootstrap';

const ManageRegistrationsScreen = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch registration data from backend API
    axios.get('http://localhost:5000/api/register/allRegistrations')
      .then(response => {
        setRegistrations(response.data.allRegistrations);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching registrations:', error);
        setLoading(false);
      });
  }, []);

  // Function to delete a registration
  const handleDelete = async (registrationId) => {
    try {
      // Send DELETE request to backend to delete registration
      await axios.delete(`http://localhost:5000/api/register/deleteRegistration/${registrationId}`);
      // Update registrations after successful deletion
      setRegistrations(registrations.filter(registration => registration.registrationId !== registrationId));
    } catch (error) {
      console.error('Error deleting registration:', error);
    }
  };

  // Function to render registration rows with delete button
  const renderRegistrations = () => {
    return registrations.map((registration, index) => (
      <tr key={index}>
        <td>{registration.eventName}</td>
        <td>{registration.username}</td>
        <td>{registration.registrationDate}</td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(registration.registrationId)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };
  

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <main role="main" className="col-md-9 ml-10-auto col-lg-10 px-4">
          <div className="d-flex justify-content-between flex-wrap justify-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Manage Registrations</h1>
          </div>
          <div className="table-responsive">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>User Name</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {renderRegistrations()}
                </tbody>
              </table>
            )}
          </div>
          <Button href='/admin'>Back to Dashboard</Button>
        </main>
      </div>
    </div>
  );
};

export default ManageRegistrationsScreen;
