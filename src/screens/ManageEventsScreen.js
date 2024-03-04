// ManageEventsScreen.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import UpdateEventModal from '../components/UpdateEventModal';
import Sidebar from '../components/Sidebar';

const ManageEventsScreen = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from backend API
    axios.get('http://localhost:5000/api/events/')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const handleDelete = async (eventId) => {
    try {
      // Send a DELETE request to delete the event
      await axios.delete(`http://localhost:5000/api/events/events/${eventId}`);
      // Update the events state or any other necessary action
      setEvents(events.filter(event => event._id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
      // Handle errors
    }
  };

  

  return (
    <div className="container-fluid">
    <div className="row">
      <Sidebar />
      <main role="main" className="col-md-9 ml-sm-auto col-10-10 px-4">
        <div className="d-flex justify-content-between flex-wrap flex-justify-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Manage Registrations</h1>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-sm"> 
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event._id}>
                  <td>{event.title}</td>
                  <td>{event.description}</td>
                  <td>{event.date}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleDelete(event._id)}>Delete</Button>
                    <UpdateEventModal eventId={event._id} />
                  </td>
                </tr>
              ))
              }
            </tbody>
          </table>  
        </div>  
        <Button href='/admin'>Back to Dashboard</Button>
        </main>
      </div>
    </div>
    
  );
};

export default ManageEventsScreen;
