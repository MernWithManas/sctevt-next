import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Admin.css"

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get("/admin/users");
      setUsers(response.data);
    } catch (error) {
      if (error.response) {
        // Server responded with an error status code
        toast.error(`Error fetching users: ${error.response.data.message}`);
      } else if (error.request) {
        // Request made but no response received
        toast.error('Error fetching users: No response received');
      } else {
        // Something happened in setting up the request
        toast.error('Error fetching users: Request failed');
      }
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm(`Are you sure you want to delete user with email: ${id}?`)) {
      try {
        await axios.delete(`/admin/user/delete/${id}`);
        toast.success("User deleted successfully.");
        getUser(); // Refresh user list after deletion
      } catch (error) {
        if (error.response) {
          // Server responded with an error status code
          toast.error(`Error deleting user: ${error.response.data.message}`);
        } else if (error.request) {
          // Request made but no response received
          toast.error('Error deleting user: No response received');
        } else {
          // Something happened in setting up the request
          toast.error('Error deleting user: Request failed');
        }
      }
    }
  };

  return (
    <div className='px-20 py-20 text-white bg-cyan-800'>
      <h2>Manage Users</h2>
      <div className="my-2 text-xl text-center">TOTAL USERS: {users.length}</div>

      {/* Table to display users */}
      <section>
        <table>
          <thead>
            <tr>
              <th>SLNO.</th>
              <th>FULL NAME</th>
              <th>EMAIL</th>
              <th>PHONE</th>
              <th>UPDATE</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  {/* Replace with actual update link or button */}
                  <button>Update</button>
                </td>
                <td>
                  <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default ManageUsers;
