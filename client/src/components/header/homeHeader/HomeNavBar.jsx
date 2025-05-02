// src/components/HomeNavBar.jsx
import React, { useState } from 'react';
import { AppBar, Toolbar, Drawer, IconButton, List, ListItem, Link, } from '@mui/material';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';

// Apply Icons
import MenuIcon from '@mui/icons-material/Menu';

// import component
import HomeSearch from '../homeHeader/HomeSearch.jsx';
import HomeNavButton from './HomeNavButton.jsx';

// logo images
import logo from '../../../assets/images/logo-1.png'


// Apply styles
const StyledHeader = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#ffffff" : "#1e1e1e",
  height: "66px",
  zIndex: 10,
  boxShadow: "none",
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  width: '75%',
  minHeight: 66,
  margin: "0 auto",
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  [theme.breakpoints.down('lg')]: {
    width: '100%',
    margin: "0",
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    margin: "0 10px",
  }
}));


const StyledLogoSearch = styled(Box)(({ theme }) => ({
  width: '60%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'celeftnter',
  [theme.breakpoints.down('lg')]: {
    width: '40%',
    justifyContent: 'left',
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    justifyContent: 'space-between',
  },
}));

const StyledBox = styled(Box)(({ theme }) => ({
  width: '10%',

  [theme.breakpoints.down('lg')]: {
    width: '40%',
    justifyContent: 'left',
  },

}));

const StyledSearch = styled(Box)(({ theme }) => ({
  width: '90%',

  [theme.breakpoints.down('lg')]: {
    width: '60%',
    justifyContent: 'right',
  },

}));

const StyledNavButton = styled(Box)(({ theme }) => ({
  display: 'block',
  width: '40%',
  [theme.breakpoints.down('lg')]: {
    width: '60%',
    justifyContent: 'right',
  },
  [theme.breakpoints.down('md')]: {
    display: "none",
  },
}));

const HomeNavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const drawerList = (
    <Box style={{ width: 220 }} >
      <List>
        <ListItem button>
          <HomeNavButton />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <StyledHeader position="static" color="default" elevation={1}>
        <StyledToolbar >
          {/* Logo */}
          <StyledLogoSearch >
            <StyledBox>
              <Link to="/">
                <img src={logo} alt="logo" style={{ width: 90 }} />
              </Link>
            </StyledBox>

            {/* Search */}
            <StyledSearch>
              <HomeSearch />
            </StyledSearch>
          </StyledLogoSearch>

          {/* Component add */}

          <StyledNavButton>
            <HomeNavButton />
          </StyledNavButton>

          {/* Menu Button for small screens */}
          <div className="md:hidden flex items-center">
            <IconButton onClick={toggleDrawer(true)} edge="start" color="inherit">
              <MenuIcon />
            </IconButton>
          </div>
        </StyledToolbar>
      </StyledHeader>

      {/* MUI Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div className="w-[220px]" role="presentation" onClick={toggleDrawer(false)}>
          {drawerList}
        </div>
      </Drawer>

     
    </>
  );
};

export default HomeNavBar;


