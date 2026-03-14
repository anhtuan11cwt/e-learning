import express from "express";
import {
  checkout,
  getMyCourses,
  loginUser,
  myProfile,
  paymentVerification,
  register,
  verifyUser,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/user/register", register);
router.post("/user/verify", verifyUser);
router.post("/user/login", loginUser);
router.get("/user/me", isAuthenticated, myProfile);
router.get("/user/mycourse", isAuthenticated, getMyCourses);
router.post("/user/checkout/:id", isAuthenticated, checkout);
router.post(
  "/user/paymentverification/:id",
  isAuthenticated,
  paymentVerification,
);

export default router;
