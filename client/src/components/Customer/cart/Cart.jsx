import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Typography, styled } from '@mui/material';
import { fetchCart } from '../../../redux/CartSlice'; // Adjust path if needed
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// ================= Styled Components =================

const Component = styled(Box)(({ theme }) => ({
    width: '70%',
    margin: '90px auto',
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    [theme.breakpoints.down('md')]: {
        width: '90%',
        flexDirection: 'column',
    },
}));

const ContainerLeft = styled(Box)(({ theme }) => ({
    flex: '0 0 60%',
    background: '#fff',
    border: '1px solid #f0f0f0',
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    [theme.breakpoints.down('md')]: {
        flex: '1 1 auto',
        marginBottom: '15px',
    },
}));

const ContainerRight = styled(Box)(({ theme }) => ({
    flex: '0 0 40%',
    background: '#fff',
    border: '1px solid #f0f0f0',
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
}));

const Header = styled(Box)(() => ({
    padding: '15px 24px',
}));

const ButtonWrapper = styled(Box)(() => ({
    padding: '15px 24px',
    boxShadow: '0 -2px 10px 0 rgb(0 0 0 / 10%)',
    borderTop: '1px solid #f0f0f0',
}));

const StyledButton = styled(Button)(({ theme }) => ({
    marginLeft: 'auto',
    color: '#fff',
    background: '#fb641b',
    width: '250px',
    height: '50px',
    '&:hover': {
        background: '#e5550d',
    },
    [theme.breakpoints.down('md')]: {
        width: '230px',
        height: '40px',
    },
    [theme.breakpoints.down('sm')]: {
        width: '130px',
    },
}));

const Heading = styled(Box)(({ theme }) => ({
    padding: '15px 24px',
    background: '#fff',
    borderBottom: '1px solid #f2f2f2',
    '& > p': {
        color: '#878787',
        fontSize: '16px',
        fontWeight: 600,
        textTransform: 'uppercase',
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
    },
}));

const DiscountBoxs = styled(Box)(({ theme }) => ({
    color: 'green',
    fontWeight: 500,
    fontSize: '14px',
}));

// ================= CartItem + GroupsButton ================

const CartItemBox = styled(Box)(({ theme }) => ({
    borderTop: '1px solid #f0f0f0',
    margin: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 20px ',
}));

const LeftBox = styled(Box)(({ theme }) => ({
    width: '10%',
    margin: '20px 10px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    [theme.breakpoints.down('md')]: {
        width: '20%',
    },
}));

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
    },
}));

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
    },
}));

const RightText = styled(Typography)(({ theme }) => ({
    width: '350px',
    fontSize: '16px',
    fontWeight: 700,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    [theme.breakpoints.down('lg')]: {
        width: '300px',
    },
    [theme.breakpoints.down('md')]: {
        width: '200px',
    },
}));

const RemoveButton = styled(Button)(() => ({
    marginTop: '20px',
    fontSize: '14px',
    color: '#000',
    fontWeight: '700',
    padding: 0,
    '&:hover': {
        backgroundColor: 'transparent',
    },
}));

// Quantity Button Styles
const QtyComponent = styled(Box)(() => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    margin: '10px 0',
}));

const StyledButtonGroup = styled(Box)(() => ({
    display: 'flex',
    gap: '5px',
}));

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
}));

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
}));


const CartItem = ({ item, removeItem, onQuantityChange }) => {
    const assure = 'https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_9e47c1.png';

    return (
        <CartItemBox>
            <LeftBox>
                <Image
                    src={`http://localhost:5000/uploads/${item.product?.productImage?.[0]?.img}`}
                    alt={item.product?.productTitle}
                />
                <QtyComponent>
                    <StyledButtonGroup>
                        <CircleButton
                            onClick={() => onQuantityChange(item.product._id, 'decrease')}
                            variant="outlined"
                        >
                            -
                        </CircleButton>
                        <MiddleButton variant="outlined">{item.quantity}</MiddleButton>
                        <CircleButton
                            onClick={() => onQuantityChange(item.product._id, 'increase')}
                            variant="outlined"
                        >
                            +
                        </CircleButton>
                    </StyledButtonGroup>
                </QtyComponent>
            </LeftBox>

            <RightBox>
                <RightText>{item.product?.productTitle}</RightText>
                <Typography style={{ display: 'flex', alignItems: 'center' }}>
                    <Box component="span" style={{ color: '#878787' }}>
                        Seller: {item.product?.createdBy?.shopName}
                    </Box>
                    <Box component="span">
                        <img
                            src={assure}
                            style={{ width: 50, marginLeft: 10, marginTop: 7 }}
                            alt=""
                        />
                    </Box>
                </Typography>
                <Typography style={{ marginTop: 10 }}>
                    <Box component="span" style={{ fontSize: 17, fontWeight: 600, color: 'black' }}>
                        Tk {item.product?.productPriceAfterDiscount}
                    </Box>
                    <Box component="span" style={{ color: '#878787', margin: '0 15px', fontSize: 14 }}>
                        <strike>Tk {item.product?.productPrice}</strike>
                    </Box>
                    <Box component="span" style={{ color: '#388E3C', fontSize: 14 }}>
                        {item.product?.productOffer}% off
                    </Box>
                </Typography>
                <RemoveButton onClick={() => removeItem(item.product._id)}>Remove</RemoveButton>
            </RightBox>
        </CartItemBox>
    );
};

