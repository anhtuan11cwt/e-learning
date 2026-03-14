import { tryCatch } from "../middlewares/tryCatch.js";
import Course from "../models/course.js";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../services/cloudStorage.js";

export const createCourse = tryCatch(async (req, res) => {
  const { title, description, category, createdBy, duration, price } = req.body;

  let image = "";
  if (req.file) {
    image = await uploadToCloudinary(req.file.buffer, "courses");
  }

  await Course.create({
    category,
    createdBy,
    description,
    duration,
    image,
    price,
    title,
  });

  res.status(201).json({ message: "Tạo khóa học thành công" });
});

export const deleteCourse = tryCatch(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return res.status(404).json({ message: "Không tìm thấy khóa học" });
  }

  if (course.image) {
    await deleteFromCloudinary(course.image);
  }

  await course.deleteOne();

  res.json({ message: "Xóa khóa học thành công" });
});

export const updateCourse = tryCatch(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return res.status(404).json({ message: "Không tìm thấy khóa học" });
  }

  const { title, description, category, createdBy, duration, price } = req.body;

  if (title) course.title = title;
  if (description) course.description = description;
  if (category) course.category = category;
  if (createdBy) course.createdBy = createdBy;
  if (duration) course.duration = duration;
  if (price) course.price = price;

  if (req.file) {
    if (course.image) {
      await deleteFromCloudinary(course.image);
    }
    course.image = await uploadToCloudinary(req.file.buffer, "courses");
  }

  await course.save();

  res.json({ course, message: "Cập nhật khóa học thành công" });
});

export const addLectures = tryCatch(async (_req, res) => {
  res.send("Thêm bài học");
});
