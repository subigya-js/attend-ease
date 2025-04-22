import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import { errorHandler } from "./middleware/errorHandler";
import connectDB from "./config/connectDB";

dotenv.config();

connectDB();
const app = express();
app.use(express.json());

const port = process.env.PORT || 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log("Server running at port:", port);
});

export default app;
