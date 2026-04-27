import expressAsyncHandler from "express-async-handler";
import Review from "../model/Review.js";
import Product from "../model/Product.js";

// @desc    Add Review
// @route   POST    /api/product/:productId/review
// @access  Private
export const addReview = expressAsyncHandler(async (req, res) => {
  const user = req.user.id;
  const product = await Product.findOne({ _id: req.params.productId });

  const existingReviews = await Review.findOne({ product, user });
  if (existingReviews) {
    throw new Error("You have already reviewed this product!");
  }

  if (!product) {
    res.status(404);
    throw new Error("Product not found to review!");
  }

  const review = await Review.create({
    user: req.user.id,
    product: product._id,
    review: req.body.review,
  });

  if (!review) {
    res.status(500);
    throw new Error("Review not created!");
  }
  res.status(200).json({
    success: true,
    review,
  });
});

// @desc    Get Review
// @route   GET    /api/product/:productId/review
// @access  Public
export const getReviews = expressAsyncHandler(async (req, res) => {
  const { productId } = req.params;
  const reviews = await Review.find({ product: productId }).populate({
    path: "user",
    select: "username",
  });

  if (!reviews) {
    res.status(404);
    throw new Error("No review found!");
  }

  let totalReview;
  let avgReviews;
  if (reviews.length > 0) {
    totalReview = reviews?.reduce((a, c) => a + c.review, 0);
    avgReviews = [...Array(Math.floor(totalReview / reviews?.length)).keys()];
  }

  res.status(200).json({
    success: true,
    count: reviews?.length,
    reviews,
    avgReviews,
  });
});
