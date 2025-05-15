import { Box, Grid, styled, Typography } from '@mui/material';
import { Link } from 'react-router-dom';  // ✅ Correct import for navigation
import React from 'react';

// Icon
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Apply styles
const Component = styled(Box)`
  background-color: rgba(199, 199, 199, 0.38);
`;
const StyledText = styled(Typography)`
  color: #1f1f1f;
  font-size: 20px;
  font-weight: 600;
  padding: 12px 24px;
`;

const LeftBox = styled(Box)`
  background-color: #ffffff;
  padding: 20px 0;
`;

const StyledBox = styled(Box)`
  padding: 10px 0;
  margin: 10px 15px;
  border: 1px solid #dcd4d49c;
  border-radius: 5px;
`;

const Image = styled('img')(({ theme }) => ({
  width: "230px",
  height: "auto",
  margin: "auto",
  display: "block",
  objectFit: "contain",
  aspectRatio: '1 / 1',
  [theme.breakpoints.down('md')]: {
    width: "170px",
  }
}));

const StyledText1 = styled(Typography)(({ theme }) => ({
  width: "130px",
  fontSize: "15px",
  whiteSpace: "nowrap",  // Prevents wrapping
  marginLeft: "10px",
  color: "#000000",
  [theme.breakpoints.down('md')]: {
    width: "80px",
    fontSize: "14px",
  }
}));

const StyledText2 = styled(Typography)(({ theme }) => ({
  width: "130px",
  fontSize: "15px",
  whiteSpace: "nowrap",
  marginLeft: "10px",
  color: "#108934",
  fontWeight: "bold",
  [theme.breakpoints.down('md')]: {
    width: "80px",
    fontSize: "14px",
  }
}));

const MidSection = ({ products, title }) => {
  const addImg = "https://rukminim1.flixcart.com/www/1070/720/promos/26/09/2023/ed27f892-1bc6-462f-805b-953f5add4f6a.jpg?q=80";

  return (
    <Component>
      <Grid container spacing={2}>
        {/* Left Box start */}
        <Grid item xs={12} lg={4}>
          <LeftBox>
            {/* Title */}
            <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginRight: '20px' }}>
              <StyledText>{title}</StyledText>
              <Link to={'https://www.flipkart.com/offers-list/summer-fashion?screen=dynamic&pk=contentTags%3DGCD_THEME_4~marketplace%3DFLIPKART~widgetType%3DdealCard~contentType%3DpersonalisedRecommendation%2FC5&marketplace=FLIPKART'}>
                <ArrowForwardIosIcon style={{ background: '#2A55E5', color: 'white', borderRadius: '50%', padding: '5px', width: '14px', height: '14px' }} />
              </Link>
            </Box>
            {/* Product List */}
            <Grid container>
              {products.map(product => (
                <Grid item xs={6} key={product._id}>  {/* Added key to prevent React warning */}
                  <Link to={product.url} style={{ textDecoration: 'none', cursor: 'pointer' }}>
                    <StyledBox>
                      <Image src={product.image} alt="product" />
                      <StyledText1 style={{ marginTop: 15 }}>{product.title}</StyledText1>
                      <StyledText2>{product.discount}</StyledText2>
                    </StyledBox>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </LeftBox>
        </Grid>
        {/* Left Box end */}

        {/* Right Box start */}
        <Grid item md={8} sx={{ display: { xs: 'none', lg: 'block' } }}>
          <Link to="https://www.flipkart.com/mobile-phones-store" style={{ textDecoration: 'none', cursor: 'pointer' }}>
            <img
              src={addImg}
              style={{
                width: '100%',
                height: '100%',
                boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px'
              }}
              alt="Advertisement"
            />
          </Link>
        </Grid>
        {/* Right Box end */}
      </Grid>
    </Component>
  );
}

export default MidSection;
