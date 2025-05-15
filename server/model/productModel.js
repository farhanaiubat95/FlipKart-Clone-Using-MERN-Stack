import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true,
    },
    productTitle:{
        type: String,
        required: true,
        trim: true,
    },    
    brand: {
        type: String,
        trim: true,
    },
      
    slug:{
        type: String,
        required: true,
        unique: true,
    },
    productImage:[
        {
            img:{
                type: String,
            }
        }
    ],
    productPrice: {
        type: Number,
        // required: true,
        min: 0
    },
    productOffer: {
        type: Number,
        min: 0,
        max: 100
    },
    productDiscount: {
        type: Number,
    },
    productPriceAfterDiscount: {
        type: Number
    },
      
    productDescription: {
        type: String,
        // required: true,
        trim: true,
    },
    productCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    productQuantity: {
        type: Number,
        default: 1
    },
    inStock: {
        type: Boolean,
        default: true,
    },
    productReviews: [
        {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
          },
          reviews: String,
        },
    ],
    productRatings: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    createdBy: {
       id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
       },
       name: String,
       shopName: String,
       email: String,
       phone: String,
       address: String
    },

      

}, { timestamps: true });


export default mongoose.model("Productcollection", productSchema);