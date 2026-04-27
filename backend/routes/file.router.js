import path from "path";
import multer from "multer";
import { Router } from "express";
const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },


  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpg|jpeg|png/;

  const extname = fileTypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );
  const mimetype = fileTypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
};

export const upload = multer({
  storage,
  fileFilter,
});

router.post("/", upload.single("image"), async (req, res) => {
  res.send({
    message: "Image Uploaded",
    image: `/${req.file?.path}`,
  });
});

export default router;
