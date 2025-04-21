import { styled } from '@mui/material/styles';
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css";
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

// Apply styles
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2
  }
};

const Component = styled(Box)`
  background-color: #ffffff;
`;
const StyledBox = styled(Box)`
  padding: 25px 20px;
  text-align: center;
  margin: 10px 15px;
`;
const StyledText = styled(Typography)`
  color: #1f1f1f;
  font-size: 20px;
  font-weight: 600;
  padding: 12px 24px;
`;

// Custom  Arrow
const CarouselStyle = styled(Carousel)`

    .react-multiple-carousel__arrow {
     width:40px;
     height: 88px;
     top: 50%;
     transform: translateY(-50%);
     background-color: #ffffff;
     border-style: solid;
     color: black;
     cursor: auto;
     box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
     z-index: 10;
    }
    .react-multiple-carousel__arrow--left {
        left: 0;
        border-radius:0 4px 4px 0;
    }
    .react-multiple-carousel__arrow--right {
        right: 0;
        border-radius: 4px 0 0 4px;
    }
    .react-multiple-carousel__arrow::before {
    font-size: 14px;
    color:rgb(19, 17, 17);
    font-weight: bold;
    display: block;
    font-family: revicons;
    text-align: center;
    z-index: 2;
    position: relative;
}

`
const Image = styled('img')(({ theme }) => ({
  width: "130px",
  height: "auto",
  margin: "auto",
  display: "block",
  objectFit: "contain",
  aspectRatio: '1 / 1',
  [theme.breakpoints.down('md')]: {
    width: "70px",
  }
}))

const StyledText1 = styled(Typography)(({ theme }) => ({
  width: "130px",
  fontSize: "14px",
  textAlign: "center",  // Centers text
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",  // Prevents wrapping
  margin: "auto",  // Centers the element itself (optional)
  [theme.breakpoints.down('md')]: {
    width: "80px",
    fontSize: "13px",
  }
}));

const StyledText2 = styled(Typography)(({ theme }) => ({
  width: "130px",
  fontSize: "14px",
  fontWeight: "bold",
  textAlign: "center",  // Centers text
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",  // Prevents wrapping
  margin: "auto",  // Centers the element itself (optional)
  [theme.breakpoints.down('md')]: {
    width: "80px",
    fontSize: "12px",
  }
}));
const Slide = ({ products, title }) => {
  return (
    <Component>
      <Box>
        <StyledText>{title}</StyledText>
      </Box>
      <CarouselStyle
        responsive={responsive}
        swipeable={false} //can't swipe
        draggable={false} //can't drag
        infinite={false} //Arrow from both side
        autoPlay={true} //Auto play
        autoPlaySpeed={4000} //Auto play speed
        keyBoardControl={true}
        // centerMode={true}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {
          products.map(product => (
            <Link to={`/product/${product.id}`} key={product.id} style={{ textDecoration: "none",color:"black" }}>
              <StyledBox>
                <Image src={product.url} alt="product" />
                <StyledText1 style={{ marginTop: 15 }}>{product.title.shortTitle}
                </StyledText1>
                <StyledText2 >{product.discount}</StyledText2>
              </StyledBox>
            </Link>
          ))
        }

      </CarouselStyle>
    </Component>
  )
}

export default Slide
