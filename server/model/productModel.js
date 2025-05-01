import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id:{
        type:String,
        unique:true,
        required:true
    },
    url:String,
    detailUrl:String,
    title:{
        type:Object,
        required:true
    },
    price:{
        type:Object,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    description:{
        type:String
    },
    discount:{
        type:String,
    },
    tagline:{
        type:String,
        
    }

});

const productModel = mongoose.model('products',productSchema);
export default productModel;