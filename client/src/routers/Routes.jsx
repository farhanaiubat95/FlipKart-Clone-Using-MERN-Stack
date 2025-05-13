// src/routers/Routers.jsx

import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

// Pages
import Home from '../pages/Home.jsx';
import Login from '../pages/LogSign/Login.jsx';
import Signup from '../pages/LogSign/Signup.jsx';
import ErrorPage from '../pages/ErrorPage.jsx';

// Layouts
import AdminLayout from '../Layouts/AdminLayout.jsx';
import SellerLayout from '../Layouts/SellerLayout.jsx';
import CustomerLayout from '../Layouts/CustomerLayout.jsx';

// Protected Route
import ProtectedRoute from './ProtectedRoute.jsx';
import AuthProtectedRoute from './AuthProtectedRoute.jsx';
import Profile from '../components/header/Profile.jsx';
import Dashboard from '../components/Admin/Dashboard.jsx';
import AllAdmin from '../components/Admin/AllAdmin.jsx';
import AllCustomer from '../components/Admin/AllCustomer.jsx';
import AllSeller from '../components/Admin/AllSeller.jsx';
import Main from '../components/Admin/Main.jsx';
import VerifyEmail from '../pages/LogSign/VerifyEmail.jsx';
import SellerDashboard from '../components/Seller/SellerDashboard.jsx';
import CustomerHome from '../pages/CustomerHome.jsx';
import Cart from '../components/Customer/Cart.jsx';
import Edit from '../components/Admin/Edit.jsx';
import MainSeller from '../components/Seller/MainSeller.jsx';
import Category from '../components/Admin/Category.jsx';
import Payment from '../components/Admin/Payment.jsx';
import Notification from '../components/Admin/Notification.jsx';
import Products from '../components/Seller/Products.jsx';

const Routers = () => {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
          style: {
            background: '#2c3e50',
            color: '#fff',
          },
        }}
        containerStyle={{ top: '100px' }}
      />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        {/* Public Routes protected for logged-in users */}
        <Route element={<AuthProtectedRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verifyemail" element={<VerifyEmail />} />
        </Route>


        {/* Protected Routes */}

        {/* Customer */}
        <Route element={<ProtectedRoute allowedRoles={['customer']} />}>
          <Route path="/myaccount" element={<CustomerLayout />} >
            <Route index element={<CustomerHome />} />
            <Route path="cart" element={<Cart />} />

          </Route>
        </Route>

        {/* Admin */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />}>
              <Route index element={<Main />} />
              <Route path="alladmin" element={<AllAdmin />} />

              <Route path="allcustomer" element={<AllCustomer />} />
              <Route path="allseller" element={<AllSeller />} />
              <Route path="edit-admin/:id" element={<Edit />} />
              <Route path="category" element={<Category />} />
              <Route path="payment" element={<Payment />} />
              <Route path="notification" element={<Notification />} />
            </Route>
          </Route>
        </Route>


        {/* Seller */}
        <Route element={<ProtectedRoute allowedRoles={['seller']} />}>
          <Route path="/seller" element={<SellerLayout />}>
            <Route path='dashboard' element={<SellerDashboard />} >
              <Route index element={<MainSeller />} />

              <Route path="products" element={<Products />} />
              
            </Route>
          </Route>
        </Route>

        {/* Catch All */}
        <Route path="*" element={<ErrorPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default Routers;
