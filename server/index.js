import dotenv from "dotenv";
import express from "express";
import connectDb from "./database/db.js";
import adminRoutes from "./routes/admin.js";
import courseRoutes from "./routes/course.js";
import userRoutes from "./routes/user.js";

dotenv.config();

const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;

app.use("/api", userRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (_req, res) => {
  res.send("Server đang hoạt động");
});

connectDb();

app.listen(port, () => {
  console.log(`Server đang chạy trên cổng ${port}`);
});
