import React from 'react'
import Slide from './Slide'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles';

// Apply styles
const Component = styled(Box)`
  display: flex;
  background-color:rgba(199, 199, 199, 0.38);
`;
const LeftComponent = styled(Box)(({ theme }) => ({
    width: '83%', 
    height: '370px', 
    backgroundColor: '#ffffff', 
    margin: '10px 15px 10px 0px' ,

    [theme.breakpoints.down('lg')]: {
        width: '100%', 
        height: '270px', 
    }
}));

const RightComponent = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('lg')]: {
        display: 'none'
    }
}));

const MidSlide = ({ products, title }) => {
    const addURL = 'https://rukminim1.flixcart.com/fk-p-flap/530/810/image/6f5226625135ed46.jpg?q=20';
    return (
        <Component >
            <LeftComponent >
                <Slide
                    products={products}
                    title={title}
                />
            </LeftComponent>
            <RightComponent style={{ width: '17%' }}>
                <img src={addURL} alt="add" style={{ width: '255px', height: '390px' }} />
            </RightComponent>
        </Component>
    )
}

export default MidSlide
