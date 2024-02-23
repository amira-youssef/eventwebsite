import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const EventForm = ({ onCreateEvent }) => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [date, setDate] = React.useState('');

  const handleCreateEvent = async (e) => {
    e.preventDefault();
  
    try {
      const userData = JSON.parse(localStorage.getItem('currentUser'));
      console.log(userData.userId);
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
      console.log('Event created:', response.data);
      onCreateEvent(response.data);
    } catch (error) {
      console.error('Event creation error:', error.response?.data?.message);
      // Handle event creation error (display message, etc.)
    }
  };

  return (
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

      <Form.Group controlId="formDate">
        <Form.Label>Date:</Form.Label>
        <Form.Control
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Create Event
      </Button>

      <Link to="/events">
        <Button variant="secondary">
          Return to Dashboard
        </Button>
      </Link>
    </Form>
  );
};

export default EventForm;
