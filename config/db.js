import { config } from 'dotenv';
import mongoose from 'mongoose';

// load environment variables
config();
const uri = process.env.MONGO_URI;

// establish connection to MongoDB database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;