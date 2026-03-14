import express from "express";
import {
  getAllCourses,
  getSingleCourse,
} from "../controllers/courseController.js";

const router = express.Router();

router.get("/all", getAllCourses);
router.get("/:id", getSingleCourse);

export default router;
