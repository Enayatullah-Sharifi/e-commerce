import express from "express";
import Order from "../model/Order.js";

const router = express.Router();

// GET /api/orders/:orderId/status
router.get("/:orderId/status", async (req, res) => {
  const order = await Order.findById(req.params.orderId);

  if (!order) {
    return res.status(404).json({ paid: false });
  }

  res.json({
    paid: order.status === "paid",
    status: order.status,
  });
});

export default router;
