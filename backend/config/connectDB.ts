import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

let cachedConnection: typeof mongoose | null = null;

const connectDB = async (): Promise<typeof mongoose> => {
    if (cachedConnection) {
        return cachedConnection;
    }

    try {
        const connection = await mongoose.connect(process.env.MONGO_URL as string);
        console.log("Database connected from connectDB.ts");
        cachedConnection = connection;
        return connection;
    } catch (error) {
        console.error("Database connection error:", error);
        throw error;
    }
}

export default connectDB;
