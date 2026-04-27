import expressAsyncHandler from "express-async-handler";
import Product from "../model/Product.js";
import User from "../model/User.js";
import Order from "../model/Order.js";
import Sale from "../model/Sale.js";

export const getAllProduct = expressAsyncHandler(async (req, res) => {
  const products = await Product.find();

  if (!products) {
    res.status(404);
    throw new Error("No Product found!");
  }

  res.status(200).json({
    success: true,
    products,
  });
});

export const getAllUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.find({ role: { $ne: "admin" } });

  res.status(200).json({
    success: true,
    users,
  });
});

export const getAllOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({ status: "paid" }).populate(
    "user",
    "username",
  );
  if (!orders) {
    res.status(404);
    throw new Error("No Order found");
  }

  res.status(200).json({
    success: true,
    orders,
  });
});

export const updateDelevery = expressAsyncHandler(async (req, res) => {
  const { delivered } = req.body;
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  order.delivered = delivered;
  order.deliveredAt = delivered ? Date.now() : null;

  await order.save();

  res.json(order);
});

export const deleteProduct = expressAsyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    throw new Error("Error deleting product!");
  }

  res.status(200).json({
    success: true,
    message: "Product deleted successfully!",
  });
});

export const updateProduct = expressAsyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res
    .status(200)
    .json({ success: true, message: "Product updated successfully" });
});

export const SaleOffCountDown = expressAsyncHandler(async (req, res) => {
  const sale = await Sale.findOne({
    isActive: true,
    // endsAt: { $gt: new Date() },
  });

  res.json(sale);
});

export const createSale = expressAsyncHandler(async (req, res) => {
  const { discountPercent, endsAt } = req.body;
  if (!discountPercent || !endsAt) {
    res.status(400);
    throw new Error("Discount percent and end date are required");
  }

  // Disable previous active sales
  await Sale.updateMany({ isActive: true }, { $set: { isActive: false } });

  const sale = await Sale.create({
    discountPercent,
    endsAt: new Date(endsAt),
    isActive: true,
  });

  res.status(201).json(sale);
});

export const getCustomersStats = async (req, res) => {

  const totalUsers = await User.countDocuments({ role: { $ne: "admin" } });
  
  // Aggregate monthly stats
  const stats = await User.aggregate([
    { $match: { role: { $ne: "admin" } } }, // exclude admins
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        total: { $sum: 1 },
        
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);

  res.json({
    stats,
    totalUsers
  });
};
