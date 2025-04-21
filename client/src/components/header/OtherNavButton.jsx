import { useContext } from "react";
import { Box, Typography, Button, Badge } from "@mui/material";
import { styled } from "@mui/material/styles";
import { NavLink, Link } from "react-router-dom";

// Components
import { DataContext } from "../../context/DataProvider";
import Profile from "./Profile";

// Apply Icons
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"

// Icons
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
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
  },

  '& .cart1': {
    display: 'none',
  },

  [theme.breakpoints.down('md')]: {
    display: 'block',
    margin: '0 auto',
    width: '100%',

    '& .cart1': {
      display: 'flex',
    },

    '& .cart2': {
      display: 'none',
    },

    '& > p, & > div': {
      marginRight: '0',
      fontSize: '14px',
      fontWeight: 500,
      cursor: 'pointer',
      color: 'black',
    },

    '& > p:nth-child(2)': {
      display: 'none',
    },

    '& > div:nth-child(3)': {
      display: 'none',
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
  marginRight: '40px',
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
    textDecoration: 'none',

    '&:hover': {
      background: 'rgba(191, 193, 198, 0.32)',
      boxShadow: 'none',  // remove hover shadow
      border: 'none',     // remove hover border
      textDecoration: 'none',
    },
  },
}));



const StyleIcon = styled(Box)(({ theme }) => ({
  padding: '7px',
  borderRadius: '5px',
  transition: 'all 0.3s ease-in-out',
  margin: '0  auto',
  display: 'block',
  position: 'relative',

  '&:hover .icon-box': {
    display: 'block',
  },

  '&:hover .arrow-icon': {
    transform: 'rotate(180deg)',
    transition: 'transform 0.2s linear',
  },

  [theme.breakpoints.down('md')]: {
    margin: '0 auto',
    width: '100%',
    marginBottom: '15px',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 0',

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
  boxShadow:
    '0 4px 8px 0 rgba(127, 123, 123, 0.2), 0 6px 20px 0 rgba(121, 115, 115, 0.19)',
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

  '& > p': {
    fontSize: '15px',
    fontWeight: 500,
    color: '#4c4848',
  },
}));

const StyledNavLink = styled(NavLink)(({ theme }) => ({
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
    margin: '0 auto',
    width: '100%',
    marginBottom: '15px',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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

const OtherNavButton = () => {

  const { account, setAccount } = useContext(DataContext);

  const { CartItems } = useSelector((state) => state.cart);
  console.log(CartItems.length);
  return (
    <StyledBox>
      {
        account ? <Profile account={account} setAccount={setAccount} /> :
          <>
            {/* Link common */}
            <StyledLink component={Link} to="/login" variant="contained">
              Login
            </StyledLink>
          </>
      }

      <StyledNavLink className='cart1' to={"/cart"} >
        <Box style={{ display: "flex", alignItems: "center" }}>
          <StyledBadge badgeContent={CartItems?.length} color="secondary">
            <ShoppingCart />
          </StyledBadge>
          <Typography style={{ fontWeight: 500, marginLeft: 5 }}>&nbsp;Cart</Typography>
        </Box>
      </StyledNavLink>

      <StyledNavLink to={"/seller"}>
        <Typography style={{ fontWeight: 500, fontSize: '16px' }}>Become a Seller</Typography>
      </StyledNavLink>

      <StyleIcon>
        <Typography style={{ display: 'flex', alignItems: 'center' }}>
          <Typography>More</Typography>&nbsp;
          <KeyboardArrowDownIcon className="arrow-icon" style={{ fontSize: 16 }} />
        </Typography>

        <StyleIconBox className="icon-box">
          <StyledIconText><NotificationsNoneIcon /><Typography>Notification Preferences</Typography> </StyledIconText>
          <StyledIconText><HeadsetMicIcon /><Typography>24x7 Customer Care</Typography> </StyledIconText>
          <StyledIconText><TrendingUpIcon /><Typography>Advertise</Typography> </StyledIconText>
          <StyledIconText><SystemUpdateAltIcon /><Typography>Download App</Typography> </StyledIconText>
        </StyleIconBox>
      </StyleIcon>

      <StyledNavLink className='cart2' to={"/cart"} >
        <Box style={{ display: "flex", alignItems: "center" }}>
          <Badge badgeContent={CartItems?.length} color="secondary"
           sx={{
            '& .MuiBadge-badge':
            {
              backgroundColor: 'red',
              color: 'white',
              minWidth: '16px',
              height: '16px',
              fontSize: '10px',
              padding: '0 4px',
            }
          }}
          >
            <ShoppingCart />
          </Badge>
          <Typography style={{ fontWeight: 500, marginLeft: 5 }}>&nbsp;Cart</Typography>
        </Box>
      </StyledNavLink>
    </StyledBox>
  );
};



export default OtherNavButton
