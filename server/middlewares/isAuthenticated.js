import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/user.js";

export const isAuthenticated = async (req, res, next) => {
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

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
