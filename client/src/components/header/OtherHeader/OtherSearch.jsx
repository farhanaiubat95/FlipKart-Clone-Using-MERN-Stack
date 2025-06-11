import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Box, InputBase } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

// Styled components
const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  width: '100%',
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
  "&::placeholder": {
    color: "rgb(8, 8, 8)",
    fontSize: "14px",
  },
  [theme.breakpoints.down('lg')]: {
    width: '70%',
    paddingLeft: "10px",
  },
  [theme.breakpoints.down('md')]: {
    width: '70%',
    paddingLeft: "10px",
  }
}));

const OtherSearch = () => {
  const { products } = useSelector(state => state.Product);
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const lowerQuery = query.toLowerCase();
    return products.filter(product =>
      product.productTitle?.toLowerCase().includes(lowerQuery) ||
      product.brand?.toLowerCase().includes(lowerQuery)
    );
  }, [products, query]);

  return (
    <StyledBox sx={{ flexDirection: 'column' }}>
      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
        <StyledInputBase
          placeholder='Search for products, brands and more'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Box style={{ position: 'absolute', right: 7 }}>
          <SearchIcon style={{ paddingRight: 10, paddingTop: 5, color: '#2874f0', fontSize: 35, cursor: 'pointer' }} />
        </Box>
      </Box>

      {query && (
        <Box
          sx={{
            position: 'absolute',
            top: '100%',
            width: '100%',
            backgroundColor: '#fff',
            boxShadow: 3,
            zIndex: 10,
            maxHeight: '250px',
            overflowY: 'auto',
            mt: 1,
          }}
        >
          {filteredProducts.length ? (
            filteredProducts.map(product => (
              <Link to={`/product/${product._id}`} key={product._id}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 1,
                    borderBottom: '1px solid #eee',
                    '&:hover': { backgroundColor: '#f9f9f9' },
                  }}
                >
                  <img
                    src={`http://localhost:5000/uploads/${product.productImage?.[0]?.img}`}
                    alt=""
                    style={{ width: 50, height: 50, objectFit: 'contain', marginRight: 10 }}
                  />
                  <span style={{
                    fontSize: '14px',
                    color: '#333',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    width: 'calc(100% - 60px)'
                  }}>
                    {product.productTitle}
                  </span>
                </Box>
              </Link>
            ))
          ) : (
            <Box p={1} sx={{ fontSize: '14px', color: 'gray' }}>
              No results found
            </Box>
          )}
        </Box>
      )}
    </StyledBox>
  );
};

export default OtherSearch;
