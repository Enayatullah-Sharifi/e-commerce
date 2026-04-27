import { Router } from "express";
import { protect, admin } from "../middleware/protect.js";
import {
  createSale,
  deleteProduct,
  getAllOrders,
  getAllProduct,
  getAllUsers,
  getCustomersStats,
  SaleOffCountDown,
  updateDelevery,
  updateProduct,
} from "../controllers/admin.controller.js";

const router = Router();

router.get("/products", protect, admin, getAllProduct);
router.get("/users", protect, admin, getAllUsers);
router.put("/orders/:id/deliver", protect, admin, updateDelevery);
router.get("/orders", protect, admin, getAllOrders);
router.delete("/product/:id", protect, admin, deleteProduct);
router.put("/product/:id", protect, admin, updateProduct);
router.get("/active", SaleOffCountDown);
router.post("/sale", protect, admin, createSale);

router.get("/customers", protect, admin, getCustomersStats);

export default router;
