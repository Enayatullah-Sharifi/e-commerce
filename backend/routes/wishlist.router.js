import { Router } from "express";
import {
  AddItemToWishList,
  DeleteItemFromWishList,
  getWishlist,
} from "../controllers/wishlist.controller.js";
import { protect } from "../middleware/protect.js";

const router = Router();

router.route("/").post(protect, AddItemToWishList).get(protect, getWishlist);
router.route('/:id').delete(DeleteItemFromWishList)

export default router;
