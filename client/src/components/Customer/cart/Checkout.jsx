import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Divider,
  Modal,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const [order, setOrder] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    postalCode: "",
  });

  useEffect(() => {
    const savedOrder = localStorage.getItem("orderData");
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    } else {
      navigate("/cart");
    }
  }, [navigate]);

  if (!order) return null;

  const { items, price, discount, deliveryCharges, totalAmount, totalSavings } = order;

  const handleAddressChange = (field, value) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  const isAddressValid =
    address.fullName &&
    address.phone &&
    address.addressLine &&
    address.city &&
    address.postalCode;



  const handleConfirmOrder = async () => {
    if (!isAddressValid) return;

    if (paymentMethod === "cod") {
      try {
        const res = await axios.post(
          "http://localhost:5000/customer/orderplace",
          {
            items: items.map((item) => ({
              product: item.product._id,
              quantity: item.quantity,
              price: item.product.productPriceAfterDiscount,
            })),
            address,
            price,
            discount,
            deliveryCharges,
            totalAmount,
            totalSavings,
            paymentMethod: "cod",
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true, // move here
          }
        );


        const data = res.data;
        console.log("Order Response:", data);

        if (data.message === "Invalid or expired token") {
          localStorage.removeItem("token");
          alert("Session expired. Please log in again.");
          navigate("/login");
          return;
        }

        if (data.success) {
          localStorage.removeItem("orderData");
          setOpenModal(true);
        } else {
          alert("Order failed: " + data.message);
        }
      } catch (error) {
        console.error("Order Error:", error);
        alert("Something went wrong while placing your order.");
      }
    } else {
      navigate("/payment", { state: { order, address } });
    }
  };


  return (
    <Box maxWidth="1200px" mx="auto" mt={10} className="xl:h-[830px]" p={isMobile ? 2 : 4} boxShadow={2} bgcolor="#fff" borderRadius={2}>
      <Typography variant="h4" textAlign="center" mb={4}>
        Checkout
      </Typography>

      <Box display="flex" flexDirection={isMobile ? "column" : "row"} gap={4} >
        {/* Left Section: Order Items */}
        <Box
          flex={1}
          p={2}
          border="1px solid #ccc"
          borderRadius={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%", // allow outer box to stretch
          }}
        >
          <Typography
            variant="h6"
            mb={2}
            sx={{
              position: "sticky",
              top: 0,
              bgcolor: "#fff",
              zIndex: 10,
              py: 1,
              borderBottom: "1px solid #ccc",
            }}
          >
            Your Items ({items.length})
          </Typography>

          {/* 👇 Scrollable Area */}
          <Box
            sx={{
              flexGrow: 1,
              maxHeight: "600px", // adjust as needed
              overflowY: "auto",
            }}
          >
            {items.map((item, idx) => (
              <Box
                key={idx}
                mb={2}
                borderBottom="1px solid #eee"
                pb={1}
                display="flex"
                gap={2}
              >
                <Box className="font-bold px-3 w-[10%]">{idx + 1}</Box>
                <Box className="w-[90%]">
                  <Typography fontWeight="bold">{item.product?.productTitle}</Typography>
                  <Typography>Quantity: {item.quantity}</Typography>
                  <Typography>Price: Tk {item.product?.productPriceAfterDiscount} each</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>


        {/* Right Section */}
        <Box
          flex={1.2}
          p={2}
          border="1px solid #ccc"
          borderRadius={2}
          sx={{
            height: isMobile ? "auto" : { xl: "700px", lg: "auto" },
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Address */}
          <Typography variant="h6" mb={2}>Shipping Address</Typography>
          <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }} gap={2}>
            <TextField label="Full Name" value={address.fullName} onChange={(e) => handleAddressChange("fullName", e.target.value)} fullWidth />
            <TextField label="Phone Number" value={address.phone} onChange={(e) => handleAddressChange("phone", e.target.value)} fullWidth />
            <TextField label="Address Line" value={address.addressLine} onChange={(e) => handleAddressChange("addressLine", e.target.value)} fullWidth />
            <TextField label="City" value={address.city} onChange={(e) => handleAddressChange("city", e.target.value)} fullWidth />
            <TextField label="Postal Code" value={address.postalCode} onChange={(e) => handleAddressChange("postalCode", e.target.value)} fullWidth />
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Payment */}
          <Typography variant="h6" mb={2}>Payment Method</Typography>
          <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} row>
            <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
            <FormControlLabel value="card" control={<Radio />} label="Credit/Debit Card" />
          </RadioGroup>

          <Divider sx={{ my: 3 }} />

          {/* Summary */}
          <Typography variant="h6" mb={1}>Order Summary</Typography>
          <Typography>Price: Tk {price.toFixed(2)}</Typography>
          <Typography>Discount: -Tk {discount.toFixed(2)}</Typography>
          <Typography>Delivery Charges: Tk {deliveryCharges.toFixed(2)}</Typography>
          <Typography variant="h6" mt={1}>Total: Tk {totalAmount.toFixed(2)}</Typography>
          <Typography color="green">You save Tk {totalSavings.toFixed(2)}</Typography>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleConfirmOrder}
            disabled={!isAddressValid}
          >
            Confirm Order
          </Button>
        </Box>
      </Box>

      {/* Confirmation Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          p={4}
          bgcolor="white"
          boxShadow={4}
          borderRadius={2}
          sx={{
            width: 400,
            mx: "auto",
            mt: "20vh",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" mb={2}>
            Order Confirmed!
          </Typography>
          <Typography mb={3}>Thank you! Your items will be delivered soon.</Typography>
          <Button
            variant="contained"
            onClick={() => {
              setOpenModal(false);
              navigate("/");
            }}
          >
            Back to Home
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Checkout;
