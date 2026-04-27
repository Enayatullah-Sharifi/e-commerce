import mongoose from "mongoose";

async function connectDB() {
  try {

    const conn = await mongoose.connect(process.env.MONGO_ONLINE_URI);
    console.log(
      `Connected to mongodb on port ${conn.connection.host}`.yellow.underline,
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

export default connectDB;
