import expressAsyncHandler from "express-async-handler";
import User from "../model/User.js";

// @desc    Get user's profile
// @route   GET /api/user/:id/profile
// access   Private
export const getUserProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }
  
  res.status(200).json({
    username: user.username,
    img: user.img,
  });
});

// @desc    Upload user photo
// @route   POST    /api/user/upload
// @access  Private
export const fileUpload = expressAsyncHandler(async (req, res) => {
  console.log("backend called");
  res.send({
    message: "Image Uploaded",
    image: `/${req.file?.path}`,
  });
});

// @desc    Update user
// @route   POST    /api/user/update
// @access  Private
export const updateUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { username, img } = req.body;
  if (!username && !img) {
    res.status(400);
    throw new Error("Validation failed");
  }

  const user = await User.findByIdAndUpdate(
    id,
    {
      username,
      img,
    },
    { new: true }
  );

  if (!user) {
    res.status(500);
    throw new Error("Server Error...");
  }

  res.status(201).json({
    message: "User updated successfully",
    data: {
      username: user.username,
      img: user.img,
      id: user._id,
      email: user.email,
    },
  });
});
