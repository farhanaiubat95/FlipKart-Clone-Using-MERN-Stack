import React from "react";
import { useLocation } from "react-router-dom";


// Component
import HomeNavButton from "./HomeNavButton";
import OtherNavButton from "./OtherNavButton";

const NavButton = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <>
      {isHomePage && <HomeNavButton />}
      {!isHomePage && <OtherNavButton />}
    </>
  );
};

export default NavButton;
