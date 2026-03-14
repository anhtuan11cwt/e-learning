import { tryCatch } from "../middlewares/tryCatch.js";
import Course from "../models/course.js";

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
