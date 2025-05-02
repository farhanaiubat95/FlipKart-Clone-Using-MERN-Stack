// src/routers/AuthProtectedRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthProtectedRoute = () => {
  const user = useSelector((state) => state.Auth.user);

  if (user) {
    // Already logged in → Redirect based on role
    if (user.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user.role === 'seller') {
      return <Navigate to="/seller/dashboard" replace />;
    } else if (user.role === 'customer') {
      return <Navigate to="/myaccount" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  //Not logged in → Allow access to login/signup
  return <Outlet />;
};

export default AuthProtectedRoute;
