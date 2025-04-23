import cors from "cors";
import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import connectDB from "./config/connectDB";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

// Error Handler
app.use(errorHandler);

// Start server only after DB is connected
const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ Database connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to database", error);
    process.exit(1); // Stop server if DB connection fails
  }
};

startServer();

export default app;
