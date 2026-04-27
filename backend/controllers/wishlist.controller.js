import expressAsyncHandler from "express-async-handler";
import Product from "../model/Product.js";
import { WishList } from "../model/WishList.js";

// @des     Add item to wish list
// @route   POST    /api/wishlist
// @access  Private
export const AddItemToWishList = expressAsyncHandler(async (req, res) => {
  const { id } = req.body;
  const product = await Product.findOne({ _id: id });

  const wishlist = await WishList.findOne({
    productId: product?._id,
    userId: req.user.id,
  });

  if (wishlist) {
    res.status(400);
    throw new Error("Product Already exist in wishlist");
  }

  await WishList.create({
    productId: product._id,
    userId: req.user.id,
  });

  res.status(200).json({
    success: true,
    message: "Product added to wishlist successfully!",
  });
});

// @des     Add wishlist
// @route   GET    /api/wishlist
// @access  Private
export const getWishlist = expressAsyncHandler(async (req, res) => {
  const wishlists = await WishList.find({ userId: req.user.id }).populate({
    path: "productId",
    select: "name price img description",
  });

  res.status(200).json({
    success: true,
    data: wishlists,
  });
});

// @des     Delete an item from wish list
// @route   DELETE    /api/wishlist/:id
// @access  Private
export const DeleteItemFromWishList = expressAsyncHandler(async (req, res) => {
  const product = await WishList.findByIdAndDelete(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error("No product to delete from wishlist");
  }

  res.status(200).json({
    success: true,
    message: "Product deleted form wishlist",
  });
});
