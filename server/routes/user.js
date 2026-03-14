import express from "express";
import { register, verifyUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/user/register", register);
router.post("/user/verify", verifyUser);

export default router;
