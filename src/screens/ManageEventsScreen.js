// ManageEventsScreen.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';

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


  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${eventId}`);
      setEvents(events.filter(event => event._id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div>
      <h2>Manage Events</h2>
      <div className="row">
        {events.map(event => (
          <div className="col-md-4 mb-4" key={event._id}>
            <Card>
              <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                <Card.Text>{event.description}</Card.Text>
                <Card.Text>Date: {event.date}</Card.Text>
                <Button variant="danger" onClick={() => handleDeleteEvent(event._id)}>Delete</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageEventsScreen;
