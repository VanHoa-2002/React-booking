import express from "express";

import { sendMail, sendMailToPatient } from "../controllers/mailController.js";
const router = express.Router();

router.post("/mail", sendMail);
router.post("/mail-response", sendMailToPatient);

export default router;
