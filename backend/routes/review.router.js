import { Router } from "express";
import { addReview, getReviews } from "../controllers/review.controller.js";
import {protect} from '../middleware/protect.js'

const router = Router()

router.post('/:productId',protect, addReview)
router.get('/:productId', getReviews);

export default router