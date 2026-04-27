import { Router } from "express";
import { fileUpload, getUserProfile, updateUser } from "../controllers/user.controller.js";
import { upload } from './file.router.js'

const router = Router();

router.get("/:id/profile", getUserProfile);
router.patch('/:id/update', updateUser);

router.post("/upload", upload.single("image"), fileUpload);

export default router;
