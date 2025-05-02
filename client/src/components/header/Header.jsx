import React from 'react';
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

// Components
import HomeNavBar from './homeHeader/HomeNavBar';
import OtherNavBar from './OtherHeader/OtherNavBar';

const Header = () => {
  const location = useLocation();
  const user = useSelector((state) => state.Auth.user);

  const isHomePage = location.pathname === "/";

  const isLoggedIn = user && (user.role === 'admin' || user.role === 'seller');

  return (
    <div>
      {isLoggedIn ? (
        <OtherNavBar />
      ) : (
        <>
          {isHomePage ? <HomeNavBar /> : <OtherNavBar />}
        </>
      )}
    </div>
  );
}

export default Header;
