import express from "express";

import { authenticate, restrict } from "../auth/verifyToken.js";
import { sendMail } from "../controllers/mailController.js";
const router = express.Router();

router.post("/mail", authenticate, restrict(["patient"]), sendMail);

export default router;
