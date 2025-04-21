import { Box, styled, Typography } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom'

// Images
import Image from '../../assets/images/paymentBackground.jpg'
import Image1 from '../../assets/images/pay.png'

// Components
import PayForm from './PayForm'

// Apply styles
const Container = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '88vh',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundImage: `url(${Image})`,
    position: 'relative',
    [theme.breakpoints.down('lg')]: {
        height: '86vh',
    },
    [theme.breakpoints.down('sm')]: {
        height: '100vh',
    },
}))

const BannerOverlay = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: 'rgba(0, 0, 0, 0.64)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    [theme.breakpoints.down('sm')]: {
        display: 'block',

    },


}))

const Component = styled(Box)(({ theme }) => ({
    width: '60%',
    height: '73%',
    backgroundColor: '#00000052',
    boxShadow: 'rgba(134, 134, 139, 0.36) 0px 50px 100px -20px, rgba(142, 137, 137, 0.49) 0px 30px 60px -30px, rgba(143, 148, 154, 0.55) 0px -2px 6px 0px inset',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('lg')]: {
        width: '90%',
    },
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        height: '80%',
        width: '90%',
        margin: '0 auto',
        marginTop: '50px',
    }
}))

const LeftBox = styled(Box)(({ theme }) => ({
    width: '50%',
    height: '100%',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: 'rgba(134, 134, 139, 0.36) 0px 50px 100px -20px, rgba(142, 137, 137, 0.49) 0px 30px 60px -30px, rgba(143, 148, 154, 0.55) 0px -2px 6px 0px inset',

    '& > img': {
        width: '250px',
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',

        '& > img': {
            width: '150px',
        },
    },
    [theme.breakpoints.down('sm')]: {
        padding: '30px',
        width: '100%',
        height: '30%',
        '& > img': {
            width: '100px',
        },
    }
}))

const RightBox = styled(Box)(({ theme }) => ({
    width: '50%',
    height: '100%',
    [theme.breakpoints.down('md')]: {
        width: '100%',
    }
}))


const PaymentNow = () => {
    const location = useLocation();
    const { product } = location.state || {}; // fallback to {} in case state is undefined

    return (
        <Container>
            <BannerOverlay>
                <Component>
                    {/* Left Box */}
                    <LeftBox>
                        <img src={Image1} alt="" />
                        <Box style={{ marginTop: 20, textAlign: 'center' }}>
                            <Typography style={{ fontStyle: 'italic', color: '#fff', fontSize: 30, fontWeight: 600, }}>Secure Payment</Typography>
                            <Typography style={{ fontStyle: 'italic', color: '#fff', fontSize: 20, fontWeight: 500 }}>Your payment is safe with us</Typography>
                        </Box>
                    </LeftBox>

                    {/* Right Box */}
                    <RightBox>
                        <PayForm product={product} />
                    </RightBox>
                </Component>
            </BannerOverlay>
        </Container>
    )
}

export default PaymentNow
