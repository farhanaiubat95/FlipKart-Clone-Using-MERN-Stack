import { Box, Typography, styled } from '@mui/material'
import { useState, useEffect } from 'react'

// Apply styles
const Heading = styled(Box)(({ theme }) => ({
  padding: '15px 24px',
  background: '#fff',
  borderBottom: '1px solid #f2f2f2',

  '& > p': {
    color: '#878787',
    fontSize: '16px',
    fontWeight: 600,
    textTransform: 'Uppercase',
  },
}));

const Container = styled(Box)(({ theme }) => ({
  padding: '15px 24px',
  background: '#fff',

  '& > p': {
    color: '#878787',
    fontSize: '15px',
    fontWeight: 600,
    marginBottom: '20px',
  },
  '& > h6': {
    paddingTop: '20px',
    marginBottom: '20px',
    borderTop: '1px solid #f2f2f2',
  }
}))

const DiscountBoxs = styled(Box)(({ theme }) => ({
  color: 'green',
  fontWeight: 500 ,
  fontSize: '14px',

  [theme.breakpoints.down('lg')]: {
    fontSize: '13px',
  },

  [theme.breakpoints.down('md')]: {
    fontSize: '14px',
  }
}))

const TotalBalance = ({ CartItems }) => {
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    totalAmount();
  }, [CartItems]);

  const totalAmount = () => {
    let price = 0;
    let discount = 0;

    CartItems.map((item) => {
      price += item.price.cost;
      discount += (item.price.mrp - item.price.cost);
    })

    setPrice(price);
    setDiscount(discount);
  }

  return (
    <Box>
      {/* Heading */}
      <Heading>
        <Typography>Price Details </Typography>
      </Heading>

      {/* Price Details */}
      <Container>
        <Typography>Price ({CartItems.length} {
          CartItems.length > 1 ? "items" : "item"
        })
          <Box component={"span"} style={{ float: 'right' }}>Tk {price}</Box>
        </Typography>

        <Typography>Discount
          <Box component={"span"} style={{ float: 'right' }}>-Tk {discount}</Box>
        </Typography>

        <Typography>Delivery Charges
          <Box component={"span"} style={{ float: 'right' }}>Tk 40</Box>
        </Typography>

        <Typography variant='h6'>Total Amount
          <Box component={"span"} style={{ float: 'right' }}>Tk {price+ 40}</Box>
        </Typography>

        <DiscountBoxs>You will save Tk {discount-40} on this order</DiscountBoxs>
      </Container>

    </Box>
  )
}

export default TotalBalance
