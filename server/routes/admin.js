import express from "express";
import {
  addLectures,
  createCourse,
  deleteCourse,
  updateCourse,
} from "../controllers/adminController.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import uploadFiles from "../middlewares/multer.js";

const router = express.Router();

router.post("/create", isAuthenticated, isAdmin, uploadFiles, createCourse);

router.put("/update/:id", isAuthenticated, isAdmin, uploadFiles, updateCourse);

router.delete("/delete/:id", isAuthenticated, isAdmin, deleteCourse);

router.post("/course/:id", isAuthenticated, isAdmin, uploadFiles, addLectures);

export default router;
