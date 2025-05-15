
import { Box, Typography ,styled} from '@mui/material';
import React from 'react'


// Apply styles
const Component = styled(Box)(({ theme }) => ({
    height: '65vh',
    width: '100%',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
}))


const Container = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    paddingTop: '70px',
}))
const EmptyCart = () => {
    const imgurl = 'https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90';
    return (
        <Component>
            <Container>
            <img style={{ width: '100%', maxWidth: '300px' }} src={imgurl} alt="emptycart" />

                <Typography>Your Cart is Empty</Typography>
                <Typography>Add items to it now</Typography>
            </Container>
        </Component>
    )
}

export default EmptyCart
