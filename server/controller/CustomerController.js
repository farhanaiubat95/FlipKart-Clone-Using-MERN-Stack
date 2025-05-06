import CartModel from '../model/CartModel.js';

export const AddToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await CartModel.findOne({ user: userId });

    if (!cart) {
      const newCart = new CartModel({
        user: userId,
        cartItems: [req.body.cartItems] // ✅ wrap inside array directly
      });
      await newCart.save();
      return res.status(200).json({ success: true, message: "Product added to cart successfully", newCart });
    } else {
      // check if product already exists
      const cartExist = cart.cartItems.find(
        (item) => item.product.toString() === req.body.cartItems.product.toString()
      );

      if (cartExist) {
        // ✅ update quantity if product exists
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

