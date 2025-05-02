import React, { useEffect, useState } from 'react';
import { get } from '../../API/ApiEndPoints';
import { useNavigate } from 'react-router-dom'; // Import navigation

const AllAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const navigate = useNavigate();  // Use navigate

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await get('/admin/dashboard/getuser');
        const adminData = response.data.users.admin;
        setAdmins(adminData);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchAdmins();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-6 text-black overflow-x-auto">
      <h1 className="text-2xl font-semibold mb-4">All Admins</h1>
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
          {admins.length > 0 ? (
            admins.map((admin) => (
              <tr key={admin._id}>
                <td className="px-6 py-4 text-center whitespace-nowrap">{admin.firstname} {admin.lastname}</td>
                <td className="px-6 py-4 text-center whitespace-nowrap">{admin.username}</td>
                <td className="px-6 py-4 text-center whitespace-nowrap">{admin.email}</td>
                <td className="px-6 py-4 text-center whitespace-nowrap">{admin.phone}</td>
                <td className="px-6 py-4 text-center whitespace-nowrap">{admin.address}</td>
                <td className="px-6 py-4 text-center whitespace-nowrap">{admin.role}</td>
                <td className="px-6 py-4 text-center whitespace-nowrap space-x-2">
                  <button
                    className="bg-yellow-600 text-white px-4 py-1 rounded hover:bg-yellow-700 cursor-pointer"
                  >
                    Disable
                  </button>
                  <button
                    onClick={() => navigate(`/admin/dashboard/edit-admin/${admin._id}`)}  // Navigate to edit page
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-600 cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center px-6 py-4">
                No admins found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllAdmin;
