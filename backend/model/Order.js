import mongoose from "mongoose";

// models/Order.js (simplified)
const orderSchema = new mongoose.Schema(
  {
    stripeSessionId: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        price: Number,
        qty: Number,
        img: String,
        description: String,
      },
    ],
    itemPrice: Number,
    taxPrice: Number,
    shippingPrice: Number,
    totalPrice: Number,
    delivered: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "pending",
      enum: [
        "delivered",
        "cancelled",
        "expired",
        "pending",
        "shipped",
        "paid",
        "not delivered",
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
