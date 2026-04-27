// models/order.model.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    items: Array,
    totalAmount: Number,
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    stripeSessionId: { type: String, unique: true },
    paymentIntentId: String,
    address: Object,
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
