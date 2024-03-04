import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import NewUserModal from '../components/NewUserModal';
import UpdateUserModal from '../components/UpdateUserModal';
import { Button } from 'react-bootstrap';

const ManageUsersScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data from backend API
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/users');
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    // Send DELETE request to backend to delete user
    try {
      await axios.delete(`http://localhost:5000/api/users/deleteUser/${userId}`);
      // If successful, update the user list
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Function to render user rows
  const renderUsers = () => {
    return users.map(user => (
      <tr key={user._id}>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{user.isAdmin ? 'Admin' : 'Regular User'}</td>
        <td>
          <Button variant="danger" onClick={() => handleDeleteUser(user._id)}>Delete</Button>
          <UpdateUserModal userId={user._id}/>
        </td>
      </tr>
    ));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Manage Users</h1>
            <NewUserModal />
          </div>
          <div className="table-responsive">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {renderUsers()}
                </tbody>
              </table>
            )}
          </div>
          <Button href='/admin'>Back to Dashboard</Button>
        </main>
      </div>
    </div>
  );
};

export default ManageUsersScreen;
