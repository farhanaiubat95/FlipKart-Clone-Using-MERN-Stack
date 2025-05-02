import React from 'react'
import { Box } from '@mui/material'
import { styled } from '@mui/system'

// Importing components
import HomeNav from '../components/home/HomeNav'
import Banner from '../components/home/Banner'

// Apply styles
const StyledBox = styled(Box)(({ theme }) => ({
  Width: '70%',
  margin: "0 150px",
  padding: "5px 0",
  overflow: "hidden",

  [theme.breakpoints.down('xl')]: {
    width: '90%',
    margin: "0 auto",
  },
  [theme.breakpoints.down('lg')]: {
    width: '100%',
    margin: '0 10px',
  },

  [theme.breakpoints.down('md')]: {
    width: '100%',
    margin: '0 5px',
  },

}));


const StyledBox1 = styled(Box)`
   height: 130px;
   background-color: #ffffff;
   margin-top: 10px;
   box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`
const StyledBox2 = styled(Box)`

   border: 1px solid #f0f0f0;
   box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
   background-color: #ffffff;
   margin-top: 10px;
   margin-bottom: 15px;
`


const Home = () => {
  return (
    // Fragment - > "<></>"

    <div className="bg-gray-100 h-[93vh] ">
      <StyledBox >
        <StyledBox1 >
          <HomeNav />
        </StyledBox1>

        <StyledBox2 >
          <Banner />
        </StyledBox2>
      </StyledBox>

    </div>

  )
}

export default Home
