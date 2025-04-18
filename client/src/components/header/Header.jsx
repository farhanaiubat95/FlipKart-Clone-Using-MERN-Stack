import React from 'react'
import { useLocation  } from "react-router-dom";


// component
import HomeNavBar from './HomeNavBar';
import OtherNavBar from './OtherNavBar';

// Header component
const Header = () => {
    const location = useLocation();
    const isHomePage = location.pathname === "/";
    return (
       <div>
            {isHomePage && <HomeNavBar/>}
            {!isHomePage && <OtherNavBar/>}
       </div>
    )
  }
export default Header;
