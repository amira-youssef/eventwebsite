import React from 'react';
import Sidebar from '../components/Sidebar.js';


const AdminScreen = () => {
    return (
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <h2 className="mt-4">Admin Dashboard</h2>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Welcome, Admin!</h1>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title">Manage Users</h5>
                    <p className="card-text">View, edit, or delete user accounts.</p>
                    <a href="/admin/users" className="btn btn-primary">Go to Users</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title">Manage Events</h5>
                    <p className="card-text">View, edit, or delete events.</p>
                    <a href="/admin/events" className="btn btn-primary">Go to Events</a>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  };
  
  export default AdminScreen;