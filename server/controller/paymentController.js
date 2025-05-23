import productModel from "../model/productModel.js"; // Make sure this matches
import userModel from "../model/userModel.js"; // Make sure this matches
import OrderModel from "../model/orderModel.js"; // Make sure this matches
import CartModel from "../model/cartModel.js"; // Make sure this matches
import { ObjectId } from 'mongodb'; 

// paytime
import paytime from '../dotenv/paytime.js';
import SSLCommerzPayment from 'sslcommerz-lts';


// post order
export const postOrder = async (request, response) => {
  try {
    const { items, userId, address, deliveryCharges, paymentMethod } = request.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return response.status(404).json({ success: false, message: "User not found" });
    }

    // Step 1: Extract product IDs from cart items
    const productIds = items.map((item) => item.product);

    // Step 2: Fetch full product details from DB
    const products = await productModel.find({ _id: { $in: productIds } });

    // Step 3: Build full order items and compute totals
    let price = 0;
    let discount = 0;
    let totalSavings = 0;

    const orderItems = items.map((item) => {
  const product = products.find((p) => p._id.toString() === item.product);
  if (!product) throw new Error("Product not found");

  const originalPrice = product.productPrice;
  const discountedPrice = product.productDiscount;
  const itemTotalOriginal = originalPrice * item.quantity;
  const itemTotalDiscounted = discountedPrice * item.quantity;

  price += itemTotalOriginal;
  discount += itemTotalDiscounted;

  totalSavings = discount - deliveryCharges;

  return {
    product: product._id, 
    productName: product.productName,
    brand: product.brand,
    quantity: item.quantity,
    price: product.productPrice,
    total: product.productDiscount,
  };
});

    const totalAmount = price - discount + deliveryCharges;

    const tran_id = new ObjectId().toString();
    const { store_id, store_passwd } = paytime;
    const is_live = false;


    const data = {
      total_amount: totalAmount,
      currency: "BDT",
      tran_id,
      success_url: `http://localhost:5000/payment-success/${tran_id}`,
      fail_url: "http://localhost:3030/fail",
      cancel_url: "http://localhost:3030/cancel",
      ipn_url: "http://localhost:3030/ipn",
      shipping_method: "Courier",
      product_name: "Multiple Products",
      product_category: "Mixed",
      product_profile: "general",
      cus_name: address.fullName,
      cus_email: user.email,
      cus_add1: address.addressLine,
      cus_city: address.city,
      cus_postcode: address.postalCode || "0000",
      cus_country: "Bangladesh",
      cus_phone: address.phone,
      ship_name: "Shundorban Courier Service",
      ship_add1: "Mohakhali",
      ship_city: "Dhaka",
      ship_postcode: "Dhaka North-1206",
      ship_country: "Bangladesh",
    };

if (paymentMethod === "card") {
  const newOrder = new OrderModel({
    user: user._id,
    items: orderItems,
    address,
    paidStatus:false,
    transactionId: tran_id,
    price,
    discount,
    deliveryCharges,
    totalAmount,
    totalSavings,
    paymentMethod,
    orderStatus: "Pending",
  });

   await newOrder.save(); // Save the order to the database

  // Initialize SSLCommerz
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

  sslcz.init(data).then(async (apiResponse) => {
    let GatewayPageURL = apiResponse.GatewayPageURL;

    // Clear user's cart after successful order creation
    await CartModel.deleteMany({ user: user._id });

    response.send({ url: GatewayPageURL }); // Only one response
  }).catch((err) => {
    console.error("SSLCommerz Error:", err);
    response.status(500).json({ error: "Payment initialization failed" });
  });
}

  } catch (e) {
    console.error("Error in postOrder", e);
    response.status(500).json({ error: "Failed to create order" });
  }
};



// post success
export const postSuccess = async(request,response)=>{
    try{
        console.log(request.params.tran_id);
        const result= await OrderModel.updateOne({ transactionId: request.params.tran_id },{
            $set:{
                paidStatus:true,
                orderStatus:"Pending"
            }
        });

        if(result.modifiedCount>0){
            response.redirect(`http://localhost:5173/myaccount/payment-success/${request.params.tran_id}`);
        }

    }catch(e){
        console.log("Error in postSuccess",e.response);
    }
}