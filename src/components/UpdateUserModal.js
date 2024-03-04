import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const UpdateUserModal = ({ userId }) => {
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleClose = () => setShowModal(false);
  const handleShow = async () => {
    setShowModal(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/users/getUserById/${userId}`);
      const { username, email } = response.data; // Extract username and email from response
      setUserData({ ...userData, username, email }); // Update only username and email in userData
    } catch (error) {
      console.error('Error fetching User details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/users/update/${userId}`, userData);
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Update
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username" value={userData.username} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" name="email" value={userData.email} onChange={handleChange} />
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

export default UpdateUserModal;
