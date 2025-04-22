import * as dotenv from "dotenv";
import express, { Request, Response } from "express";

const connectDB = require("./config/connectDB");

dotenv.config();

connectDB();
const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log("Server running at port:", port);
});

export default app;
