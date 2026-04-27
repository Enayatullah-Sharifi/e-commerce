import expressAsyncHandler from "express-async-handler";
import User from "../model/User.js";
import jwt from "jsonwebtoken";

export const protect = expressAsyncHandler(async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    res.status(401);
    throw new Error("Unauthorized!, Please login");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    res.status(401);
    throw new Error("Invalid or expired token");
  }
  let user = await User.findOne({ _id: decoded.id }).select(
    "_id username role img",
  );
  if (!user) {
    res.status(401);
    throw new Error("Not authorized!");
  }
  req.user = {
    username: user.username,
    id: user._id,
    img: user.img,
  };

  next();
});

export const admin = expressAsyncHandler(async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    res.status(401);
    throw new Error("Unauthorized!, Please login");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    res.status(401);
    throw new Error("Invalid or expired token");
  }
  let user = await User.findOne({ _id: decoded.id });
  if (!user && user.role !== "admin") {
    res.status(401);
    throw new Error("Not authorized!");
  }

  next();
});
