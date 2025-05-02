import { Badge, Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";

import { post } from "../../../API/ApiEndPoints"
import { Logout } from "../../../redux/AuthSlice";

// Icons
import StorefrontIcon from '@mui/icons-material/Storefront';
import { ShoppingCart, AccountCircle, KeyboardArrowDown, NotificationsNone, HeadsetMic, TrendingUp, SystemUpdateAlt } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";


const StyledBox = styled(Box)(({ theme }) => ({
  margin: '0 3% 0 auto',
  lineHeight: 0,
  display: 'flex',
  alignItems: 'center',

  '& > p, & > div': {
    marginRight: '30px',
    fontSize: '16px',
    fontWeight: 500,
    cursor: 'pointer',
    color: 'black',
  },

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  height: '44px',
  width: '120px',
  padding: '0',
  fontSize: '16px',
  cursor: 'pointer',
  textTransform: 'none',
  background: 'transparent',
  borderRadius: '5px',
  boxShadow: 'none',
  color: 'rgb(45, 47, 51)',
  marginLeft: '25px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '5px',
  position: 'relative', // for dropdown

  '&:hover': {
    background: 'rgb(27, 90, 238)',
    color: 'white',
  },
  "&:hover .arrow-icon": {
    transform: "rotate(180deg)",
    transition: "transform 0.2s linear",
  },
}));

const StyledNavLink = styled(Link)(({ theme }) => ({
  marginLeft: 25,
  color: 'black',
  textDecoration: 'none',
  padding: '7px',

  [theme.breakpoints.down('md')]: {
    margin: '0 auto',
    padding: '10px 0',
    width: '100%',
    paddingLeft: '25px',
    marginBottom: '20px',
    borderRadius: '5px',
  },
}));

const DropdownMenu = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 45,
  left: 23,
  backgroundColor: 'white',
  border: '1px solid #ccc',
  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  width: '120px',
  borderRadius: '5px',
  zIndex: 100,
  display: 'none',
  flexDirection: 'column',

  '& a, & div': {
    padding: '20px 10px',
    textAlign: 'center',
    fontSize: '14px',
    color: 'black',
    textDecoration: 'none',
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },
}));


const StyledLoginButton = styled(Box)(({ theme }) => ({
  position: 'relative',
  '&:hover .dropdown-menu': {
    display: 'flex',
  },
}));

const HomeNavButton = () => {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = async () => {
    try {
      const request = await post('/logout'); // API call
      if (request.status === 200) { // check request.status, not response.status
        dispatch(Logout());
        navigate("/login");
      } else {
        console.error("Logout failed:", request.data.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <StyledBox>
      {/* Login or Profile */}
      <StyledLoginButton>
        {user ? (
          <StyledLink >
            <AccountCircle className="text-[20px]" />
            <span>{user.username || "Profile"}</span>
            <KeyboardArrowDown className="arrow-icon transition-transform duration-200" />
          </StyledLink>
        ) : (
          <StyledLink to="/login">
            <AccountCircle className="text-[20px]" />
            <span>Login</span>
            <KeyboardArrowDown className="arrow-icon transition-transform duration-200" />
          </StyledLink>
        )}

        {/* Dropdown for logged-in user */}
        {user && (
          <DropdownMenu className="dropdown-menu">
            <Link to="/profile">Profile</Link>
            <div><button onClick={handleLogout} className="cursor-pointer">Logout</button></div>
          </DropdownMenu>
        )}
      </StyledLoginButton>

      {/* Cart */}
      <StyledNavLink to="/cart">
        <Box style={{ display: "flex", alignItems: "center" }}>
          <ShoppingCart />
          <Typography style={{ fontWeight: 500, marginLeft: 5 }}>&nbsp;Cart</Typography>
        </Box>
      </StyledNavLink>

      {/* Seller */}

      <StyledNavLink to="/seller" style={{ paddingRight: '10px' }}>
        <Box style={{ display: "flex", alignItems: "center" }}>
          <StorefrontIcon style={{ fontWeight: 500 }} />
          <Typography style={{ fontWeight: 500, marginLeft: 5 }}>&nbsp;Become a Seller</Typography>
        </Box>
      </StyledNavLink>

    </StyledBox>
  );
};

export default HomeNavButton;
