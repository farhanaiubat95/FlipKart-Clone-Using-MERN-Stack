import React from 'react'
import { AppBar, Toolbar, Box, Typography, IconButton, Drawer, List, ListItem } from '@mui/material'
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { useState } from 'react';

// Icon
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import MenuIcon from '@mui/icons-material/Menu';

// import component
import Search from './Search'
import NavButton from './NavButton';

// logo images
import logo from '../../assets/images/flipkart-logo.png'
import plus from '../../assets/images/plus.png'


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
    [theme.breakpoints.down('md')]: {
        width: '100%',
        margin: "0 10px",
    }
}));
const StyleHeaderBottom = styled(Box)`
   width:100%;
   height:45px;
   line-height:25px;
   background-color:#fff;
   margin-top:60px;
   box-shadow: rgba(151, 140, 140, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
   padding:10px;
`;

const StyyledBottomToolbar = styled(Box)(() => ({
    width: 1250,
    margin: "0 auto",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

}));

const StyledLogoSearch = styled(Box)(({ theme }) => ({
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    [theme.breakpoints.down('md')]: {
        width: '100%',
        justifyContent: 'left',
    },
}));

const StyledBox = styled(Box)`
    line-height: 0;
    width: 25%;
    text-align: right;
    margin-Right: 10px;
`;
const StyledTypography = styled(Typography)`
    font-size: 11px;
    font-style: italic;
    margin-left: 5px;

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
        font-size: 11px;
        font-style: italic;
        color: #fff;
    }

    &.MuiTypography-root.MuiTypography-body2 {
        font-size: 11px;
        font-style: italic;
        color: #fff;
    }
`;
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

const MenuButton = styled(IconButton)(({ theme }) => ({
    display: "none",
    [theme.breakpoints.down('md')]: {
        display: "block",
        marginRight: "10px",
    },
}));

const StyledNavButton = styled(Box)(({ theme }) => ({
    display: 'block',
    width: '50%',
    [theme.breakpoints.down('md')]: {
        display: "none",
        width: '100%',
    },
}));


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


// Header component
const OtherNavBar = () => {

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
        <>
            <StyledHeader>
                <StyledToolbar>
                    <MenuButton color='inherit' edge="start" onClick={handleOpen}>
                        <MenuIcon />
                    </MenuButton>

                    {/* Left drawer */}
                    <Drawer
                        anchor="left"
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            style: {
                                backgroundColor: '#2874f0',
                                color: '#fff',
                            },
                        }}
                    >
                        {list()}
                    </Drawer>


                    <StyledLogoSearch>
                        <StyledBox>
                            <Box>
                                <Link to="/">
                                    <img src={logo} alt="logo" style={{ width: 75 }} />
                                </Link>
                            </Box>
                            <Box style={{  }}>
                                <StyledTypography style={{ textAlign: 'right' }}>
                                    <Link href="" style={{ color: '#fff', textDecoration: 'none' }}>Explore&nbsp;
                                        <Box component="span" style={{ color: '#ffe500' }}>Plus&nbsp;</Box>
                                    </Link>
                                    <img src={plus} alt="" style={{ width: 11 }} />
                                </StyledTypography>
                            </Box>
                        </StyledBox>
                        <Search />
                    </StyledLogoSearch>

                    {/* Component add */}
                    <StyledNavButton>
                        <NavButton />
                    </StyledNavButton>
                </StyledToolbar>
            </StyledHeader>

            <StyleHeaderBottom>
                <StyyledBottomToolbar>
                    {
                        NavItem.map(item => (
                            <StyleIcon
                                style={{ display: 'flex', alignItems: 'center' }}>
                                <Typography>{item.label}</Typography>&nbsp;
                                <KeyboardArrowDownIcon className="arrow-icon" style={{ fontSize: 16 }} />
                            </StyleIcon>
                        ))
                    }
                    <StyleIcon
                        style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography>Flight</Typography>&nbsp;
                    </StyleIcon>

                    <StyleIcon
                        style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography>Offer Zone</Typography>&nbsp;
                    </StyleIcon>

                </StyyledBottomToolbar>
            </StyleHeaderBottom>
        </>
    )
}

export default OtherNavBar
