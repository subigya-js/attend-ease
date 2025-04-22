import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL as string);
        console.log("Database connected.");
    } catch (error) {
        console.log("Database connection error:", error);
        process.exit(1);
    }
}

export default connectDB;
