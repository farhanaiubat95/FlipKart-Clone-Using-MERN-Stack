import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((state) => state.Auth.user);

  // Create a local state to handle input changes
  const [formData, setFormData] = useState({
    firstname: user.firstname || '',
    lastname: user.lastname || '',
    username: user.username || '',
    email: user.email || '',
    phone: user.phone || '',
    role: user.role || '',
    address: user.address || '',
    createdAt: user.createdAt || '',
    updatedAt: user.updatedAt || '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submit (for now just console.log, you can connect to backend)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Profile Data:', formData);
    // Here you can dispatch an action to update profile in the database
  };

  return (
    <div className="bg-gray-100 h-[93vh] ">
      <div className="py-10 flex items-center justify-center bg-gray-50">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">My Profile</h1>
          <p className="text-gray-500 mb-6">Hello <span className='font-semibold'>{user.firstname}</span>, you can update your information below.</p>

          <hr className="mb-6" />

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Fullname</label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* last Name */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Fullname</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

             {/* Role */}
             <div>
              <label className="block text-gray-700 font-semibold mb-2">role</label>
              <input
                type="text"
                name="role"
                disabled
                value={formData.role}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>



            {/* createdAt */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Created At</label>
              <input
                type="text"
                name="createdAt"
                value={formData.createdAt}
                onChange={handleChange}
                disabled
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* updatedAt*/}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Last Update</label>
              <input
                type="text"
                name="updatedAt"
                value={formData.updatedAt}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-6 rounded shadow-md transition-all duration-200 cursor-pointer"
              >
                Update Profile
              </button>
            </div>

          </form>


        </div>
      </div>
    </div>
  );
};

export default Profile;
