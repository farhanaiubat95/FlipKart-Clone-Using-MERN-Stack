import React, { useState, useRef } from 'react';
import {
  Box, Typography, Table, TableHead, TableRow, TableCell, TableBody,
  TableContainer, Paper, Menu, MenuItem, Button
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { put } from '../../API/ApiEndPoints';
import { useDispatch, useSelector } from 'react-redux';
import { SetOrders, UpdateOrderStatus } from '../../redux/OrderSlice';
import { SetCategories } from '../../redux/CategorySlice';

const OrderList = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.Order.orders);
  const products = useSelector((state) => state.Product.products);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const open = Boolean(anchorEl);
  const tableRef = useRef();

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const handleStatusClick = (event, orderId) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
  };



  const handleStatusChange = async (status) => {
    try {
      await put(`/seller/order-status/${selectedOrderId}`, { orderStatus: status });
      dispatch(UpdateOrderStatus({ orderId: selectedOrderId, newStatus: status }));
    } catch (err) {
      console.error('Error updating status:', err);
    } finally {
      setAnchorEl(null);
      setSelectedOrderId(null);
    }
  };

  const statusOptions = ['Pending', 'Confirmed', 'Delivered'];

  const handlePrintAll = () => {
    if (!tableRef.current) return;
    const printContent = tableRef.current.innerHTML;
    const printWindow = window.open('', '', 'width=900,height=650');
    if (!printWindow) {
      alert("Popup blocked! Please allow popups for this site.");
      return;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>Print Order List</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #000; padding: 8px; text-align: center; }
            th { background-color: #f0f0f0; }
          </style>
        </head>
        <body>
          <h1 style="text-align:center;">Order List</h1>
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();

    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  const handlePrintRow = (order, serialNumber, totalQuantity) => {
    const today = new Date();
    const dueDate = new Date(today);
    dueDate.setDate(today.getDate() + 14);

    const itemsWithProductNames = order.items.map(item => {
      const product = products.find(p => p._id === item.product);
      return {
        ...item,
        productName: product ? product.productName : 'Unknown Product'
      };
    });

    const htmlContent = `
      <html>
        <head>
          <title>Invoice</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
            .header { display: flex; justify-content: space-between; align-items: center; }
            .logo { font-size: 28px; font-weight: bold; color: #d8aa4c; }
            .invoice-details { text-align: right; }
            .invoice-details p { margin: 2px 0; font-size: 14px; }
            .bill-to { margin-top: 40px; }
            .bill-to h3 { margin-bottom: 10px; color: #333; }
            .bill-to p { margin: 2px 0; font-size: 14px; }
            .bill-section { display: flex; justify-content: space-between; }
            .paid-status { margin-top: 40px; text-align: right; }
            .paid-status h3 { margin-bottom: 10px; color: #333; }
            table { width: 100%; border-collapse: collapse; margin-top: 30px; font-size: 14px; }
            th, td { border: 1px solid #ccc; padding: 10px; text-align: left; }
            th { background-color: #f8f8f8; }
            .total-section { margin-top: 30px; display: flex; justify-content: flex-end; }
            .total-box {
              background-color: #d8aa4c; color: white; font-weight: bold;
              padding: 12px 20px; font-size: 16px; border-radius: 4px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">FlipKart Online Shopping</div>
            <div class="invoice-details">
              <p><strong>Invoice No.:</strong> ${order._id.slice(0, 6).toUpperCase()}</p>
              <p><strong>Issue Date:</strong> ${today.toLocaleDateString()}</p>
              <p><strong>Due Date:</strong> ${dueDate.toLocaleDateString()}</p>
            </div>
          </div>

          <div class="bill-section">
            <div class="bill-to">
              <h3>Bill To</h3>
              <p><strong>${order.address?.fullName || 'Customer Name'}</strong></p>
              <p>${order.address?.addressLine || ''}</p>
              <p>${order.address?.city || ''} - ${order.address?.postalCode || ''}</p>
              <p>${order.address?.phone || ''}</p>
            </div>
            <div class="paid-status">
              <h3>Payment Status</h3>
              <p><strong>${order.paidStatus ? 'Paid' : 'Not Paid'}</strong></p>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Unit Price (Tk)</th>
                <th>Amount (Tk)</th>
              </tr>
            </thead>
            <tbody>
              ${itemsWithProductNames.map(item => `
                <tr>
                  <td>${item.productName}</td>
                  <td>${item.quantity}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="total-section">
            <div class="total-box">
              Total: Tk ${order.totalAmount.toFixed(2)}
            </div>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open('', '', 'width=900,height=650');
    if (!printWindow) {
      alert("Popup blocked! Please allow popups for this site.");
      return;
    }

    printWindow.document.write(htmlContent);
    printWindow.document.close();

    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Order List</Typography>
        <Button variant="contained" color="primary" onClick={handlePrintAll}>
          Print All
        </Button>
      </Box>

      <TableContainer component={Paper} ref={tableRef}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center"><strong>Serial</strong></TableCell>
              <TableCell align="center"><strong>Order ID</strong></TableCell>
              <TableCell align="center"><strong>Items (Quantity)</strong></TableCell>
              <TableCell align="center"><strong>Address</strong></TableCell>
              <TableCell align="center"><strong>Payment</strong></TableCell>
              <TableCell align="center"><strong>Total Price</strong></TableCell>
              <TableCell align="center"><strong>Transaction ID</strong></TableCell>
              <TableCell align="center"><strong>Paid</strong></TableCell>
              <TableCell align="center"><strong>Date</strong></TableCell>
              <TableCell align="center"><strong>Status</strong></TableCell>
              <TableCell align="center"><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedOrders.map((order, index) => {
              const totalQuantity = order.items.reduce((sum, item) => sum + item.quantity, 0);
              const serialNumber = sortedOrders.length - index;

              return (
                <TableRow key={order._id}>
                  <TableCell align="center">{serialNumber}</TableCell>
                  <TableCell align="center">{order._id}</TableCell>
                  <TableCell align="center">{totalQuantity}</TableCell>
                  <TableCell align="center">
                    <div>{order.address?.fullName}</div>
                    <div>{order.address?.phone}</div>
                    <div>{order.address?.addressLine}, {order.address?.city} - {order.address?.postalCode}</div>
                  </TableCell>
                  <TableCell align="center">{order.paymentMethod?.toUpperCase()}</TableCell>
                  <TableCell align="center">Tk {(order.totalAmount).toFixed(2)}</TableCell>
                  <TableCell align="center">{order.transactionId || 'N/A'}</TableCell>
                  <TableCell align="center">{order.paidStatus ? 'Yes' : 'No'}</TableCell>
                  <TableCell align="center">{new Date(order.createdAt).toLocaleString()}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      onClick={(e) => handleStatusClick(e, order._id)}
                    >
                      {order.orderStatus}
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary"
                      onClick={() => handlePrintRow(order, serialNumber, totalQuantity)}
                    >
                      Print
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        {statusOptions.map(status => (
          <MenuItem key={status} onClick={() => handleStatusChange(status)}>
            {status}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default OrderList;
