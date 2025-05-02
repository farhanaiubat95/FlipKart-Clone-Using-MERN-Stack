import React from 'react';
import { Box, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Import data component
import { navData } from '../../constants/data.js';

// Icon
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// Apply styles
const StyledBox = styled(Box)(({ theme }) => ({

  display: "flex",
  alignItems: "center",
  justifyContent: "center", // Center align when wrapped

  [theme.breakpoints.down('lg')]: {
    justifyContent: "left",
  },


}));

const StyledBox1 = styled(Link)(({ theme }) => ({
  width: "140px",
  cursor: "pointer",
  textAlign: "center",
  textDecoration: "none",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "10px 26px",
  color: theme.palette.text.primary, // use theme color if needed

  "& > img": {
    width: "64px",
  },

  "&:hover .arrow-icon": {
    transform: "rotate(180deg)",
    transition: "transform 0.2s linear",
  },

  [theme.breakpoints.down('xl')]: {
    width: "115px",
    padding: "10px 20px",
    "& > img": {
      width: "50px",
    },
  },

  [theme.breakpoints.down('lg')]: {
    width: "120px",
    padding: "10px 10px",
  },
  [theme.breakpoints.down('md')]: {
    width: "95px",
    padding: "10px 10px",
    "& > img": {
      width: "50px",
    },
  },

  [theme.breakpoints.down('sm')]: {

  },
}));

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

  [theme.breakpoints.down('xl')]: {
    fontSize: "14px",
    width: "80px",
  },
  [theme.breakpoints.down('lg')]: {
    fontSize: "12px",
    width: "80px",
  },
  [theme.breakpoints.down('md')]: {
    fontSize: "10px",
    width: "60px",
  },

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