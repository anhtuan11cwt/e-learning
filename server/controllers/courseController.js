import { tryCatch } from "../middlewares/tryCatch.js";
import Course from "../models/course.js";
import Lecture from "../models/lecture.js";
import User from "../models/user.js";

export const getAllCourses = tryCatch(async (_req, res) => {
  const courses = await Course.find();
  res.json({ courses });
});

export const getSingleCourse = tryCatch(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return res.status(404).json({ message: "Không tìm thấy khóa học" });
  }
  res.json({ course });
});

export const fetchLectures = tryCatch(async (req, res) => {
  const lectures = await Lecture.find({ course: req.params.id });
  const user = await User.findById(req.user._id);

  if (user.role === "admin") {
    return res.json({ lectures });
  }

  if (!user.subscription || !user.subscription.includes(req.params.id)) {
    return res.status(400).json({ message: "Bạn chưa đăng ký khóa học này" });
  }

  res.json({ lectures });
});
