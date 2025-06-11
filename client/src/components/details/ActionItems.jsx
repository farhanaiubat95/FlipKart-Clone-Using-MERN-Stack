import React, { useState } from "react";
import { Box, Button, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/CartSlice";

// Icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import FavoriteIcon from '@mui/icons-material/Favorite';

// Styled Components
const LeftContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(6),
  // On smaller screens, stack items vertically and center them
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const StyledImage = styled(Box)(() => ({
  width: "100%",
  padding: "10px",
  border: "1px solid #f0f0f0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "300px",
  boxSizing: "border-box",
  backgroundColor: "#fff",
  position: "relative",
}));

const Image = styled("img")(() => ({
  width: "100%",
  height: "270px",
  objectFit: "contain",
  display: "block",
}));

const StyledButton = styled(Button)(() => ({
  width: "100%",
  height: 50,
  borderRadius: 2,
}));

const IconButton = styled(Button)(() => ({
  minWidth: "36px",
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  position: "absolute", // Absolute position
  top: "10px",           // Top-right corner
  right: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0",
  border: "1px solid rgba(220, 217, 217, 0.68)",
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  backgroundColor: "#fff",
  cursor: "pointer",
  transition: "background 0.3s ease",
  "&:hover": {
    backgroundColor: "#f9f9f9",
  },
  "&:focus, &:active": {
    outline: "none",
    boxShadow: "none",
    backgroundColor: "transparent",
  },
}));

// Component
const ActionItems = ({ product }) => {
  const [quantity] = useState(1);
  const [hoveredImage, setHoveredImage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const paymentNow = () => {
    navigate("/payment", { state: { product } });
  };

  const addItemToCart = () => {
    const cartItem = {
      product: product._id,
      quantity: quantity,
      price: product.productPrice,
    };

    console.log("Cart Item:", cartItem);
    dispatch(addToCart(cartItem));
  };

  const defaultImage = product.productImage?.[0]?.img;

  return (
    <LeftContainer>
      {/* Thumbnails */}
      {product?.productImage?.length > 1 && (
        <Box
          className="thumbnails"
          sx={{
            width: { xs: "25%", md: "15%" },
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {product.productImage.slice(1).map((imgObj, index) => (
            <Box
              key={index}
              sx={{
                padding: "6px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "#fff",
                cursor: "pointer",
                ":hover": {
                  border: "2px solid #2875f0",
                },
              }}
              onMouseEnter={() => setHoveredImage(imgObj.img)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <img
                src={`http://localhost:5000/uploads/${imgObj.img}`}
                alt={`Thumbnail ${index + 1}`}
                style={{
                  width: "100%",
                  height: "70px",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </Box>
          ))}
        </Box>
      )}

      {/* Main Image */}
      <Box
        className="main-image"
        sx={{
          width: { xs: "75%", md: "85%" },
        }}
      >
        <Box>
          <StyledImage>
            <IconButton>
              <FavoriteIcon style={{ fontSize: 20, color: "#d3d3d3" }} />
            </IconButton>
            <Box sx={{ textAlign: "center" }}>
              <Image
                src={`http://localhost:5000/uploads/${hoveredImage || defaultImage}`}
                alt="product"
              />
            </Box>
          </StyledImage>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              gap: 2,
              marginTop: 2,
              width: "100%",
            }}
          >
            <StyledButton
              onClick={addItemToCart}
              variant="contained"
              style={{ background: "#ff9f00" }}
            >
              <ShoppingCartIcon />&nbsp;Add to Cart
            </StyledButton>
            <StyledButton
              onClick={paymentNow}
              variant="contained"
              style={{ background: "#fb641b" }}
            >
              <FlashOnIcon />&nbsp;Buy Now
            </StyledButton>
          </Box>
        </Box>
      </Box>
    </LeftContainer>
  );
};

export default ActionItems;
