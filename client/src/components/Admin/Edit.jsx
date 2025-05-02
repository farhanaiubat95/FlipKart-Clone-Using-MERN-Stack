import React, { useEffect, useState } from 'react';
import { get, post } from '../../API/ApiEndPoints';
import { useParams, useNavigate } from 'react-router-dom';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [adminData, setAdminData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    phone: '',
    address: '',
  });

  const [originalData, setOriginalData] = useState(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await get(`/admin/dashboard/getuserbyid/${id}`);
        const data = response.data.user;
        const formattedData = {
          firstname: data.firstname,
          lastname: data.lastname,
          username: data.username,
          email: data.email,
          phone: data.phone,
          address: data.address,
        };
        setAdminData(formattedData);
        setOriginalData(formattedData);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };
    fetchAdmin();
  }, [id]);

  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const isChanged = () => {
    return JSON.stringify(adminData) !== JSON.stringify(originalData);
  };

  // Check if individual field is changed
  const isFieldChanged = (field) => {
    return adminData[field] !== (originalData?.[field] || '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isChanged()) {
      alert("No changes detected!");
      return;
    }

    try {
      await post(`/admin/dashboard/updateuser/${id}`, adminData);
      alert("Admin updated successfully!");
      navigate('/admin/dashboard/AllAdmin');
    } catch (error) {
      console.error("Error updating admin:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Edit Admin</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {['firstname', 'lastname', 'username', 'email', 'phone', 'address'].map((field) => (
          <input
            key={field}
            name={field}
            value={adminData[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className={`
              border p-3 w-full rounded-xl outline-none
              transition-all duration-300
              ${isFieldChanged(field) ? 'border-green-500' : 'border-gray-300'}
              focus:ring-2 focus:ring-green-500
            `}
          />
        ))}

        <button
          type="submit"
          disabled={!isChanged()}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 
            ${isChanged() ? 'bg-green-700 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'} 
            text-white`}
        >
          Update
        </button>

      </form>
    </div>
  );
};

export default Edit;
