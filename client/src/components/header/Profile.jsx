import { useState } from 'react';
import { Box, Link, Menu, MenuItem, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLocation } from "react-router-dom";


//Icons
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

// Apply styles
const StyledAccountLink = styled(Link)`
  text-align: center;
  text-decoration: none;
  color: #d1d1d1;
  margin-left: 30px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;
const Component = styled(Menu)`
    margin-top: 23px;
    margin-left: 30px;
`;
const Logout = styled(Typography)`
    margin-left: 10px;
    font-size: 14px;
`;

const Profile = ({account, setAccount }) => {
    const location = useLocation();
    const isHomePage = location.pathname === "/";
    const [open, setOpen] = useState(false);

    const handleClick = (event) => {
        setOpen(event.currentTarget);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const logoutUser = () => {
        setAccount('');
    }

    return (
        <>
            {isHomePage ? <Box onClick={handleClick}><StyledAccountLink style={{ color: 'black' }}>{account}</StyledAccountLink></Box> :
                <Box onClick={handleClick}><StyledAccountLink style={{ color: 'white' }}>{account}</StyledAccountLink></Box>}
            <Component
                anchorEl={open}
                open={Boolean(open)}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => { handleClose(); logoutUser(); }}>
                    <PowerSettingsNewIcon color='primary' fontSize='small' />
                    <Logout>Logout</Logout>
                </MenuItem>
            </Component>
        </>
    )
}

export default Profile
