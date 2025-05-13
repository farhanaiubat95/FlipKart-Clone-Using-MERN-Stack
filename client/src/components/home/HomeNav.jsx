import React from 'react';
import { Box, Grid, Link, Typography, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
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

const StyledBox1 = styled(Link)(({ theme }) => ({
  cursor: "pointer",
  textAlign: "center",
  textDecoration: "none",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "10px",
  color: theme.palette.text.primary,

  "& > img": {
    width: "64px",
  },

  "&:hover .arrow-icon": {
    transform: "rotate(180deg)",
    transition: "transform 0.2s linear",
  },

  [theme.breakpoints.down('xl')]: {
    padding: "10px 20px",
    "& > img": {
      width: "50px",
    },
  },

  [theme.breakpoints.down('lg')]: {
    padding: "10px 10px",
  },

  [theme.breakpoints.down('md')]: {
    padding: "10px 10px",
    "& > img": {
      width: "50px",
    },
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
  const categories = useSelector((state) => state.Category?.categories) || [];
  const theme = useTheme();

  // Media Queries
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));

  // Filter only main categories (those without parentID)
  const mainCategories = categories.filter((cat) => !cat.parentID);

  // Helper to get subcategories
  const getSubcategories = (parentId) =>
    categories.filter((cat) => cat.parentID === parentId);
  // Preprocess: create a map { parentId: [subcategories...] }
  const subcategoriesMap = categories.reduce((acc, cat) => {
    if (cat.parentID) {
      if (!acc[cat.parentID]) {
        acc[cat.parentID] = [];
      }
      acc[cat.parentID].push(cat);
    }
    return acc;
  }, {});

  // Determine the number of categories to display
  let displayLimit = 9;
  if (isXs) {
    displayLimit = 5;
  } else if (isSm) {
    displayLimit = 8;
  } else if (isLgUp) {
    displayLimit = 9;
  }

  // Take only up to displayLimit
  const displayedCategories = mainCategories.slice(0, displayLimit);

  return (
    <StyledBox className='w-[90%] m-auto overflow-hidden'>
      <Grid
        container
        spacing={2}
        className='w-[100%] m-auto'
        sx={{
          flexWrap: 'nowrap',
          overflow: 'hidden',
        }}
      >
        {displayedCategories.map((cat) => {
          const hasSubs = subcategoriesMap[cat._id]?.length > 0;

        
  
        return (
            <Grid
              item
              key={cat._id}
              sx={{
                flex: '0 0 auto',
                width: {
                  xs: '21%',
                  sm: '12.5%',
                  lg: '10.11%',
                },
              }}
            >
              <StyledBox1>
                <img src={cat.categoryImage} alt={cat.categoryName} className='w-[64px] h-[64px] object-cover' />
                <StyleIcon style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <StyledTypography>{cat.categoryName}</StyledTypography>

                  {/* Show arrow only if has subcategory */}
                  {!hasSubs && (
                    <KeyboardArrowDownIcon style={{ marginTop: "5px" }} className="arrow-icon" />
                  )}
                </StyleIcon>
              </StyledBox1>
            </Grid>
          );
        })}

      </Grid>
    </StyledBox>
  );
};


export default HomeNav;
