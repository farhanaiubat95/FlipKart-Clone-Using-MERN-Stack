import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const SellerLayout = () => {
  const user = useSelector((state) => state.Auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role !== 'seller') {
      navigate("/"); // Not an admin? Kick out to home
    }
  }, [user, navigate]);
 

  return (
    <div>
      <Outlet />
    </div>
  )
}

export default SellerLayout
