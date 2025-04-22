import * as dotenv from "dotenv";
import express, { Request, Response } from "express";

dotenv.config();

const app = express();
const port = 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log("Server running at port:", port);
});

export default app;
