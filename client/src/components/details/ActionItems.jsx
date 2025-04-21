import { Box, Button, styled } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

// Redux
import { addToCart } from '../../redux/actions/cartActions';

// Icon
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import FavoriteIcon from '@mui/icons-material/Favorite';

// Apply styles
const LeftContainer = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20,
}))

const StyledImage = styled(Box)(() => ({
    padding: '20px 10px',
    border: '1px solid #f0f0f0',
}))

const Image = styled('img')(() => ({
    padding: '20px ',
    width: '100%',
    height: '270px',

}))

const StyledButton = styled(Button)(() => ({
    width: '100%',
    height: 50,
    borderRadius: 2,
}));

const IconButton = styled(Button)(() => ({
    minWidth: "36px",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    float: "right",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0",
    border: "1px solid rgba(220, 217, 217, 0.68)",
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    backgroundColor: "#fff", // Default background
    cursor: "pointer",
    transition: "background 0.3s ease",

    "&:hover": {
        backgroundColor: "none",  // Background on hover
    },

    "&:focus": {
        outline: "none",  // Remove focus outline
        backgroundColor: "none",  // Remove background on focus
        boxShadow: "none", // Remove any shadow effect on focus
    },

    "&:active": {
        backgroundColor: "none",  // Remove background when clicked
        boxShadow: "none", // Remove any shadow effect on active
    }
}));



const ActionItems = ({ product }) => {
    const [quantity] = useState(1); // to set the quantity of the product
    const navigate = useNavigate();
    const dispatch = useDispatch(); // to dispatch the action to redux
   
    const {id}= product; // destructure the id from product
    const addItemToCart = () => {
        dispatch(addToCart(id , quantity)); // dispatch the action to add the item to cart
        navigate('/cart')
    }

    const paymentNow = () => {
        // dispatch(addToCart(id, quantity)); // Optionally add to cart
        navigate('/payment', { state: { product } }); // Pass product object via route state
    console.log(product);
    }
    return (
        <LeftContainer>
            <Box style={{ width: '20%' }}>
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                </ul>
            </Box>
            <Box style={{ width: '80%' }}>
                <StyledImage>
                    <Box><IconButton><FavoriteIcon style={{ fontSize: 20, color: '#d3d3d3' }} /></IconButton></Box>
                    <Box style={{ textAlign: 'center' }}><Image src={product.detailUrl} alt="product" /></Box>
                </StyledImage>
                <Box component={'span'} style={{ background: '#645y76567', width: '100%', display: 'flex', justifyContent: 'space-between', gap: 10, marginTop: 10 }}>
                    <StyledButton onClick={() => addItemToCart()} variant='contained' style={{ background: '#ff9f00' }}><ShoppingCartIcon />Add to Cart</StyledButton>
                    <StyledButton onClick={() => paymentNow()} variant='contained' style={{ background: '#fb641b' }}><FlashOnIcon />Buy Now</StyledButton>
                </Box>
            </Box>
        </LeftContainer>
    )
}

export default ActionItems