// ========== Main Cart ==========

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cart, error } = useSelector((state) => state.Cart);

    const initialItems = cart?.cartItems || cart?.items || [];
    const [localItems, setLocalItems] = useState(initialItems);

    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    useEffect(() => {
        const items = cart?.cartItems || cart?.items || [];
        setLocalItems(items);
    }, [cart]);

    useEffect(() => {
        totalAmount();
    }, [localItems]);

    const totalAmount = () => {
        let totalPrice = 0;
        let totalDiscount = 0;
        let quantitySum = 0;

        localItems.forEach((item) => {
            const quantity = item.quantity || 1;
            const mrp = item.product?.productPrice || 0;
            const discounted = item.product?.productPriceAfterDiscount || 0;

            totalPrice += discounted * quantity;
            totalDiscount += (mrp - discounted) * quantity;
            quantitySum += quantity;
        });

        setPrice(totalPrice);
        setDiscount(totalDiscount);
        setTotalQuantity(quantitySum);
    };

    const handleQuantityChange = (productId, type) => {
        const updatedItems = localItems.map(item => {
            if (item.product._id === productId) {
                const newQuantity =
                    type === 'increase' ? item.quantity + 1 : item.quantity - 1;
                return {
                    ...item,
                    quantity: newQuantity < 1 ? 1 : newQuantity,
                };
            }
            return item;
        });
        setLocalItems(updatedItems);
    };

    const removeItem = async (productId) => {
        try {
            const res = await axios.delete(`http://localhost:5000/customer/remove/${productId}`, {
                withCredentials: true,
            });

            const data = res.data;

            if (data.success) {
                toast.success(data.message);
                dispatch(fetchCart());
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Failed to remove item');
        }
    };

    // Place Order
    const handlePlaceOrder = () => {
        const orderData = {
            items: localItems,
            price,
            discount,
            deliveryCharges,
            totalAmount: price + deliveryCharges,
            totalSavings: discount - deliveryCharges,
        };
        console.log("Order Data:", orderData);

        localStorage.setItem("orderData", JSON.stringify(orderData));
        navigate("/myaccount/checkout");
    };


    const deliveryCharges = 40;
    const totalAmountPayable = price + deliveryCharges;
    const totalSavings = discount - deliveryCharges;

    if (error) return <Typography color="error">Error: {error}</Typography>;

    return (
        <Component>
            {localItems.length ? (
                <>
                    <ContainerLeft>
                        <Header>
                            <Typography variant="h6">My Cart ({localItems.length})</Typography>
                        </Header>
                        <Box className="p-3">
                            {localItems.map((item) => (
                                <CartItem
                                    key={item._id}
                                    item={item}
                                    removeItem={removeItem}
                                    onQuantityChange={handleQuantityChange}
                                />
                            ))}
                        </Box>
                        <ButtonWrapper className="flex">
                            <StyledButton onClick={handlePlaceOrder}>Place Order</StyledButton>
                        </ButtonWrapper>
                    </ContainerLeft>

                    <ContainerRight>
                        <Box>
                            <Heading>
                                <Typography variant="h6">Price Details</Typography>
                            </Heading>
                            <Container>
                                <Typography>
                                    Price ({totalQuantity} {totalQuantity > 1 ? 'items' : 'item'})
                                    <Box component="span" sx={{ float: 'right' }}>
                                        Tk {price.toFixed(2)}
                                    </Box>
                                </Typography>

                                <Typography>
                                    Discount
                                    <Box component="span" sx={{ float: 'right' }}>
                                        -Tk {discount.toFixed(2)}
                                    </Box>
                                </Typography>

                                <Typography>
                                    Delivery Charges
                                    <Box component="span" sx={{ float: 'right' }}>
                                        Tk {deliveryCharges.toFixed(2)}
                                    </Box>
                                </Typography>

                                <Typography variant="h6">
                                    Total Amount
                                    <Box component="span" sx={{ float: 'right' }}>
                                        Tk {totalAmountPayable.toFixed(2)}
                                    </Box>
                                </Typography>

                                <DiscountBoxs>
                                    {
                                        discount > 0 ? (
                                            <Typography>
                                                You will save  Tk {totalSavings.toFixed(2)} on this order

                                            </Typography>
                                        ) : (
                                            <Typography>
                                                You will save Tk 0 on this order
                                            </Typography>
                                        )
                                    }
                                </DiscountBoxs>
                            </Container>
                        </Box>
                    </ContainerRight>
                </>
            ) : (
                <Box width="100%">
                    <Typography variant="h5" align="center" mt={10}>
                        Your cart is empty.
                    </Typography>
                </Box>
            )}
        </Component>
    );
};

export default Cart;