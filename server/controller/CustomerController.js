import CartModel from '../model/CartModel.js';
import OrderModel from '../model/orderModel.js';

// Add product to cart
export const AddToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await CartModel.findOne({ user: userId });

    if (!cart) {
      const newCart = new CartModel({
        user: userId,
        cartItems: [req.body.cartItems] //wrap inside array directly
      });
      await newCart.save();
      return res.status(200).json({ success: true, message: "Product added to cart successfully", newCart });
    } else {
      // check if product already exists
      const cartExist = cart.cartItems.find(
        (item) => item.product.toString() === req.body.cartItems.product.toString()
      );

      if (cartExist) {
        //update quantity if product exists
        const updatedCart = await CartModel.findOneAndUpdate(
          { user: userId, "cartItems.product": req.body.cartItems.product },
          {
            $inc: { "cartItems.$.quantity": req.body.cartItems.quantity },
            $set: { "cartItems.$.price": req.body.cartItems.price } 
          },
          { new: true }
        );
        return res.status(200).json({ success: true, message: "Cart updated successfully", updatedCart });
      } else {
        const updatedCart = await CartModel.findOneAndUpdate(
          { user: userId },
          { $push: { cartItems: req.body.cartItems } },
          { new: true }
        );

        return res.status(200).json({ success: true, message: "Product added to cart successfully", updatedCart });
      }
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    console.log(error);
  }
};

// Get cart
export const GetCart = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: "Unauthorized: User info missing" });
    }

    const userId = req.user._id;
    const cart = await CartModel.findOne({ user: userId }).populate("cartItems.product");

    res.status(200).json({ success: true, message: "Cart fetched successfully", cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    console.log(error);
  }
};

// Remove item from cart
export const RemoveFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.id;

    const updatedCart = await CartModel.findOneAndUpdate(
      { user: userId },
      { $pull: { cartItems: { product: productId } } },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ success: false, message: "Cart or item not found" });
    }

    res.status(200).json({
      success: true,
      message: "Item removed successfully",
      cart: updatedCart,
    });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};


// Place order
export const PlaceOrder = async (req, res) => {
  try {
    const userId = req.user._id;

    const {
      items,
      address,
      price,
      discount,
      deliveryCharges,
      totalAmount,
      totalSavings,
      paymentMethod,
    } = req.body;

    // Basic validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "Order must contain at least one item." });
    }

    if (!address || !address.fullName || !address.phone || !address.addressLine || !address.city || !address.postalCode) {
      return res.status(400).json({ success: false, message: "Shipping address is incomplete." });
    }

    if (!paymentMethod || !["cod", "card"].includes(paymentMethod)) {
      return res.status(400).json({ success: false, message: "Invalid payment method." });
    }

    // Construct each order item with correct structure
    const orderItems = items.map(item => ({
      product: item.product,
      quantity: item.quantity,
      price: item.price,
    }));

    // Create new order
    const newOrder = new OrderModel({
      user: userId,
      items: orderItems,
      address,
      price,
      discount,
      deliveryCharges,
      totalAmount,
      totalSavings,
      paymentMethod,
      orderStatus: "Pending", // default status at placement
    });

    await newOrder.save();

    // Delete the cart after placing the order
    await CartModel.findOneAndDelete({ user: userId });

    res.status(201).json({
      success: true,
      message: "Order placed successfully, cart has been cleared",
      order: newOrder,
    });

  } catch (error) {
    console.error("Order Placement Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong while placing order." });
  }
};









