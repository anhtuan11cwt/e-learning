import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import sendMail from "../middlewares/sendMail.js";
import User from "../models/user.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Người dùng đã tồn tại" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000);

    const activationToken = jwt.sign(
      { email, name, otp, password: hashPassword },
      process.env.ACTIVATION_SECRET,
      { expiresIn: "5m" },
    );

    await sendMail(email, "Xác minh tài khoản E-Learning", { name, otp });

    res.status(200).json({
      activationToken,
      message: "Mã OTP đã được gửi đến email của bạn",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
