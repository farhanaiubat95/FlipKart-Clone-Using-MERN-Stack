import React, { useEffect, useState } from 'react';
import { get, post } from '../../API/ApiEndPoints'; // Ensure post is imported
import { useNavigate } from 'react-router-dom'; // Import navigation

const AllCustomer = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();  // Use navigate

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await get('/admin/dashboard/getuser');
      const userData = response.data.users.seller;
      setUsers(userData);
    } catch (error) {
      console.error("Error fetching users data:", error);
    }
  };

  // Toggle user activity (enable/disable)
  const handleToggleActivity = async (userId, currentStatus) => {
    const confirmAction = window.confirm(`Are you sure you want to ${currentStatus ? 'enable' : 'disable'} this user?`);
    if (!confirmAction) return; // If admin clicks Cancel, do nothing 

    try {
      await post(`/admin/dashboard/toggle-activity/${userId}`, {}); // Pass empty body explicitly
      fetchUsers(); // Refresh list
    } catch (error) {
      console.error("Error toggling user activity:", error);
    }
  };

  // Delete user
  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await post(`/admin/dashboard/delete/${userId}`, {});
      fetchUsers(); // Refresh user list after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 text-black overflow-x-auto">
      <h1 className="text-2xl font-semibold mb-4">All Customers</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Username</th>
            <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Phone</th>
            <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Address</th>
            <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 text-center whitespace-nowrap">{user.firstname} {user.lastname}</td>
                <td className="px-6 py-4 text-center whitespace-nowrap">{user.username}</td>
                <td className="px-6 py-4 text-center whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 text-center whitespace-nowrap">{user.phone}</td>
                <td className="px-6 py-4 text-center whitespace-nowrap">{user.address}</td>
                <td className="px-6 py-4 text-center whitespace-nowrap">{user.role}</td>
                <td className="px-6 py-4 text-center whitespace-nowrap space-x-2">
                  <button
                    onClick={() => handleToggleActivity(user._id, user.activity)}
                    className={`${user.activity ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-700 hover:bg-green-800'} text-white px-4 py-1 rounded cursor-pointer`}
                  >
                    {user.activity ? 'Disable' : 'Enable'}
                  </button>

                  <button
                    onClick={() => navigate(`/admin/dashboard/edit-admin/${user._id}`)}  // Navigate to edit page
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center px-6 py-4">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllCustomer;
