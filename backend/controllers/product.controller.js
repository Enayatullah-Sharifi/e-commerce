import expressAsyncHandler from "express-async-handler";
import Product from "../model/Product.js";
import { addProductFormValidator } from "../utils/formValidator.js";
import Review from "../model/Review.js";
import Sale from "../model/Sale.js";

// @desc    Add Product
// @route   POST    /api/product
// @access  Private/Admin
export const createProduct = expressAsyncHandler(async (req, res) => {
  const { name, price, category, qty, image, description } = req.body;
  const { valid, errors } = addProductFormValidator(
    name,
    price,
    category,
    qty,
    image,
    description,
  );
  if (!valid) {
    res.status(400);
    throw new Error(Object.values(errors));
  }

  const product = await Product.create({
    name,
    price,
    category,
    qty,
    img: image,
    description,
  });
  if (!product) {
    res.status(500);
    throw new Error("Error adding product");
  }

  res.status(201).json({
    success: true,
    message: "Product created!",
    data: product,
  });
});

// @desc    Get All Products
// @route   GET    /api/product
// @access  Public
export const getProducts = expressAsyncHandler(async (req, res) => {
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);
  const skip = (page - 1) * limit;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  let products = await Product.find().skip(skip).limit(limit);

  if (!products) {
    res.status(404);
    throw new Error("No product found");
  }

  const total = await Product.countDocuments();

  const sale = await Sale.findOne({
    isActive: true,
    endsAt: { $gt: new Date() },
  });

  const result = products.map((product) => {
    const realPrice = product.price;

    let discountedPrice = realPrice;
    let discountPercent = 0;

    if (sale) {
      discountPercent = sale.discountPercent;
      discountedPrice = realPrice - (realPrice * discountPercent) / 100;
    }

    return {
      ...product.toObject(),
      realPrice,
      discountedPrice: Math.round(discountedPrice),
      discountPercent,
    };
  });

  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.status(200).json({
    success: true,
    products: result,
    sale,
    count: total,
    pagination,
    totalPage: Math.ceil(total / limit),
  });
});

// @desc    Get Top Products
// @route   GET    /api/product/top
// @access  Public
export const getTopProducts = expressAsyncHandler(async (req, res) => {
  const topProducts = await Review.aggregate([
    {
      $group: {
        _id: "$product",
        reviewCount: {
          $sum: 1,
        },
        totalReview: {
          $sum: "$review",
        },
        avgReview: {
          $avg: "$review",
        },
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $unwind: "$product",
    },
    {
      $project: {
        _id: 0,
        productId: "$product._id",
        name: "$product.name",
        price: "$product.price",
        img: "$product.img",
        reviewCount: 1,
        totalReview: 1,
        avgReview: 1,
      },
    },
    {
      $sort: {
        avgReview: -1,
      },
    },
    {
      $limit: 12,
    },
  ]);
  

  res.status(200).json({
    count: topProducts.length,
    data: topProducts,
  });
});

// @desc    Get Single Product
// @route   GET    /api/product/:productId
// @access  Public
export const getProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const sale = await Sale.findOne({
    isActive: true,
    endsAt: { $gt: new Date() },
  });


  const realPrice = product.price;
  let discountedPrice = realPrice;
  let discountPercent = 0;

  if (sale) {
    discountPercent = sale.discountPercent;
    discountedPrice =
      realPrice - (realPrice * discountPercent) / 100;
  }

  res.status(200).json({
    success: true,
    data: {
      ...product.toObject(),
      realPrice,
      discountedPrice: Math.round(discountedPrice),
      discountPercent,
    },
  });
});


// @desc    Delete Product
// @route   DELETE    /api/product/:productId
// @access  Private/Admin
export const deleteProduct = expressAsyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error("No product to delete");
  }

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

// @desc    Update Product
// @route   PUT    /api/product/:productId
// @access  Private/Admin
export const updateProduct = expressAsyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!product) {
    res.status(400);
    throw new Error("Product not updated");
  }

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
  });
});

// @desc    Get Images for slider
// @route   GET    /api/product/images
// @access  Public
export const getImagesForSlider = expressAsyncHandler(async (req, res) => {
  const images = await Product.find({}).limit(10);
  const imageUrls = images.map((i) => i.img);

  res.status(200).json({
    success: true,
    count: images.length,
    imageUrls,
  });
});
