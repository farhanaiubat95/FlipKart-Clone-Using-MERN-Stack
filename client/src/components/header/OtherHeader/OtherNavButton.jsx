import React from 'react';
import { Box, Typography, Button, Badge } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";

// API
import { post } from "../../../API/ApiEndPoints";

// Redux
import { Logout } from "../../../redux/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

// Icons
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';

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
  },
  [theme.breakpoints.down('md')]: {
    display: 'block',
    margin: '0 auto',
    width: '100%',
    '& > p, & > div': {
      marginRight: '0',
      fontSize: '14px',
      color: 'black',
    },
  },
}));

const StyledLink = styled(Button)(({ theme }) => ({
  color: '#2875f0',
  background: '#fff',
  fontSize: '15px',
  fontWeight: 600,
  height: '30px',
  textTransform: 'none',
  width: '120px',
  padding: '5px',
  border: 'none',
  borderRadius: 0,
  marginLeft: '40px',
  textDecoration: 'none',
  [theme.breakpoints.down('md')]: {
    margin: '20px auto',
    width: '100%',
    padding: '23px 20px',
    borderRadius: '5px',
    color: '#ffffff',
    background: 'none',
    fontWeight: 'bold',
    boxShadow: 'none',
    textAlign: 'center',
    '&:hover': {
      background: 'rgba(191, 193, 198, 0.32)',
      boxShadow: 'none',
      border: 'none',
    },
  },
}));

const StyledNavLink = styled(Link)(({ theme }) => ({
  height: '44px',
  width: '120px',
  fontSize: '16px',
  cursor: 'pointer',
  textTransform: 'none',
  background: 'transparent',
  borderRadius: '5px',
  boxShadow: 'none',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '5px',
  textDecoration: 'none',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginBottom: '15px',
    padding: '10px 0',
    '&:hover': {
      background: 'rgba(191, 193, 198, 0.32)',
    },
    '& > *': {
      fontSize: '16px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
}));

const StyleIcon = styled(Box)(({ theme }) => ({
  padding: '7px',
  borderRadius: '5px',
  transition: 'all 0.3s ease-in-out',
  marginLeft: '20px',
  position: 'relative',
  '&:hover .icon-box': {
    display: 'block',
  },
  '&:hover .arrow-icon': {
    transform: 'rotate(180deg)',
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginBottom: '15px',
    padding: '10px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > *': {
      color: 'white',
    },
    '&:hover': {
      background: 'rgba(191, 193, 198, 0.32)',
    },
  },
}));

const StyleIconBox = styled(Box)(({ theme }) => ({
  background: '#fff',
  width: '240px',
  borderRadius: '6px',
  border: '1px solid white',
  boxShadow: '0 4px 8px rgba(127, 123, 123, 0.2), 0 6px 20px rgba(121, 115, 115, 0.19)',
  position: 'absolute',
  top: '38px',
  right: 0,
  display: 'none',
  [theme.breakpoints.down('md')]: {
    left: '-25px',
    top: '42px',
  },
}));

const StyledIconText = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  padding: '10px 10px',
  '&:hover': {
    backgroundColor: '#c0b2b224',
  },
  '& > svg': {
    fontSize: '20px',
    color: '#4c4848',
    marginRight: '16px',
  },
  '& > ': {
    fontSize: '15px',
    fontWeight: 500,
    color: '#4c4848',
  },
}));

const StyledLoginButton = styled(Box)(({ theme }) => ({
  position: 'relative',
  '&:hover .dropdown-menu': {
    display: 'flex',
  },
}));

const DropdownMenu = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 32,
  left: 40,
  backgroundColor: 'white',
  border: '1px solid #ccc',
  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  width: '120px',
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
  [theme.breakpoints.down('md')]: {
    left: '-25px',
    top: '42px',
  },
}));

const OtherNavButton = () => {
  const user = useSelector((state) => state.Auth.user);
  const cartItems = useSelector((state) => state.Cart.cart?.cartItems || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const request = await post('/logout');
      if (request.status === 200) {
        dispatch(Logout());
        navigate("/login");
      } else {
        console.error("Logout failed:", request.data.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const userRole = user?.role || null;

  return (
    <StyledBox>
      <StyledLoginButton>
        {user ? (
          <StyledLink>
            <span>{user.username || "Profile"}</span>
          </StyledLink>
        ) : (
          <StyledLink component={Link} to="/login" variant="contained">
            Login
          </StyledLink>
        )}
        {user && (
          <DropdownMenu className="dropdown-menu">
            <Link to="/profile">Profile</Link>
            <div><button onClick={handleLogout} className="cursor-pointer">Logout</button></div>
          </DropdownMenu>
        )}
      </StyledLoginButton>

      <Box style={{ display: "flex", alignItems: "center" }}>
        {userRole === "customer" && (
          <>
            <StyledNavLink to={"/myaccount/cart"}>
              <Badge
                badgeContent={cartItems.length}
                color="secondary"
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: '#7D0A0A',
                    color: 'white',
                    right: -7,
                    top: 2,
                  },
                }}
              >
                <Box style={{ display: "flex", alignItems: "center" }}>
                  <ShoppingCart />
                  <Typography style={{ fontWeight: 500, marginLeft: 5 }}>&nbsp;Cart</Typography>
                </Box>
              </Badge>
            </StyledNavLink>

            <StyledNavLink to={"/myaccount/AllOrders"}>
              <Box style={{ display: "flex", alignItems: "center" }}>
                <PlaylistAddCheckCircleIcon />
                <Typography style={{ fontWeight: 500, marginLeft: 5 }}>&nbsp;Order List</Typography>
              </Box>
            </StyledNavLink>
          </>
        )}

        {user && userRole === "admin" && (
          <StyledNavLink to={"/admin/dashboard"}>
            <Typography style={{ fontWeight: 500 }}>Dashboard</Typography>
          </StyledNavLink>
        )}

        {user && userRole === "seller" && (
          <StyledNavLink to={"/seller/dashboard"}>
            <Typography style={{ fontWeight: 500 }}>Become a Seller</Typography>
          </StyledNavLink>
        )}

        {!user && (
          <StyledNavLink to={"/seller/dashboard"}>
            <Typography style={{ fontWeight: 500 }}>Become a Seller</Typography>
          </StyledNavLink>
        )}

        <StyleIcon>
          <Typography style={{ display: 'flex', alignItems: 'center' }}>
            <span>More</span>&nbsp;
            <KeyboardArrowDownIcon className="arrow-icon" style={{ fontSize: 16 }} />
          </Typography>
          <StyleIconBox className="icon-box">
            <StyledIconText><NotificationsNoneIcon /><Typography>Notification Preferences</Typography></StyledIconText>
            <StyledIconText><HeadsetMicIcon /><Typography>24x7 Customer Care</Typography></StyledIconText>
            <StyledIconText><TrendingUpIcon /><Typography>Advertise</Typography></StyledIconText>
            <StyledIconText><SystemUpdateAltIcon /><Typography>Download App</Typography></StyledIconText>
          </StyleIconBox>
        </StyleIcon>
      </Box>
    </StyledBox>
  );
};

export default OtherNavButton;
