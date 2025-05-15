
import { Box, Button, Typography, styled } from '@mui/material'
import React from 'react'

// components
import GroupsButton from './GroupsButton'

// Redux
import { useDispatch } from 'react-redux'
import { removeFromCart } from '../../redux/actions/cartActions'

// Applyed Styled 
const Component = styled(Box)(({ theme }) => ({
    borderTop: '1px solid #f0f0f0',
    margin: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 20px ',
}))

const LeftBox = styled(Box)(({ theme }) => ({
    width: '10%',
    margin: '20px 10px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // ensures child items are centered
    justifyContent: 'space-between', // space between image and buttons
    gap: '10px',

    [theme.breakpoints.down('md')]: {
        width: '20%',
    }
}))


const Image = styled('img')(({ theme }) => ({
    width: '80px',
    height: '90px',

    [theme.breakpoints.down('md')]: {
        width: '70px',
        height: '80px',
    },
    [theme.breakpoints.down('sm')]: {
        width: '60px',
        height: '70px',
    }
}))

const RightBox = styled(Box)(({ theme }) => ({
    width: '90%',
    margin: '20px 0px',
    textAlign: 'left',
    paddingLeft: '40px',

    [theme.breakpoints.down('md')]: {
        width: '80%',
        paddingLeft: '20px',
    },
    [theme.breakpoints.down('sm')]: {
        paddingLeft: '15px',
    }

}))

const RightText = styled(Typography)(({ theme }) => ({
    width: '350px',
    fontSize: '16px',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: 700,

    [theme.breakpoints.down('lg')]: {
        width: '300px',
    },
    [theme.breakpoints.down('md')]: {
        width: '200px',
    },
    [theme.breakpoints.down('sm')]: {
        width: '200px',
    }
}))

const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: '20px',
    fontSize: '14px',
    color: '#000',
    fontWeight: '700',
    padding: '0',

    '&:hover': {
        backgroundColor: 'transparent',
    },

}));

const CartItem = ({ item }) => {
    const assure = "https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_9e47c1.png"

    const dispatch = useDispatch()
    const removeItem=(id)=>{
    dispatch(removeFromCart(id))
}
    return (
        <Component>
            {/* Left Box */}
            <LeftBox>
                <Image src={item.url} alt={item.title} />
                <GroupsButton item={item} />
            </LeftBox>


            {/* Right Box */}
            <RightBox>
                <RightText>{item.title.longTitle}</RightText>
                <Typography style={{ display: 'flex', alignItems: 'center' }}>
                    <Box component={"span"} style={{ color: '#878787' }}>Seller: RetailNet</Box>
                    <Box component={"span"}><img src={assure} style={{ width: 50, marginLeft: 10, marginTop: 7 }} alt="" /></Box>
                </Typography>
                <Typography style={{marginTop: 10}}>
                    <Box component={"span"} style={{ fontSize: 17, fontWeight: 600 , color: 'black' }}>Tk   {item.price.cost}</Box>
                    <Box component={"span"} style={{ color: '#878787', margin: '0 15px', fontSize: 14 }}><strike>Tk  {item.price.mrp}</strike></Box>
                    <Box component={"span"} style={{ color: '#388E3C', fontSize: 14 }}>{item.price.discount}</Box>
                </Typography>
                <StyledButton onClick={()=>removeItem(item.id)}>Remove</StyledButton>
            </RightBox>
        </Component>
    )
}

export default CartItem
