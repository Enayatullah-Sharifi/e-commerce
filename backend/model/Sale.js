import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
  {
    
    discountPercent: {
      type: Number,
      required: true,
      min: 1,
      max: 90,
    },

    startsAt: {
      type: Date,
      default: Date.now,
    },

    endsAt: {
      type: Date,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Sale", saleSchema);
