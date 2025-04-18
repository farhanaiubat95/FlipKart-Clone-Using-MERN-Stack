import { useState, useEffect } from 'react'
import { Box, InputBase, List, ListItem } from '@mui/material'
import { styled } from '@mui/material/styles'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { getProducts } from '../../redux/actions/productaction'

// Import icons
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom'

// Apply styles
const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#d8e1eb6b',
  width: '100%',
  borderRadius: '7px',
  marginLeft: '40px',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',

}));

const StyledInputBase = styled(InputBase)`
  padding-left: 40px;
  height: 40px;
  width: 100%;
  font-size: 17px;
  border-radius: 2px 0 0 2px;
  color:rgb(0, 0, 0);

  ::placeholder {
    color:rgb(8, 8, 8);
    font-size: 14px;
    width: 80%;
  }

`;

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
  color: 'black',

  [theme.breakpoints.down('md')]: {
    width: '70%',
    fontSize: '13px',
  },

  [theme.breakpoints.down('sm')]: {
    width: '65%',
    fontSize: '12px',
  },
}));


const HomeSearch = () => {
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
      <Box style={{ position: 'absolute', left: 7 }} >
        <SearchIcon style={{ paddingRight: 10, paddingTop: 5, color: '#7272728a', fontSize: 28, cursor: 'pointer' }} />
      </Box>
      {
  text && (
    <ListWrapper>
      {
        products.filter(product => 
          product.title.longTitle.toLowerCase().includes(text.toLowerCase())
        ).length > 0 ? (
          products
            .filter(product => 
              product.title.longTitle.toLowerCase().includes(text.toLowerCase())
            )
            .map(product => (
              <ListItem key={product.id}>
                <StyledLink
                  to={`/product/${product.id}`}
                  style={{ textDecoration: "none", color: "black" }}
                  onClick={() => setText('')}
                >
                  <StyledImage>
                    <img src={product.detailUrl} alt={product.title.longTitle} />
                  </StyledImage>

                  <StyledText>{product.title.longTitle}</StyledText>
                </StyledLink>
              </ListItem>
            ))
        ) : (
          <ListItem>
            <StyledText style={{ textAlign: 'center' }}>No Products Found</StyledText>
          </ListItem>
        )
      }
    </ListWrapper>
  )
}

    </StyledBox>
  )
}

export default HomeSearch
