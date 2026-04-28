import path from "path";
import express from "express";
import colors from "colors";
import connectDB from "./db/database.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

// ROUTES
import authRouter from "./routes/auth.router.js";
import productRouter from "./routes/product.router.js";
import fileUpload from "./routes/file.router.js";
import wishListRouter from "./routes/wishlist.router.js";
import reviewRouter from "./routes/review.router.js";
import userRouter from "./routes/user.router.js";
import orderRouter from "./routes/orders.router.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import webhookRouter from "./routes/webhook.router.js";
import verifyPaymentRouter from "./routes/verifyPayment.router.js";
import adminRouter from "./routes/admin.router.js";

import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }, // ✅ allow images
    crossOriginEmbedderPolicy: false, // 🔥 IMPORTANT
  }),
);
app.use(
  cors({
    origin: process.env.CLIENT_SIDE_URL,
    credentials: true,
  }),
);
// const __dirname = path.resolve();
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
connectDB();

app.use(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  webhookRouter,
);

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/upload", fileUpload);
app.use("/api/wishlist", wishListRouter);
app.use("/api/product/reviews", reviewRouter);
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);
app.use("/api/orders", verifyPaymentRouter);
app.use("/api/admin", adminRouter);

app.use(notFound);
app.use(errorHandler);

export const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running on ${process.env.NODE_ENV} mode on port ${PORT}`.cyan
      .underline,
  ),
);
