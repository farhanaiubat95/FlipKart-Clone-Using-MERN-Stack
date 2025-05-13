import productModel from "../model/productModel.js";
import slugify from "slugify";
import category from "../model/CategoriesModel.js";
import mongoose from "mongoose";

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
      inStock,
      createdBy,
    } = request.body;

    let  productImage = [];
    let productDiscount = 0;

    if(request.files.length>0){
        productImage = request.files.map((file) => {
            return { img: file.filename };
          });
    }

    // Validation
    if (!productName || !productTitle || !productPrice || !productCategory) {
      return response.status(400).json({ message: "Required fields are missing" });
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

if (productOffer) {
  productDiscount = productPrice - (productPrice * productOffer) / 100;
} else {
  productDiscount = productPrice;
}
    // Create product (just pass the category _id)
    const product = await productModel.create({
      productName,
      productTitle,
      brand,
      slug,
      productImage,
      productPrice,
      productOffer,
      productDiscount,
      productDescription,
      productCategory, // store only ObjectId here
      productQuantity,
      inStock,
      createdBy,
    });
    console.log(product);

    return response.status(201).json({success: true, message: "Product created successfully", product });
  } catch (e) {
    console.error("Error in CreateProduct", e.message);
    return response.status(500).json({success: false, message: "Server Error", error: e.message });
  }
};


// get all products
export const getAllProducts = async (request, response) => {
    try {
        const products = await productModel.find({});
        response.status(200).json(products);
    } catch (e) {
        console.log("Error in getAllProducts", e.message);
    }
};