import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    product:{
        type:Object,
    },
    quantity:{
        type:Number,
    },
    user:{
        type:Object,
    },
    transactionId:{
        type:String,
    },
    paidStatus:{
        type:String,
    },
});