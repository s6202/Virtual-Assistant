import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const mongoUri = process.env.MONGO_URL || process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/virtualassistant";
    if (!process.env.MONGO_URL && !process.env.MONGODB_URL) {
      console.warn("MONGO_URL/MONGODB_URL not set. Using default local MongoDB URI.");
    }
    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDb;
