import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/login',
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log('Login successful:', response.data);

      // Set isLoggedIn to true and store it in local storage
      localStorage.setItem('isLoggedIn', true);
      // Store user data in local storage
      localStorage.setItem('currentUser', JSON.stringify(response.data));

      // Redirect based on isAdmin status
      const isAdmin = response.data.isAdmin;
      if (isAdmin) {
        window.location.href = '/admin';
      } else {
        window.location.href = '/events';
      }
    } catch (error) {
      console.error('Login error:', error.response?.data?.message);
      // Handle login error (display message, etc.)
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <Form onSubmit={handleLogin} className="w-50">
      <h2 className="text-center mb-4">Login</h2>
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
