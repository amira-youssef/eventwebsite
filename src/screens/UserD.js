// Import useState and useEffect from React
import React, { useState, useEffect } from 'react';
// Import components from react-bootstrap
import { Card, Button,  Table } from 'react-bootstrap';
// Import axios for making HTTP requests
import axios from 'axios';
import UpdateEventModal from '../components/UpdateEventModal';


const UserD = () => {
  // State for user registrations
  const [userRegistrations, setUserRegistrations] = useState([]);
  // State for user events
  const [userEvents, setUserEvents] = useState([]);
  // State for loading state of registrations
  const [loadingRegistrations, setLoadingRegistrations] = useState(true);
  // State for loading state of events
  const [loadingEvents, setLoadingEvents] = useState(true);
  // State for showing registrations modal
  const [showRegistrations, setShowRegistrations] = useState(false);
  // State for showing events modal
  const [showEvents, setShowEvents] = useState(false);

  // Fetch user registrations when component mounts
  useEffect(() => {
    fetchUserRegistrations();
    fetchUserEvents();
  }, []);

  // Function to fetch user registrations
  const fetchUserRegistrations = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const userId = currentUser ? currentUser.userId : null;
      const response = await axios.get(`http://localhost:5000/api/register/userRegistrations/${userId}`);
      setUserRegistrations(response.data.userRegistrations);
      console.log(response.data);
      setLoadingRegistrations(false);
    } catch (error) {
      console.error('Error fetching user registrations:', error);
      setLoadingRegistrations(false);
    }
  };

  // Function to fetch user events
  const fetchUserEvents = async () => {
    try {
      // Retrieve user ID from localStorage
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const userId = currentUser ? currentUser.userId : null;

      // Fetch events by user ID
      const response = await axios.get(`http://localhost:5000/api/events/eventsByUserId/${userId}`);
      
      // Set user events and update loading state
      setUserEvents(response.data);
      setLoadingEvents(false);
    } catch (error) {
      // Handle errors
      console.error('Error fetching user events:', error);
      setLoadingEvents(false);
    }
  };

  const handleDeleteRegistration = async (registrationId) => {
    // Send DELETE request to backend to delete registration
    try {
      await axios.delete(`http://localhost:5000/api/register/deleteRegistration/${registrationId}`);
      console.log(registrationId);
      // If successful, update the user registrations
      fetchUserRegistrations();
    } catch (error) {
      console.error('Error deleting registration:', error);
    }
  };
    
  const handleDeleteEvent = async (eventId) => {
    // Send DELETE request to backend to delete registration
    try {
      await axios.delete(`http://localhost:5000/api/events/events/${eventId}`);
      console.log(eventId);
      // If successful, update the user registrations
      fetchUserEvents();
    } catch (error) {
      console.error('Error deleting registration:', error);
    }
  };
    

  // Function to show registrations modal
  const handleShowRegistrations = () => {
    setShowRegistrations(true);
  };

  // Function to hide registrations modal
  const handleHideRegistrations = () => {
    setShowRegistrations(false);
  };

  // Function to show events modal
  const handleShowEvents = () => {
    setShowEvents(true);
  };

  // Function to hide events modal
  const handleHideEvents = () => {
    setShowEvents(false);
  };


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mb-4">
          <Card style={{ padding: '20px', margin: '10px' }}>
            <Card.Body>
              <Card.Title style={{ fontSize: '24px' }}>Manage Events</Card.Title>
              <Card.Text>
              View Events you created , update or remove them 
              </Card.Text>
              <Button variant="primary" onClick={handleShowEvents}>
                Manage Events
              </Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-6 mb-4">
          <Card style={{ padding: '20px', margin: '10px' }}>
            <Card.Body>
              <Card.Title style={{ fontSize: '24px' }}>Manage Registrations</Card.Title>
              <Card.Text>
              View Events you registered , or remove a registration 
              </Card.Text>
              <Button variant="primary" onClick={handleShowRegistrations}>
                Manage Registrations
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>

      {showRegistrations && (
        <div className="row">
          <div className="col-md-12">
            <h2>User Registrations</h2>
            {loadingRegistrations ? (
              <div>Loading...</div>
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>User Name</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userRegistrations.map((registration, index) => (
                    <tr key={index}>
                      <td>{registration.eventName}</td>
                      <td>{registration.username}</td>
                      <td>{registration.registrationDate}</td>
                      <td>
                        <Button variant="danger" onClick={() => handleDeleteRegistration(registration.registrationId)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            <Button variant="secondary" onClick={handleHideRegistrations}>
              Close
            </Button>
          </div>
        </div>
      )}

      {showEvents && (
        <div className="row">
          <div className="col-md-12">
            <h2>User Events</h2>
            {loadingEvents ? (
              <div>Loading...</div>
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userEvents.map((Event, index) => (
                    <tr key={index}>
                      <td>{Event.title}</td>
                      <td>{Event.description}</td>
                      <td>{Event.date}</td>
                      <td>
                        <Button variant="danger"  onClick={() => handleDeleteEvent(Event._id)}>Delete</Button>
                        <UpdateEventModal eventId={Event._id} />

                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            <Button variant="secondary" onClick={handleHideEvents}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserD;
