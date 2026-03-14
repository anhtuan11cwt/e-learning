import express from "express";
import {
  loginUser,
  myProfile,
  register,
  verifyUser,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/user/register", register);
router.post("/user/verify", verifyUser);
router.post("/user/login", loginUser);
router.get("/user/me", isAuthenticated, myProfile);

export default router;
