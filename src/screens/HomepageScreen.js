import React from 'react';
import Home from '../components/Homepage';
import { Navbar } from 'react-bootstrap';

const HomePageScreen = () => {
  return (
    <div>
      <Navbar/>  
      <Home />
    </div>
  );
};

export default HomePageScreen;
