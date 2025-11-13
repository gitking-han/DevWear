import mongoose from "mongoose";

let isConnected = false; // global state

const connectToMongo = async () => {
  if (isConnected) {
    console.log("✅ Already connected to MongoDB");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB Connected:", db.connection.host);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw new Error("MongoDB connection failed");
  }
};

export default connectToMongo;
