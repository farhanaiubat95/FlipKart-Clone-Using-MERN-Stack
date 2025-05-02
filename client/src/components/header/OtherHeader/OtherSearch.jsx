import React from 'react'
import { Box, InputBase } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from 'react-router-dom';

// Import icons
import SearchIcon from '@mui/icons-material/Search';


// Apply styles
const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  width: '100%',
  // marginLeft: '10px',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',

}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  paddingLeft: "20px",
  height: "36px",
  width: "100%",
  fontSize: "14px",
  color: "rgb(0, 0, 0)",

  "&::placeholder": {  // ✅ Corrected Syntax
    color: "rgb(8, 8, 8)",
    fontSize: "14px",
  },
  [theme.breakpoints.down('lg')]: {
    width: '70%',
    paddingLeft: "10px",
  },
  [theme.breakpoints.down('md')]: {
    width: '70%',
    paddingLeft: "10px",
  }
}));
const OtherSearch = () => {
  return (
    <StyledBox>
       <StyledInputBase
        placeholder='Search for products, brands and more'
        // onChange={(e) => getText(e.target.value)}
        // value={text} // Controlled input 
      />
       <Box style={{ position: 'absolute', right: 7 }} >
        <SearchIcon style={{ paddingRight: 10, paddingTop: 5, color: '#2874f0', fontSize: 35, cursor: 'pointer' }} />
      </Box>

    </StyledBox>
  )
}

export default OtherSearch
