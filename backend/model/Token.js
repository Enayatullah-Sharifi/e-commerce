import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Token = mongoose.model("Token", TokenSchema);
export default Token;
