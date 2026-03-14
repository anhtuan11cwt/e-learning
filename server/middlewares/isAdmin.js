import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/user.js";

export const isAdmin = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(400).json({ message: "Vui lòng đăng nhập" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decode._id);

    if (!user) {
      return res.status(400).json({ message: "Không tìm thấy người dùng" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Bạn không phải là admin" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
