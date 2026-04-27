import express from "express";
import { protect } from "../middleware/protect.js";
import {
  createProduct,
  deleteProduct,
  getImagesForSlider,
  getProduct,
  getProducts,
  getTopProducts,
  updateProduct,
} from "../controllers/product.controller.js";
const router = express.Router();

router.route("/").post(createProduct).get(getProducts);
router.get('/top', getTopProducts)
router.get('/images', getImagesForSlider);
router.route("/:id").get(getProduct).delete(deleteProduct).put(updateProduct);

// Review Router


export default router;
