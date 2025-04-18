import React from 'react';
import { Box, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Import data component
import { navData } from '../../constants/data.js';

// Icon
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// Apply styles
const StyledBox = styled(Box)(({ theme }) => ({
  maxWidth: '1200px',
  margin: '0 auto',
  marginTop: "74px",
  backgroundColor: "#ffffff",
  padding: "15px 160px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center", // Center align when wrapped
  overflow: "hidden",

  [theme.breakpoints.down('md')]: {
    width: '1100px',
    margin: '0 30px',
    marginTop: "74px",
  },


}));

const StyledBox1 = styled(Link)`
  width: 130px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;  
  padding: 10px 26px;  

  & > img {
    width: 64px;
  }

  &:hover .arrow-icon {
    transform: rotate(180deg);
    transition: transform 0.2s linear;
  }
`;

const StyleIcon = styled(Box)`
  border-radius: 5px;
  margin: 0 6px;
  text-align: center;
  transition: all 0.3s ease-in-out;
  position: relative;
  cursor: pointer;
  color: rgba(164, 143, 143, 0.86);

  &:hover .icon-box {
    display: block;
  }
`;

const StyledTypography = styled(Typography)(({ theme }) => ({
  width: "100px",
  fontSize: "14px",
  fontWeight: 700,
  color: "rgb(0, 0, 0)",
  cursor: "pointer",
  textAlign: "center",
  marginTop: "5px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "100%",

}));



// Main Component
const HomeNav = () => {
  return (
    <StyledBox>
      {navData.map(data => (
        <StyledBox1 key={data.text}>
          <img src={data.url} alt={data.text} />
          <StyleIcon style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <StyledTypography>{data.text}</StyledTypography>
            {Number(data.menu) === 1 && <KeyboardArrowDownIcon style={{marginTop: "5px"}} className="arrow-icon" />}
          </StyleIcon>
        </StyledBox1>
      ))}
    </StyledBox>
  );
};

export default HomeNav;
