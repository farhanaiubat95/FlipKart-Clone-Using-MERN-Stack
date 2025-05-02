import { styled } from '@mui/material/styles';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Banner.css'; // 👈 include this CSS

// Import data
import { bannerData } from '../../constants/data';

// Styled image
const StyledImg = styled('img')(({ theme }) => ({

  height: 300,
  objectFit: 'cover',
  margin: 'auto',
  [theme.breakpoints.down('lg')]: {
    height: 250,
  },
  [theme.breakpoints.down('md')]: {
    height: 200,
  },
}));

// Styled Carousel with custom arrows
const CarouselStyle = styled(Carousel)(({ theme }) => ({
  '& .react-multiple-carousel__arrow': {

    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: theme.palette.common.white,
    borderStyle: 'solid',
    color: theme.palette.text.primary,
    cursor: 'auto',
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.12)',
    zIndex: 10,
  },
  '& .react-multiple-carousel__arrow--left': {
    width: 40,
    height: 88,
    left: 0,
    borderRadius: '0 4px 4px 0',
  },
  '& .react-multiple-carousel__arrow--right': {
    width: 45,
    height: 88,
    right: 0,
    borderRadius: '4px 0 0 4px',
  },
  '& .react-multiple-carousel__arrow::before': {
    fontSize: 14,
    color: theme.palette.text.primary,
    fontWeight: 'bold',
    display: 'block',
    fontFamily: 'revicons',
    textAlign: 'center',
    zIndex: 2,
    position: 'relative',
  },
}));

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

// Main Component
const Banner = () => {
  return (
    <CarouselStyle
      className="custom-arrow"
      responsive={responsive}
      swipeable={false}
      draggable={false}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={4000}
      keyBoardControl={true}
      slidesToSlide={1}
      containerClass="carousel-container"
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      {bannerData.map((data, index) => (
        <StyledImg key={index} src={data.url} alt={`Banner ${index + 1}`} />
      ))}
    </CarouselStyle>
  );
};

export default Banner;
