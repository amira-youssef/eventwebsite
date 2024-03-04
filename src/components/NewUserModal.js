import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const NewUserModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Disable the submit button
      e.target.querySelector('button[type="submit"]').setAttribute('disabled', 'disabled');
      
      const response = await axios.post('http://localhost:5000/api/users/register', userData);
      console.log(response.data.message);
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error('Error creating new user:', error);
    } finally {
      // Re-enable the submit button
      e.target.querySelector('button[type="submit"]').removeAttribute('disabled');
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        New User
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username" value={userData.username} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={userData.email} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={userData.password} onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
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

export default NewUserModal;
