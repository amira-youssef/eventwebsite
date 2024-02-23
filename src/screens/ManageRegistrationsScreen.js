import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const ManageRegistrationsScreen = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch registration data from backend API
    axios.get('http://localhost:5000/api/registrations')
      .then(response => {
        setRegistrations(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching registrations:', error);
        setLoading(false);
      });
  }, []);

  // Function to fetch user data based on user ID
  const fetchUsername = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
      return response.data.username;
    } catch (error) {
      console.error('Error fetching user:', error);
      return 'Unknown User';
    }
  };

  // Function to render registration rows with username
  const renderRegistrations = () => {
    return registrations.map(async registration => {
      const username = await fetchUsername(registration.userID);
      return (
        <tr key={registration._id}>
          <td>{registration.event}</td>
          <td>{username}</td>
          <td>{registration.date}</td>
        </tr>
      );
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
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
                  </tr>
                </thead>
                <tbody>
                  {renderRegistrations()}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManageRegistrationsScreen;
