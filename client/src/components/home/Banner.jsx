import { styled } from '@mui/material/styles';
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css";

// import Data
import { bannerData } from '../../constants/data'

// Apply styles 
const StyledImg = styled('img')`
        width: 100%;
        height: 265px;
    margin: auto;
    display: block;
    inset: 0px;
    padding: inherit;
    object-fit: cover;
`
// Custom  Arrow
const CarouselStyle = styled(Carousel)`

    .react-multiple-carousel__arrow {
     width:40px;
     height: 88px;
     top: 50%;
     transform: translateY(-50%);
     background-color: #fff;
     border-style: solid;
     color: black;
     cursor: auto;
     box-shadow: 0 1px 4px rgba(0,0,0,.12)
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

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

// Main
const Banner = () => {
  return (
    <CarouselStyle
      className='custom-arrow'
      responsive={responsive}
      swipeable={false} //can't swipe
      draggable={false} //can't drag
      infinite={true} //Arrow from both side
      autoPlay={true} //Auto play
      autoPlaySpeed={4000} //Auto play speed
      keyBoardControl={true}
      slidesToSlide={1}
      containerClass="carousel-container"
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >

      {
        bannerData.map(data => (
          <StyledImg src={data.url} alt="Banner" />
        ))
      }
    </CarouselStyle>

  )
}

export default Banner
