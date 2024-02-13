import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import EventsScreen from './screens/EventsScreen';
import CreateEventScreen from './screens/CreateEventScreen';


const App = () => {
  const handleLogin = (userId) => {
    // Handle successful login, e.g., redirect to another screen
    console.log('User logged in with ID:', userId);
  };

  const handleRegister = (message) => {
    // Handle successful registration, e.g., show a success message
    console.log('Registration successful:', message);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterScreen onRegister={handleRegister} />} />
        <Route path="/events" element={<EventsScreen />} />
        <Route path="/createE" element={<CreateEventScreen />} />


        {/* Add additional routes/screens as needed */}
      </Routes>
    </Router>
  );
};

export default App;
