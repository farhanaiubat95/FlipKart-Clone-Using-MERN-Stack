import { useContext } from "react";
import { Badge, Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { NavLink, Link } from "react-router-dom";


// Components
import { DataContext } from "../../context/DataProvider";
import Profile from "./Profile";

// Apply Icons
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// Icons
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import StorefrontIcon from '@mui/icons-material/Storefront';

// Redux
import { useSelector } from "react-redux";

// Apply styles
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

  '&:hover': {
    background: 'rgb(27, 90, 238)',
  },

  '&:hover > *': {
    color: 'white',
  },
  '&:hover .arrow-icon': {
    transform: 'rotate(180deg)',
    transition: 'transform 0.2s linear',
  },

  [theme.breakpoints.down('md')]: {
    margin: '0 auto',
    width: '100%',
    padding: '10px 0',
    textAlign: 'center',
    fontSize: '14px',
    margin: '20px 0',


    '&:hover': {
      background: 'rgba(191, 193, 198, 0.32)',
    },

    '&:hover > *': {
      color: 'black',
    },

  },
}));

const StyleIcon = styled(Box)(({ theme }) => ({
  padding: '7px',
  borderRadius: '5px',
  border: '1px solid transparent',
  transition: 'all 0.3s',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: '5px',

  '&:hover': {
    border: '1px solid #6c686875',
    backgroundColor: '#c0b2b224',
  },

  '&:hover .icon-box': {
    display: 'block',
  },

  // Default: large screen
  '& .moreVertIcon': {
    display: 'block',
    fontSize: '25px',
    color: '#a8a6b7d9',
  },
  '& .moreText': {
    width: '100%',
    display: 'none',
    alignItems: 'center',
    fontSize: '16px',
    fontWeight: 500,
    color: 'black',
    gap: '4px',
    paddingLeft: '25px',
  },
  '&:hover .arrow-icon': {
    transform: 'rotate(180deg)',
    transition: 'transform 0.2s linear',
  },

  // Small screen: hide icon, show text
  [theme.breakpoints.down('md')]: {
    width: '100%',
    border: 'none',
    margin: '0 auto',

    '&:hover': {
      border: 'none',
      backgroundColor: 'rgba(191, 193, 198, 0.32)',
    },

    '& .moreVertIcon': {
      display: 'none',
    },
    '& .moreText': {
      display: 'flex',
    },
  },
}));

const StyleIconBox = styled(Box)(({ theme }) => ({
  background: '#fff',
  width: '240px',
  borderRadius: '6px',
  border: '1px solid white',
  boxShadow: '0 4px 8px 0 rgba(127, 123, 123, 0.2), 0 6px 20px 0 rgba(121, 115, 115, 0.19)',
  position: 'absolute',
  top: '38px',
  right: '0',
  display: 'none',

  [theme.breakpoints.down('md')]: {
    left: '-25px',
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

  '& > p': {
    fontSize: '15px',
    fontWeight: 500,
    color: '#4c4848',
  },
}));

const StyledNavLink = styled(NavLink)(({ theme }) => ({
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

    '&:hover': {
      background: 'rgba(191, 193, 198, 0.32)',
    },

    '& > *': {
      width: '8 0%',
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },


  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: 'red',
    color: 'white',
    minWidth: '14px',
    height: '14px',
    fontSize: '10px',
    padding: '0 4px',
    marginTop: '0px',

    [theme.breakpoints.down('md')]: {
      marginTop: '7px',      
    },
  },
}));


const HomeNavButton = () => {

  const { account, setAccount } = useContext(DataContext);

  const { CartItems } = useSelector((state) => state.cart);
  console.log(CartItems.length);
  return (
    <StyledBox>
      {
        account ? <Profile account={account} setAccount={setAccount} /> :
          <>
            {/* Link common */}
            <StyledLink
              to={"/login"}
              style={{ textDecoration: "none", color: "rgb(45, 47, 51)" }}
            >
              <AccountCircleIcon style={{ fontSize: 20 }} />
              <Button style={{ color: "rgb(45, 47, 51)", padding: '0px' }}>Login</Button>

              <KeyboardArrowDownIcon className="arrow-icon" />
            </StyledLink>
          </>
      }

      {/* Cart */}
      <StyledNavLink to={"/cart"}  >
        <Box style={{ display: "flex", alignItems: "center" }}>
          <StyledBadge badgeContent={CartItems?.length} color="secondary">
            <ShoppingCart />
          </StyledBadge>
          <Typography style={{ fontWeight: 500, marginLeft: 5 }}>&nbsp;Cart</Typography>
        </Box>
      </StyledNavLink>

      {/* Seller */}
      <StyledNavLink to={"/seller"} >
        <Box style={{ display: "flex", alignItems: "center" }}>
          <StorefrontIcon style={{ fontWeight: 500 }} />
          <Typography style={{ fontWeight: 500, marginLeft: 5 }}>&nbsp;Become a Seller</Typography>
        </Box>
      </StyledNavLink>

      <StyleIcon>
        <MoreVertIcon className="moreVertIcon" />
        <Box className="moreText">
          <Typography style={{ fontWeight: 500 }}>More</Typography>
          <KeyboardArrowDownIcon className="arrow-icon" />
        </Box>

        <StyleIconBox className="icon-box">
          <StyledIconText><NotificationsNoneIcon /><Typography>Notification Preferences</Typography></StyledIconText>
          <StyledIconText><HeadsetMicIcon /><Typography>24x7 Customer Care</Typography></StyledIconText>
          <StyledIconText><TrendingUpIcon /><Typography>Advertise</Typography></StyledIconText>
          <StyledIconText><SystemUpdateAltIcon /><Typography>Download App</Typography></StyledIconText>
        </StyleIconBox>
      </StyleIcon>

    </StyledBox>
  );
};


export default HomeNavButton
