// src/Layouts/AdminLayout.jsx

import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { get } from '../API/ApiEndPoints';

const AdminLayout = () => {
  const user = useSelector((state) => state.Auth.user);
  const navigate = useNavigate();


    useEffect(() => {
      const GetUser= async () => {
        // Fetch users from the server
        try {
          const request = await get('/admin/dashboard/getuser');
          const response = request.data;
          console.log(response);
  
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
  
      GetUser();
    }, [])










































    
  
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default AdminLayout;
