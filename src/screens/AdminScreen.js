import React from 'react';


const AdminScreen = () => {

  const userData = JSON.parse(localStorage.getItem('currentUser'));
  if (!userData || !userData.isAdmin) {
    return <div> not authorised </div>; // Redirect to a page for unauthorized users
  }

    return (
      
      <div className="container-fluid">
        <div className="row">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Welcome, Admin!</h1>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title">Manage Users</h5>
                    <p className="card-text">View, add ,edit, or delete user accounts.</p>
                    <a href="/manageUsers" className="btn btn-primary">Go to Users</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title">Manage Events</h5>
                    <p className="card-text">View, edit, or delete events.</p>
                    <a href="/manageEvents" className="btn btn-primary">Go to Events</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title">Manage Registrations</h5>
                    <p className="card-text">View or delete registrations.</p>
                    <a href="/manageEvents" className="btn btn-primary">Go to Registrations</a>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    );
  };
  
  export default AdminScreen;