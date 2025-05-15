import React from 'react';
import { Box, Grid, Link, Typography, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

// Icon
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";


// Redux
import { useSelector } from 'react-redux';

// Apply styles
const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
  padding: "10px",
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
  width: "80px",
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
  const categories = useSelector((state) => state.Category?.categories) || [];

  // Filter only main categories (those without parentID)
  const mainCategories = categories.filter((cat) => !cat.parentId);
  const subCategories = categories.filter((cat) => cat.parentId);
  const totalCategoryCount = categories.length;

  return (
    <StyledBox className='w-[90%] m-auto overflow-hidden'>

      <Grid container spacing={2}>
        {mainCategories.map((cat) => (
          <Grid item xs={2} key={cat._id}>
            <StyledBox1 href={`/category/${cat.slug}`}>
              <img src={cat.categoryImage} alt={cat.categoryName} className='w-[64px] h-[64px]' />
              <StyleIcon style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <StyledTypography>{cat.categoryName}</StyledTypography>
                <KeyboardArrowDownIcon style={{ marginTop: "5px" }} className="arrow-icon" />
              </StyleIcon>
            </StyledBox1>
          </Grid>
        ))}
      </Grid>
    </StyledBox>
  );
};


export default HomeNav;
