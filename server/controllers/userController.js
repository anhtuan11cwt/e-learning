import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import sendMail from "../middlewares/sendMail.js";
import { tryCatch } from "../middlewares/tryCatch.js";
import Course from "../models/course.js";
import Payment from "../models/payment.js";
import User from "../models/user.js";
import { stripe } from "../services/stripe.js";

export const register = tryCatch(async (req, res) => {
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
});

export const verifyUser = tryCatch(async (req, res) => {
  const { otp, activationToken } = req.body;

  const verify = jwt.verify(activationToken, process.env.ACTIVATION_SECRET);

  if (!verify) {
    return res.status(400).json({ message: "OTP đã hết hạn" });
  }

  if (verify.otp !== otp) {
    return res.status(400).json({ message: "OTP không đúng" });
  }

  await User.create({
    email: verify.email,
    name: verify.name,
    password: verify.password,
  });

  res.status(200).json({ message: "Đăng ký thành công" });
});

export const loginUser = tryCatch(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ message: "Không tìm thấy người dùng với email này" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Mật khẩu không đúng" });
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.status(200).json({
    message: `Chào mừng quay trở lại, ${user.name}`,
    token,
    user,
  });
});

export const myProfile = tryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({ user });
});

export const getMyCourses = tryCatch(async (req, res) => {
  const courses = await Course.find({ _id: req.user.subscription });

  res.status(200).json({ courses });
});

export const checkout = tryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);
  const course = await Course.findById(req.params.id);

  if (!course) {
    return res.status(404).json({ message: "Không tìm thấy khóa học" });
  }

  if (user.subscription.includes(course._id)) {
    return res.status(400).json({ message: "Bạn đã có khóa học này rồi" });
  }

  const session = await stripe.checkout.sessions.create({
    cancel_url: `${process.env.CLIENT_URL}/course/${course._id}`,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: course.name,
          },
          unit_amount: course.price * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    payment_method_types: ["card"],
    success_url: `${process.env.CLIENT_URL}/course/${course._id}`,
  });

  res.status(201).json({ course, session });
});

export const paymentVerification = tryCatch(async (req, res) => {
  const { session_id } = req.body;

  const session = await stripe.checkout.sessions.retrieve(session_id);

  if (session.payment_status !== "paid") {
    return res.status(400).json({ message: "Thanh toán chưa hoàn tất" });
  }

  await Payment.create({
    stripe_payment_intent: session.payment_intent,
    stripe_session_id: session.id,
  });

  const user = await User.findById(req.user._id);
  user.subscription.push(req.params.id);
  await user.save();

  res.status(200).json({ message: "Mua khóa học thành công" });
});
