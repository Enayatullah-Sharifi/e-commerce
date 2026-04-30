const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    items: Array,
    totalAmount: Number,

    status: {
      // ✅ ADD THIS
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    stripeSessionId: String,
    paymentIntentId: String,
    address: Object,
  },
  { timestamps: true },
);
