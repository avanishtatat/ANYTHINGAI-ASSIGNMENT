const mongoose = require("mongoose");

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;

  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL environment variable is not defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URL, {});
    console.log('MongoDB connected')
  } catch (err) {
    console.error("Error connecting to MongoDB", err)
    throw err;
  }
}

module.exports = connectDB 