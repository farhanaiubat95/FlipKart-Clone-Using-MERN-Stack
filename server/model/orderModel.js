import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  address: {
    fullName: String,
    phone: String,
    addressLine: String,
    city: String,
    postalCode: String,
  },
  paidStatus: {
    type: Boolean,
    default: false,
  },
  transactionId: {
    type: String,
  },
  price: Number,
  discount: Number,
  deliveryCharges: Number,
  totalAmount: Number,
  totalSavings: Number,
  paymentMethod: {
    type: String,
    enum: ['cod', 'card'],
    default: 'cod',
  },
  orderStatus: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;