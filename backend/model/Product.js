import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  reviews: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review",
  },
  qty: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    require: true,
  },
  description:{
    type: String
  }
});

const Product = mongoose.model("product", ProductSchema);
export default Product;
