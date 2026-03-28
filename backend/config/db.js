const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(process.env.MONGO_URL, {});
    isConnected = db.connections[0].readyState === 1;
    console.log('MongoDB connected')
  } catch (err) {
    console.error("Error connecting to MongoDB", err)
    throw err;
  }
}

module.exports = connectDB 