import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(ENV.DB_URL);
        console.log('====================================');
        console.log(`✅ Connected to MongoDB: ${conn.connection.host}`);
        console.log('====================================');
    } catch (error) {
        console.log('====================================');
        console.log("⛔ MongoDB connection failed");
        console.log('====================================');
        process.exit(1) // 1 means failure while 0 means success
    }
}




