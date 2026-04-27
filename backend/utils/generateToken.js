import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

export default expressAsyncHandler(async function generateToken(user, res) {
  const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  if (!token) {
    res.status(500);
    throw new Error("Error while generating token");
  }
  return token;
});
