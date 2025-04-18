import React from 'react'
import { AppBar, Toolbar, Box, IconButton, Drawer, List, ListItem } from '@mui/material'
import { Link, useLocation } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { useState } from 'react';

// Apply Icons
import MenuIcon from '@mui/icons-material/Menu';

// import component
import Search from './Search'
import NavButton from './NavButton';

// logo images
import logo from '../../assets/images/logo-1.png'


// Apply styles 
const StyledHeader = styled(AppBar)`
  background-color: #ffffff;
  height:66px;
  width:100%;
  z-index:10;
  box-shadow:none;
  margin:0 auto;

`;
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    width: '80%',
    minHeight: 66,
    marginLeft: 190,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
        width: '100%',
        margin: "0 10px",
    }
}));



const StyledBox = styled(Box)`
    line-height: 0;
`;

const MenuButton = styled(IconButton)(({ theme }) => ({
    display: "none",
    [theme.breakpoints.down('md')]: {
        display: "block",
        marginRight: "10px",
    },
}));

const StyledNavButton = styled(Box)(({ theme }) => ({
    display: 'block',
     width: '40%',
    [theme.breakpoints.down('md')]: {
        display: "none",
    },
}));

const StyledLogoSearch = styled(Box)(({ theme }) => ({
    width: '60%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
        width: '100%',
        justifyContent: 'space-between',
    },
}));

// Header component
const HomeNavBar = () => {
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        // Handle menu open logic here
        setOpen(true);
    }
    const handleClose = () => {
        // Handle menu close logic here
        setOpen(false);
    }

    const list = () => (
        <Box style={{ width: 220 }} onClick={handleClose}>
            <List>
                <ListItem button>
                    <NavButton />
                </ListItem>
            </List>
        </Box>
    );

    return (
        <StyledHeader>
            <StyledToolbar>
                <MenuButton color='#2874f0' edge="start" onClick={handleOpen}>
                    <MenuIcon />
                </MenuButton>

                <Drawer
                    anchor="left"
                    open={open}
                    onClose={handleClose}
                >
                    {list()}
                </Drawer>

                {/* Logo */}
                <StyledLogoSearch >
                    <StyledBox>
                        <Link to={isHomePage}>
                            <img src={logo} alt="logo" style={{ width: 90 }} />
                        </Link>
                    </StyledBox>
                    <Search />
                </StyledLogoSearch>

                {/* Component add */}

                <StyledNavButton>
                    <NavButton />
                </StyledNavButton>
            </StyledToolbar>
        </StyledHeader>
    )
}

export default HomeNavBar
