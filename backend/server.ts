import cors from "cors";
import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import connectDB from "./config/connectDB";
import { errorHandler } from "./middleware/errorHandler";

import validateToken from "./middleware/validateTokenHandler";
import organizationRoute from "./routes/organizationRoute";
import userRoute from "./routes/userRoute";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

// Routing for user authentication
app.use("/api/user", userRoute);

// Routing for organization management
app.use("/api/organization", validateToken, organizationRoute);

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
