// import path from "path";
// import multer from "multer";
// import { Router } from "express";
// const router = Router();

 // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, "uploads/");
// //   },

// //   filename: (req, file, cb) => {
// //     cb(
// //       null,
// //       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
// //     );
// //   },
// // });

// const fileFilter = (req, file, cb) => {
//   const fileTypes = /jpg|jpeg|png/;

//   const extname = fileTypes.test(
//     path.extname(file.originalname).toLocaleLowerCase()
//   );
//   const mimetype = fileTypes.test(file.mimetype);
//   if (extname && mimetype) {
//     return cb(null, true);
//   } else {
//     cb("Images only!");
//   }
// };

// export const upload = multer({
//   storage,
//   fileFilter,
// });

// router.post("/", upload.single("image"), async (req, res) => {
//   res.send({
//     message: "Image Uploaded",
//     image: `/${req.file?.path}`,
//   });
// });

// export default router;



import multer from "multer";
import { Router } from "express";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const router = Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ecommerce-products",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

// optional: keep your validation logic
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpg|jpeg|png|webp/;

  const extname = fileTypes.test(file.originalname.toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Images only!"));
  }
};

export const upload = multer({
  storage,
  fileFilter,
});

router.post("/", upload.single("image"), async (req, res) => {
  console.log(req.file.path);
  res.send({
    message: "Image Uploaded",
    image: req.file.path, // ✅ Cloudinary URL
  });
});

export default router;
