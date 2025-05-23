import productModel from "../model/productModel.js";
import slugify from "slugify";
import userModel from "../model/userModel.js";
import category from "../model/CategoriesModel.js";
import mongoose from "mongoose";
import OrderModel from "../model/OrderModel.js";
// Create Product
export const CreateProduct = async (request, response) => {
  try {
    const {
      productName,
      productTitle,
      brand,
      productPrice,
      productOffer,
      productDescription,
      productCategory,
      productQuantity,
      createdBy,
    } = request.body;

    let  productImage = [];
    let productDiscount = 0;
    let productPriceAfterDiscount = 0;
    let inStock =true;
    let productDescriptionok="NA";

    if(request.files.length>0){
        productImage = request.files.map((file) => {
            return { img: file.filename };
          });
    }

    // Validation
    if (!productName || !productTitle || !productPrice || !productCategory) {
      return response.status(400).json({ message: "Required fields are missing" });
    }

    // Validate and fetch user
    if (!mongoose.Types.ObjectId.isValid(createdBy)) {
      return response.status(400).json({ message: "Invalid user ID format" });
    }

    const user = await userModel.findById(createdBy);
    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }
  

    // Validate if productCategory is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productCategory)) {
      return response.status(400).json({ message: "Invalid category ID format" });
    }

    // Create slug from productName
    const slug = slugify(productName, { lower: true });

    // Check if slug already exists
    const existingProduct = await productModel.findOne({ slug });
    if (existingProduct) {
      return response.status(400).json({ message: "Product with this name already exists" });
    }

    // Check if category exists
    const categoryExists = await category.findById(productCategory);
    if (!categoryExists) {
      return response.status(400).json({ message: "Category does not exist" });
    }
    if (productDescription) {
      productDescriptionok = productDescription;
    }
    
    const price = Number(productPrice);
    const offer = Number(productOffer);
    const quantity = Number(productQuantity);
    if (quantity < 1) {
      inStock = false;
    }

    // Calculate discount
    if (offer) {
     productDiscount = (price * offer) / 100;
     productPriceAfterDiscount = price - productDiscount;
    } else{
      productPriceAfterDiscount = price;
    }
    
const product = await productModel.create({
  productName,
  productTitle,
  brand,
  slug,
  productImage,
  productPrice: price,
  productOffer: offer,
  productDiscount,
  productPriceAfterDiscount,
  productDescription: productDescriptionok,
  productCategory,
  productQuantity: quantity,
  inStock,
  createdBy: {
    id: user._id,
    name: user.firstname + " " + user.lastname,
    shopName: user.sellerShop,
    email: user.email,
    phone: user.phone,
    address: user.address,
  },
});

    console.log(product);

    return response.status(201).json({success: true, message: "Product created successfully", product });
  } catch (e) {
    console.error("Error in CreateProduct", e.message);
    return response.status(500).json({success: false, message: "Server Error", error: e.message });
  }
  
};


export const UpdateProduct = async (request, response) => {
  try {
    const {
      productName,
      productTitle,
      brand,
      productPrice,
      productOffer = 0,
      productDescription,
      productCategory,
      productQuantity,
      retainOldImages,
    } = request.body;

    const productId = request.params.id;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return response.status(400).json({ message: "Invalid product ID" });
    }

    if (!productName || !productTitle || !productPrice || !productCategory) {
      return response.status(400).json({ message: "Required fields are missing" });
    }

    if (!mongoose.Types.ObjectId.isValid(productCategory)) {
      return response.status(400).json({ message: "Invalid category ID format" });
    }

    const categoryExists = await category.findById(productCategory);
    if (!categoryExists) {
      return response.status(400).json({ message: "Category does not exist" });
    }

    const price = parseFloat(productPrice);
    const offer = parseFloat(productOffer) || 0;
    const quantity = parseInt(productQuantity);

    const discount = Math.round((price * offer) / 100);
    const priceAfterDiscount = price - discount;
    const inStock = quantity > 0;

    let productImage = [];

    // Handle image retention
    if (request.files?.length > 0) {
      // New images uploaded
      productImage = request.files.map((file) => ({ img: file.filename }));
    } else if (retainOldImages === "true") {
      // Retain existing images from DB
      const existingProduct = await productModel.findById(productId);
      if (existingProduct) {
        productImage = existingProduct.productImage;
      }
    }

    const updateData = {
      productName,
      productTitle,
      brand,
      productPrice: price,
      productOffer: offer,
      productDescription,
      productCategory,
      productQuantity: quantity,
      productDiscount: discount,
      productPriceAfterDiscount: priceAfterDiscount,
      inStock,
      productImage,
    };

    const updated = await productModel.findByIdAndUpdate(productId, updateData, { new: true });

    if (!updated) {
      return response.status(404).json({ success: false, message: "Product not found" });
    }

    return response.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updated,
    });

  } catch (e) {
    console.error("Error in UpdateProduct:", e.message);
    return response.status(500).json({
      success: false,
      message: "Server Error",
      error: e.message,
    });
  }
};


// Delete Product
export const DeleteProduct = async (request, response) => {
  try {
    const productId = request.params.id;
    const product = await productModel.findByIdAndDelete(productId);
    if (!product) {
      return response.status(404).json({ message: "Product not found" });
    }
    return response.status(200).json({success: true, message: "Product deleted successfully", product });
  } catch (e) {
    console.error("Error in DeleteProduct", e.message);
    return response.status(500).json({success: false, message: "Server Error", error: e.message });
  }
};


// Update Order Status
export const UpdateOrderStatus = async (request, response) => {
  try {
    const orderId = request.params.id;
    const { orderStatus } = request.body;

    if (!orderStatus) {
      return response.status(400).json({ message: "Order status is required" });
    }

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    );

    if (!updatedOrder) {
      return response.status(404).json({ message: "Order not found" });
    }

    return response.status(200).json({success: true, message: "Order status updated successfully", updatedOrder });
  } catch (e) {
    console.error("Error in UpdateOrderStatus", e.message);
    return response.status(500).json({success: false, message: "Server Error", error: e.message });
  }
};