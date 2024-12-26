import express from "express";
import {
  login,
  register,
  getOtp,
  resetPassword,
} from "../controllers/authController.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/get-otp", getOtp);
router.post("/reset-password", resetPassword);

export default router;
