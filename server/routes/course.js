import express from "express";
import {
  fetchLectures,
  getAllCourses,
  getSingleCourse,
} from "../controllers/courseController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.get("/all", getAllCourses);
router.get("/:id", getSingleCourse);
router.get("/:id/lectures", isAuthenticated, fetchLectures);

export default router;
