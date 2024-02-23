import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Welcome to Event Management</h2>
          <div className="text-center">
            <Link to="/login" className="btn btn-primary mr-3">Login</Link>
            <Link to="/register" className="btn btn-secondary">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
