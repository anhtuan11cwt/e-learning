import dotenv from "dotenv";
import express from "express";
import connectDb from "./database/db.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.get("/", (_req, res) => {
  res.send("Server đang hoạt động");
});

connectDb();

app.listen(port, () => {
  console.log(`Server đang chạy trên cổng ${port}`);
});
