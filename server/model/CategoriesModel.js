import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    trim: true,
  },
  categoryImage: {
    type: String,
    required: true,
  },
  slug:{
    type: String,
    required: true,
    unique: true,
  },
  parentId: {
    type:String
  }
}, { timestamps: true });

export default mongoose.model("Category", categorySchema);