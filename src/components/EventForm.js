import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const EventForm = ({ onCreateEvent }) => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [date, setDateTime] = React.useState('');

  const handleCreateEvent = async (e) => {
    e.preventDefault();
  
    try {
      const userData = JSON.parse(localStorage.getItem('currentUser'));
      if (!userData || !userData.userId) {
        // User not logged in, show alert
        alert('You must be logged in to create an event.');
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/api/events/create',
        {
          title,
          description,
          date,
          user: userData.userId, // Include user ID in the request
        },
        {
          withCredentials: true,
        }
      );

      // Event created successfully, show alert
      alert('Event created successfully!');
      console.log('Event created:', response.data);
      onCreateEvent(response.data);
    } catch (error) {
      console.error('Event creation error:', error.response?.data?.message);
      // Handle event creation error (display message, etc.)
    
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Create Event</h2>
      <Form onSubmit={handleCreateEvent}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDateTime">
          <Form.Label>Date and Time:</Form.Label>
          <Form.Control
            type="datetime-local"
            value={date}
            onChange={(e) => setDateTime(e.target.value)}
            required
          />
        </Form.Group>

        <div className="text-center">
          <Button variant="primary" type="submit">
            Create Event
          </Button>

          <Link to="/events" className="ml-2">
            <Button variant="secondary">
              Return to Dashboard
            </Button>
          </Link>
        </div>
      </Form>
    </Container>
  );
};

export default EventForm;
