import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { put } from '../../API/ApiEndPoints';
import { SetUser } from '../../redux/AuthSlice'; // ✅ Correct import
import { toast } from 'react-hot-toast'; // ✅ Make sure toast is imported

const Profile = () => {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstname: user.firstname || '',
    lastname: user.lastname || '',
    username: user.username || '',
    email: user.email || '',
    phone: user.phone || '',
    role: user.role || '',
    sellerShop: user.sellerShop || '',
    address: user.address || '',
    createdAt: user.createdAt || '',
    updatedAt: user.updatedAt || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await put(`update-profile/${user._id}`, {
        firstname: formData.firstname,
        lastname: formData.lastname,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        sellerShop: formData.sellerShop,
      });

      if (res.data.success) {
        // Get current timestamp for updatedAt
        const updatedTimestamp = new Date().toISOString();

        // Update formData state
        setFormData((prev) => ({
          ...prev,
          updatedAt: updatedTimestamp,
        }));

        // Update Redux store
        dispatch(SetUser({ ...res.data.users, updatedAt: updatedTimestamp }));

        alert('Profile updated successfully!');
        toast.success('Profile updated successfully!');
      } else {
        alert('Update failed!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred while updating the profile.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-[93vh]">
      <div className="py-10 flex items-center justify-center bg-gray-50">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">My Profile</h1>
          <p className="text-gray-500 mb-6">
            Hello <span className="font-semibold">{user.firstname}</span>, you can update your information below.
          </p>

          <hr className="mb-6" />

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">First Name</label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Last Name</label>
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
                disabled
                onChange={handleChange}
                className="w-full p-3 border rounded bg-gray-100"
              />
            </div>

            {/* Phone */}
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

            {/* Role (disabled) */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Role</label>
              <input
                type="text"
                name="role"
                disabled
                value={formData.role}
                className="w-full p-3 border rounded bg-gray-100"
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

            {/* Seller Shop Name */}
            {
              formData.role === 'seller' && (
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Seller Shop Name</label>
                  <input
                    type="text"
                    name="sellerShop"
                    value={formData.sellerShop}
                    onChange={handleChange}
                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

              )
             }

            {/* CreatedAt (disabled) */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Created At</label>
              <input
                type="text"
                name="createdAt"
                value={formData.createdAt}
                disabled
                className="w-full p-3 border rounded bg-gray-100"
              />
            </div>

            {/* UpdatedAt (disabled) */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Last Update</label>
              <input
                type="text"
                name="updatedAt"
                value={formData.updatedAt}
                disabled
                className="w-full p-3 border rounded bg-gray-100"
              />
            </div>

            {/* Submit Button */}
            <div className="col-span-1 md:col-span-2 flex justify-center mt-8">
              <button
                type="submit"
                className="bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-6 rounded shadow-md transition-all duration-200 cursor-pointer"
              >
                Update Profile
              </button>
            </div>
          </form>

        </div>
      </div >
    </div >
  );
};

export default Profile;
