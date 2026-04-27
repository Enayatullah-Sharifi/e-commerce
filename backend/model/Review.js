import { Schema, model } from "mongoose";

const ReviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    review: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

const Review = model("review", ReviewSchema);
export default Review;
