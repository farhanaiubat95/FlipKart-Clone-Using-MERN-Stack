import { styled } from '@mui/material/styles';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


// Responsive settings with 5 items on desktop and 1 slide at a time
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 7,
    slidesToSlide: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 600 },
    items: 5,
    slidesToSlide: 1
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 3,
    slidesToSlide: 1
  }
};

const Component = styled(Box)`
  background-color: #ffffff;
  padding-bottom: 16px;
`;

const StyledBox = styled(Box)(({ theme }) => ({
  width: "100px",
  padding: "8px",
  margin: "0 55px",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const StyledText = styled(Typography)`
  color: #1f1f1f;
  font-size: 20px;
  font-weight: 600;
  padding: 12px 24px;
`;

const CarouselStyle = styled(Carousel)`
  .react-multiple-carousel__arrow {
    width: 40px;
    height: 88px;
    top: 50%;
    transform: translateY(-50%);
    background-color: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, 
                rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    z-index: 10;
  }

  .react-multiple-carousel__arrow::before {
    color: black;
    font-size: 16px;
  }

  .react-multiple-carousel__arrow--left {
    left: 0;
    border-radius: 0 4px 4px 0;
  }

  .react-multiple-carousel__arrow--right {
    right: 0;
    border-radius: 4px 0 0 4px;
  }
`;

const Image = styled('img')(({ theme }) => ({
  width: "100%",
  maxWidth: "130px",
  height: "auto",
  maxHeight: "130px",
  margin: "auto",
  display: "block",
  objectFit: "contain",
  aspectRatio: '1 / 1',
  [theme.breakpoints.down('md')]: {
    maxWidth: "80px",
    maxHeight: "80px",
  }
}));

const StyledText1 = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  width: "100px",
  textAlign: "center",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  marginTop: "10px",
  [theme.breakpoints.down('md')]: {
    fontSize: "13px",
  }
}));

const StyledText2 = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: "bold",
  textAlign: "center",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  marginTop: "4px",
  [theme.breakpoints.down('md')]: {
    fontSize: "12px",
  }
}));

const Slide = ({ title }) => {
  const { products } = useSelector((state) => state.Product);

  return (
    <Component>
      <Box>
        <StyledText>{title}</StyledText>
      </Box>

      {products && products.length > 0 ? (
        <CarouselStyle
          responsive={responsive}
          swipeable={true}
          draggable={true}
          infinite={false}
          autoPlay={true}
          autoPlaySpeed={4000}
          keyBoardControl={true}
          showDots={false}
          arrows={true}
          containerClass="carousel-container"
          itemClass="carousel-item-padding-40-px"
        >
          {products.map(product => (
            <Link key={product._id} to={`/product/${product._id}`} style={{ textDecoration: "none", color: "black" }}>
              <StyledBox>
                <Image src={`http://localhost:5000/uploads/${product.productImage?.[0]?.img}`} alt="product" />
                <StyledText1>{product.productName}</StyledText1>
                <StyledText2>{product.productOffer}% OFF</StyledText2>
              </StyledBox>
            </Link>
          ))}
        </CarouselStyle>
      ) : (
        <Box textAlign="center" py={4}>
          <Typography>No products available</Typography>
        </Box>
      )}
    </Component>
  );
};

export default Slide;
