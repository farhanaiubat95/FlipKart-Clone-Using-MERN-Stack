import React, { useState } from 'react';
import { AppBar, Toolbar, Box, Typography, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../assets/images/flipkart-logo.png';
import plus from '../../../assets/images/plus.png';
import { styled } from '@mui/material/styles';

// import component
import NavButton from './OtherNavButton.jsx';
import OtherSearch from './OtherSearch.jsx';

// Icon
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { useSelector } from 'react-redux';

// Apply styles 
const StyledHeader = styled(AppBar)`
  background: #2874f0;
  height:60px;
  width:100%;
  z-index:10;
  box-shadow:none;
  margin:0 auto;
`;

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  width: '70%',
  minHeight: 60,
  margin: '0 auto',
  [theme.breakpoints.down('lg')]: {
    width: '100%',
    margin: "0 10px",
  }
}));

const StyledLogoSearch = styled(Box)(({ theme }) => ({
  width: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  [theme.breakpoints.down('lg')]: {
    width: '100%',
    justifyContent: 'left',
  },
}));

const StyledBox = styled(Box)(({ theme }) => ({
  lineHeight: 0,
  width: '15%',
  textAlign: 'right',
  marginRight: '10px',

  [theme.breakpoints.down('lg')]: {
    width: '40%',

  },

  [theme.breakpoints.down('md')]: {
    width: '100%',
    textAlign: 'left',
    marginRight: '0',
    marginTop: theme.spacing(1),
  },
}));

const StyledSearch = styled(Box)(({ theme }) => ({
  width: '85%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  [theme.breakpoints.down('lg')]: {
    width: '100%',
    justifyContent: 'left',
  },


}));

const StyledTypography = styled(Typography)`
    font-size: 12px;
    font-style: italic;
    display: flex;
    align-items: center;
    justify-content: start;

    &:hover {
        text-decoration: underline
    }

    &.MuiTypography-root.MuiTypography-subtitle1 {
        font-size: 11px;
        font-style: italic;
        color: #fff;
    }

    &.MuiTypography-root.MuiTypography-caption {
        font-size: 11px;
        font-style: italic;
        color: #fff;
    }

    &.MuiTypography-root.MuiTypography-body1 {
        font-size: 12px;
        font-style: italic;
        color: #fff;
    }

    &.MuiTypography-root.MuiTypography-body2 {
        font-size: 12px;
        font-style: italic;
        color: #fff;
    }
`;

const StyledNavButton = styled(Box)(({ theme }) => ({
  display: 'block',
  width: '50%',
  [theme.breakpoints.down('md')]: {
    display: "none",
    width: '100%',
  },
}));

const StyleHeaderBottom = styled(Box)`
   width: 100%;
   min-height: 55px; /* increase height */
   background-color: #fff;
   margin-top: 60px;
   padding: 10px 20px; /* horizontal padding only */
   display: flex;
   align-items: center;
   justify-content: center;
   border-bottom: 1px solid #e0e0e0;
`;

const StyyledBottomToolbar = styled(Box)(() => ({
  width: 1250,
  margin: "0 auto",
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const StyleIcon = styled(Box)` 
    border-radius: 5px;
    transition: all 0.3s ease-in-out;
    position: relative;
    cursor: pointer;
    color:rgba(164, 143, 143, 0.86);

    & > p{
      font-size: 14px;
      font-weight: 600;
    }
    &:hover .icon-box{
     display:block
    }

    &:hover .arrow-icon {
        transform: rotate(180deg);
        transition: transform 0.2s linear; /* Full speed */
    }
`;

// Nav items
const NavItem = [
  { label: 'Electronics', href: '/electronics' },
  { label: 'TVs & Appliances', href: '/tvs&Appliances' },
  { label: 'Men', href: '/men' },
  { label: 'Women', href: '/women' },
  { label: 'Baby & Kids', href: '/baby&Kids' },
  { label: 'Home & Furniture', href: '/home&Furniture' },
  { label: 'Sports, Books, More', href: '/toys-games' }
]


const OtherNavBar = () => {
  const user = useSelector((state) => state.Auth.user);

  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => () => setOpen(state);

  const drawerList = (
    <Box className="w-[220px] px-4 py-4" onClick={toggleDrawer(false)}>
      <List>
        <ListItem button>
          <NavButton />
        </ListItem>
      </List>
    </Box>
  );

  const isAdminOrSeller = user?.role === 'admin' || user?.role === 'seller';

  const location = useLocation();
  const isDashboardRoute = location.pathname.includes('/admin/dashboard') || location.pathname.includes('/seller/dashboard');;


  return (
    <>
      <StyledHeader
        position="fixed"
        className="shadow-none"
        sx={{ backgroundColor: isDashboardRoute ? '#06204b' : '#2874f0' }}
      >
        <StyledToolbar className="w-[95%] max-w-[1300px] mx-auto px-4 min-h-[60px] flex justify-between items-center">
          {/* Menu Button for small screens */}
          <div className=" md:hidden flex items-center">
            <IconButton onClick={toggleDrawer(true)} edge="start" color="inherit">
              <MenuIcon />
            </IconButton>
          </div>

          <Drawer
            anchor="left"
            open={open}
            onClose={toggleDrawer(false)}
            PaperProps={{ style: { backgroundColor: '#2874f0', color: '#fff' } }}
          >
            {drawerList}
          </Drawer>

          {/* Logo & Search */}
          <StyledLogoSearch>
            <StyledBox>
              <Box>
                {
                  user?.role === 'customer' ? (
                    <Link to='/myaccount' >
                      <img src={logo} alt="logo" style={{ width: 75 }} />
                    </Link>
                  ) : (
                    <Link to='/' >
                      <img src={logo} alt="logo" style={{ width: 75 }} />
                    </Link>
                  )
                }
              </Box>
              <Box style={{ ml: '10px' }}>
                <StyledTypography>
                  <Link href="#" style={{ color: '#fff', textDecoration: 'none' }}>Explore&nbsp;</Link>
                  <span style={{ color: '#ffe500' }}>Plus&nbsp;</span>
                  <img src={plus} alt="" style={{ width: 12 }} />
                </StyledTypography>
              </Box>
            </StyledBox>

            {/* Search */}
            <StyledSearch>
              <OtherSearch />
            </StyledSearch>

          </StyledLogoSearch>

          {/* Component add */}
          <StyledNavButton>
            <NavButton />
          </StyledNavButton>
        </StyledToolbar>
      </StyledHeader>

      {/* Spacer */}
      <Box className="mt-[60px]" />

      {/* Show StyleHeaderBottom only for customers and guests */}
      {!isAdminOrSeller && (
        <StyleHeaderBottom>
          <StyyledBottomToolbar>
            {
              NavItem.map(item => (
                <StyleIcon style={{ display: 'flex', alignItems: 'center' }} key={item.label}>
                  <Typography>{item.label}</Typography>&nbsp;
                  <KeyboardArrowDownIcon className="arrow-icon" style={{ fontSize: 16 }} />
                </StyleIcon>
              ))
            }
            <StyleIcon style={{ display: 'flex', alignItems: 'center' }}>
              <Typography>Flight</Typography>&nbsp;
            </StyleIcon>

            <StyleIcon style={{ display: 'flex', alignItems: 'center' }}>
              <Typography>Offer Zone</Typography>&nbsp;
            </StyleIcon>
          </StyyledBottomToolbar>
        </StyleHeaderBottom>
      )}
    </>
  );
};

export default OtherNavBar;
