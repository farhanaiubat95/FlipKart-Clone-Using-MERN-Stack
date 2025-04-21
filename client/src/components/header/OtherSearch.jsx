import { useState, useEffect } from 'react'
import { Box, InputBase, List, ListItem } from '@mui/material'
import { styled } from '@mui/material/styles';

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { getProducts } from '../../redux/actions/productaction'

// Import icons
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

// Apply styles
const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  width: '75%',
  borderRadius: '7px',
  // marginLeft: '10px',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',

}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  paddingLeft: "20px",
  height: "36px",
  width: "100%",
  fontSize: "14px",
  color: "rgb(0, 0, 0)",

  "&::placeholder": {  // ✅ Corrected Syntax
    color: "rgb(8, 8, 8)",
    fontSize: "14px",
  },
  [theme.breakpoints.down('md')]: {
    width: '70%',
    paddingLeft: "10px",
  }
}));

const ListWrapper = styled(List)(({ theme }) => ({
  position: 'absolute',
  top: '40px',
  backgroundColor: '#ffffff',
  width: '100%',
  maxHeight: '300px', // adjust as needed
  overflowY: 'auto',
  overflowX: 'hidden',

  /* Hide scrollbar - works on most browsers */
  scrollbarWidth: 'none',        // Firefox
  '-ms-overflow-style': 'none',  // IE/Edge
  '&::-webkit-scrollbar': {
    display: 'none',             // Chrome/Safari
  },
}));


const StyledLink = styled(Link)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '10px 20px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#f2f2f2',
  },
}));
const StyledImage = styled(Box)(({ theme }) => ({
  width: '15%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    width: '60%',
    objectFit: 'contain',
    marginRight: '10px',
  },

  [theme.breakpoints.down('md')]: {
    width: '20%',
    img: {
      width: '45px',
    },
  },

  [theme.breakpoints.down('sm')]: {
    width: '25%',
    img: {
      width: '40px',
      height: '40px',
    },
  },
}));


const StyledText = styled(Box)(({ theme }) => ({
  fontSize: '14px',
  width: '85%',
  textAlign: 'left',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',

  [theme.breakpoints.down('md')]: {
    width: '70%',
    fontSize: '13px',
  },

  [theme.breakpoints.down('sm')]: {
    width: '65%',
    fontSize: '12px',
  },
}));


const OtherSearch = () => {

  const [text, setText] = useState('');

  const { products } = useSelector(state => state.getProducts);
  const dispatch = useDispatch();

  // Call API
  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch]) // Only run effect if text changes

  const getText = (text) => {
    setText(text)
  };

  return (
    <StyledBox>
      <StyledInputBase
        placeholder='Search for products, brands and more'
        onChange={(e) => getText(e.target.value)}
        value={text} // Controlled input 
      />
      <Box style={{ position: 'absolute', right: 7 }} >
        <SearchIcon style={{ paddingRight: 10, paddingTop: 5, color: '#2874f0', fontSize: 28, cursor: 'pointer' }} />
      </Box>
      {
        text &&
        <ListWrapper>
          {
            products.filter(products => products.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
              <ListItem>
                <StyledLink
                  to={`/product/${product.id}`} style={{ textDecoration: "none", color: "black" }}
                  onClick={() => setText('')}>
                  <StyledImage>
                    <img src={product.detailUrl} alt={product.title.longTitle} />
                  </StyledImage>

                  <StyledText>{product.title.longTitle}</StyledText>
                </StyledLink>
              </ListItem>
            ))
          }
        </ListWrapper>
      }
    </StyledBox>
  )
}
export default OtherSearch
