import fs from "node:fs";
import { promisify } from "node:util";
import { tryCatch } from "../middlewares/tryCatch.js";
import Course from "../models/course.js";
import Lecture from "../models/lecture.js";
import User from "../models/user.js";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../services/cloudStorage.js";

const unlinkAsync = promisify(fs.unlink);

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

  const lectures = await Lecture.find({ course: course._id });

  await Promise.all(
    lectures.map(async (lecture) => {
      if (lecture.video) {
        const videoPath = `./uploads/${lecture.video}`;
        try {
          if (fs.existsSync(videoPath)) {
            await unlinkAsync(videoPath);
            console.log("Đã xóa video");
          }
        } catch (err) {
          console.error("Lỗi khi xóa video:", err);
        }
      }
    }),
  );

  if (course.image) {
    const imagePath = `./uploads/${course.image}`;
    try {
      if (fs.existsSync(imagePath)) {
        await unlinkAsync(imagePath);
        console.log("Đã xóa hình ảnh");
      }
    } catch (err) {
      console.error("Lỗi khi xóa hình ảnh:", err);
    }
  }

  await Lecture.find({ course: req.params.id }).deleteMany();

  await course.deleteOne();

  await User.updateMany({}, { $pull: { subscription: req.params.id } });

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

export const addLectures = tryCatch(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return res
      .status(404)
      .json({ message: "Không tìm thấy khóa học với ID này" });
  }

  const { title, description } = req.body;
  let video = "";

  if (req.file) {
    video = await uploadToCloudinary(req.file.buffer, "lectures");
  }

  const lecture = await Lecture.create({
    course: course._id,
    description,
    title,
    video,
  });

  res.status(201).json({ lecture, message: "Đã thêm bài giảng thành công" });
});

export const deleteLecture = tryCatch(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);

  if (!lecture) {
    return res.status(404).json({ message: "Không tìm thấy bài giảng" });
  }

  if (lecture.video) {
    const videoPath = `./uploads/${lecture.video}`;
    if (fs.existsSync(videoPath)) {
      fs.rm(videoPath, (err) => {
        if (err) {
          console.error("Lỗi khi xóa tệp video:", err);
        } else {
          console.log("Đã xóa video");
        }
      });
    }
  }

  await lecture.deleteOne();

  res.json({ message: "Xóa bài giảng thành công" });
});
