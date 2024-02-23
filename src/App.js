import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import EventsScreen from './screens/EventsScreen';
import CreateEventScreen from './screens/CreateEventScreen';
import Navbar from './components/NavBar';
import HomePageScreen from './screens/HomepageScreen';
import AdminScreen from './screens/AdminScreen';
import ManageRegistrationsScreen from './screens/ManageRegistrationsScreen';
import ManageUsersScreen from './screens/ManageUsersScreen';
import ManageEventsScreen from './screens/ManageEventsScreen';

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
    <div className='App'>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePageScreen />} />
        <Route path="/login" element={<LoginScreen onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterScreen onRegister={handleRegister} />} />
        <Route path="/events" element={<EventsScreen />} />
        <Route path="/createE" element={<CreateEventScreen />} />
        <Route path='/Admin' exact Component={AdminScreen}/>
        <Route path='/manageRegist' exact Component={ManageRegistrationsScreen}/>
        <Route path='/manageUsers' exact Component={ManageUsersScreen}/>
        <Route path='/manageEvents' exact Component={ManageEventsScreen}/>

        {/* Add additional routes/screens as needed */}
      </Routes>
    </Router>
    </div>
  );
};

export default App;
