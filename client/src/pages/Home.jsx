import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


// Compoonents
import HomeNav from '../components/home/HomeNav'
import Banner from '../components/home/Banner'
import Slide from '../components/home/Slide.jsx'
import MidSlide from '../components/home/MidSlide.jsx'
import MidSection from '../components/home/MidSection.jsx'
import { TopPicksProductsImage } from '../constants/data.js'

// Redux
import { getProducts } from '../redux/actions/productaction.js'


// Apply styles
const StyledBox = styled(Box)(({ theme }) => ({
    margin:"0 150px",
   marginTop: "10px",
  [theme.breakpoints.down('lg')]: {
      margin:"0 10px",
  
  }
}));

const StyledBox1 = styled(Box)`
   height: 150px;
   margin-bottom: 15px;  
   background-color: #ffffff;
   margin-top: 10px;
   
`
const StyledBox2 = styled(Box)`
   height: 290px;
   background-color: #ffffff;
   margin-top: 10px;
   margin-bottom: 15px;
`
const StyledSlide = styled(Box)`
   background-color: #ffffff;
   margin-bottom: 15px;
`
const Home = () => {
  // 2. second time call useSelector -  get value from redux database
  // without any method - directly can use 
  const { products }  = useSelector(state => state.getProducts)
  console.log(products)
  //  from getProductsState get products
  //  method - 1 : this method is called - object destructuring concept
  // const { products } = getProductsState;

  // method - 2 : you can also use this method
  // getProductsState.products

  const dispatch = useDispatch();

  // 1. first time call useEffect
  useEffect(() => {
    dispatch(getProducts()) // getproducts() -> here API & call api
  }, [dispatch])

  return (
    // Fragment - > "<></>"
    <StyledBox style={{overflowX: 'hidden'}}>
      <StyledBox1>
        <HomeNav />
      </StyledBox1>
      <StyledBox2>
        <Banner />
      </StyledBox2>
      <StyledSlide>
        <MidSlide  products={products} title="Best of Electronics"/>
      </StyledSlide>
      <StyledSlide>
        <Slide  products={products} title="Beauty, Food, Toys & More"/>
      </StyledSlide>
      <StyledSlide>
        <MidSection  products={TopPicksProductsImage} title="Season's Top Picks"/>
      </StyledSlide>
      <StyledSlide>
        <Slide  products={products} title="Latest Summer Styles"/>
      </StyledSlide>
    </StyledBox>
  )
}

export default Home
