import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Button, Grid, Typography, styled } from '@mui/material'

// Components
import CartItem from './CartItem'
import TotalBalance from './TotalBalance'
import EmptyCart from './EmptyCart'

// Styled Components
const Component = styled(Box)(({ theme }) => ({
    width: '70%',
    margin: '50px auto',
    [theme.breakpoints.down('md')]: {
        width: '90%',
    },
    [theme.breakpoints.down('sm')]: {
        width: '90%',
    },

}));

const ContainerLeft = styled(Grid)(({ theme }) => ({
    paddingRight: '15px',

    [theme.breakpoints.down('md')]: {
        paddingRight: '0px',
        marginBottom: '15px',
    },
}));

const ContainerRight = styled(Grid)(({ theme }) => ({

}));

const Header = styled(Box)(({ theme }) => ({
    padding: '15px 24px',
    background: '#fff',
}))

const ButtonWrapper = styled(Box)(({ theme }) => ({
    padding: '15px 24px',
    backgroundColor: '#fff',
    boxShadow: '0 -2px 10px 0 rgb(0 0 0 / 10%)',
    borderTop: '1px solid #f0f0f0',
}));

const StyledButton = styled(Button)(({ theme }) => ({
    display: 'flex',
    marginLeft: 'auto',
    color: '#fff',
    background: '#fb641b',
    width: '250px',
    height: '50px',
    borderRadius: '2px',

    [theme.breakpoints.down('md')]: {
        width: '230px',
        height: '40px',
    },

    [theme.breakpoints.down('sm')]: {
        width: '130px',
    },


}));

const Cart = () => {
    const { CartItems } = useSelector((state) => state.cart)
    return (
        <Component>
            {
                CartItems.length ?
                    <>
                        <Grid container  >
                            {/* Left Box */}
                            <ContainerLeft item  lg={8} md={8} xs={12}>
                                <Box style={{ background: '#fff' }}>
                                    <Header>
                                        <Typography style={{ fontWeight: 'bold', }}>My Cart ({CartItems.length})</Typography>
                                    </Header>
                                    <Box>
                                        {
                                            CartItems.map((item) => (
                                                <CartItem item={item} /> // CartItem component to display the cart items
                                            ))
                                        }
                                    </Box>
                                    <ButtonWrapper>
                                        <StyledButton>Place Order</StyledButton>
                                    </ButtonWrapper>
                                </Box>
                            </ContainerLeft>

                            {/* Right Box */}
                            <ContainerRight item lg={4} md={4} xs={12}>
                                <Box>
                                    <TotalBalance CartItems={CartItems} />
                                </Box>
                            </ContainerRight>
                        </Grid>
                    </>
                    : (
                        <Grid container style={{ width: '80%', margin: '0 auto' }}>
                            <Grid item xs={12}>
                                <EmptyCart />
                            </Grid>
                        </Grid>
                    )

            }
        </Component>
    )
}

export default Cart
