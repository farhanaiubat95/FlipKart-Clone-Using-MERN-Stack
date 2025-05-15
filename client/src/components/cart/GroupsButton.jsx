import { Box, Button, ButtonGroup, styled } from '@mui/material'
import React from 'react'

// Apply styles
const Component = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  margin: '10px 0',
}))

// Button group with spacing between buttons
const StyledButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '5px',
}))

// Circle buttons (left and right)
const CircleButton = styled(Button)(({ theme }) => ({
  width: '22px',
  height: '22px',
  borderRadius: '50%',
  minWidth: '22px',
  padding: 0,
  color: '#000',
  borderColor: '#000',
  fontWeight: 'bold',

  [theme.breakpoints.down('sm')]: {
    width: '20px',
    height: '20px',
    minWidth: '20px',
    fontSize: '12px',
  },
}))

const MiddleButton = styled(Button)(({ theme }) => ({
  height: '22px',
  minWidth: '30px',
  padding: '0 10px',
  borderRadius: '5px',
  color: '#000',
  borderColor: '#000',
  fontWeight: 'bold',

  [theme.breakpoints.down('md')]: {
    height: '22px',
    minWidth: '30px',
    fontSize: '13px',
  },
  [theme.breakpoints.down('sm')]: {
    height: '20px',
    minWidth: '25px',
    fontSize: '12px',
  },
}))
const GroupsButton = () => {
  return (
    <Component>
      <StyledButtonGroup variant="outlined" size="small" aria-label="Quantity button group">
      <CircleButton variant="outlined">-</CircleButton>
        <MiddleButton variant="outlined">1</MiddleButton>
        <CircleButton variant="outlined">+</CircleButton>
      </StyledButtonGroup>
    </Component>
  )
}

export default GroupsButton
