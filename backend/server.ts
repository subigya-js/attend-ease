import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import connectDB from "./config/connectDB";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();

app.use(async (req: Request, res: Response, next) => {
  await connectDB();
  next();
});

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(errorHandler);

export default app;
