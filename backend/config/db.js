const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  if(!process.env.MONGO_URL) {
    throw new Error("MONGO_URL environment variable is not defined");
  }

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