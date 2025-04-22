const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected.");
    }

    catch (error) {
        console.log("Database connection error:", error);
        process.exit(1);
    }
}

module.exports = connectDB;
