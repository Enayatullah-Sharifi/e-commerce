import express from "express";
import { protect } from "../middleware/protect.js";
import { getOrders, placeOrder } from "../controllers/orders.controller.js";
const router = express.Router();

router.route("/").post(protect, placeOrder).get(protect, getOrders);

export default router;
