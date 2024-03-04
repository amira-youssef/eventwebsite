import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const UpdateEventModal = ({ eventId }) => {
  const [showModal, setShowModal] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    title: '',
    description: '',
    date: '',
  });

  const handleClose = () => setShowModal(false);
  const handleShow = async () => {
    setShowModal(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/events/getEventById/${eventId}`);
      setEventDetails(response.data); // Assuming the response contains event details
    } catch (error) {
      console.error('Error fetching event details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/events/${eventId}/update`, eventDetails);
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Update Event
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={eventDetails.title} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" value={eventDetails.description} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control type="text" name="date" value={eventDetails.date} onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateEventModal;
