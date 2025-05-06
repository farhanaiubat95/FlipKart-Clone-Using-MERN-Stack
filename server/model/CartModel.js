 import mongoose from "mongoose";

 const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  cartItems: [  
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Productcollection", required: true },
      quantity: { type: Number, default: 1, required: true },
      price: { type: Number, required: true },
    },
  ],
}, { timestamps: true });

 export default mongoose.model("Cart", CartSchema);