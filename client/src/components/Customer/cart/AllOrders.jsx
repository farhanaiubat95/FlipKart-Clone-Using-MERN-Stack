import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Chip, Divider, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HomeIcon from '@mui/icons-material/Home';

const AllOrders = () => {
    const orders = useSelector((state) => state.Order.orders);
    const user = useSelector((state) => state.Auth.user);

    const userOrders = orders?.filter(order => order.user === user._id);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <Box className="p-4 sm:p-8 bg-gray-100 h-[93vh] ">
            <Typography variant="h4" className="font-bold pb-6 text-center ">My Orders</Typography>

            {userOrders?.length === 0 ? (
                <Typography className="text-center text-gray-600">No orders found.</Typography>
            ) : (
                userOrders.map((order) => (
                    <Box
                        key={order._id}
                        className="bg-white rounded-xl shadow p-4 sm:p-6 mb-6 border border-gray-200 xl:w-[800px] mx-auto"
                    >
                        {/* Order Header */}
                        <Box className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 ">
                            <Box className="flex items-center gap-2 mb-2 sm:mb-0">
                                <Typography className="text-sm sm:text-base font-medium text-gray-700">
                                    Order ID: <span className="text-blue-700 font-semibold">#{order._id.slice(-7)}</span>
                                </Typography>
                                <Tooltip title="Copy Order ID">
                                    <IconButton size="small" onClick={() => copyToClipboard(order._id)}>
                                        <ContentCopyIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </Box>

                            <Chip icon={<LocalShippingIcon />} label="Regular Delivery" size="small" color="info" />
                        </Box>

                        {/* Address */}
                        <Box className="flex justify-between items-center mb-4">
                            <Box className="flex gap-2 mb-3 text-sm text-gray-800">
                                <HomeIcon fontSize="small" className="text-gray-600 mt-0.5" />
                                <Box>
                                    <div className="font-semibold">{order.address.fullName}</div>
                                    <div>{order.address.phone}</div>
                                    <div>{order.address.addressLine}, {order.address.city}, {order.address.postalCode}</div>
                                </Box>
                            </Box>
                            <Box>
                                <Chip
                                    label={order.paidStatus ? 'Paid' : 'Unpaid'}
                                    size="small"
                                    sx={{
                                        backgroundColor: order.paidStatus ? '#102E50' : '#C5172E', 
                                        color: order.paidStatus ? '#fff' : '#fff',     
                                        fontWeight: 500,
                                        borderRadius: '6px',
                                    }}
                                />

                            </Box>
                        </Box>

                        <Divider className="my-3" />

                        {/* Order Details */}
                        <Box className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-gray-700">
                            <div><strong>Date:</strong><br /> {new Date(order.createdAt).toLocaleString()}</div>
                            <div><strong>Status:</strong><br />
                                <Chip
                                    label={order.orderStatus}
                                    size="small"
                                    color={
                                        order.orderStatus === 'Delivered' ? 'success'
                                            : order.orderStatus === 'Pending' ? 'warning'
                                                : order.orderStatus === 'Cancelled' ? 'error'
                                                    : 'default'
                                    }
                                />
                            </div>
                            <div><strong>Amount Payable:</strong><br />
                               Tk {order.totalAmount.toFixed(2)}
                            </div>
                        </Box>
                    </Box>
                ))
            )}
        </Box>
    );
};

export default AllOrders;
