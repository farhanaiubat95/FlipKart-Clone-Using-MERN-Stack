import { useLocation } from "react-router-dom";

// Components
import HomeNavButton from "./homeHeader/HomeNavButton.jsx";
import OtherNavButton from "./OtherHeader/OtherNavButton.jsx";
const NavButton = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div>
      {isHomePage && <HomeNavButton/>}
      {!isHomePage && <OtherNavButton/>}
    </div>
  );
};

export default NavButton;
