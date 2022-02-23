import express from "express";
import { createDoctor, loginDoctor } from "../controllers/doctor.js";

const router = express.Router();

router.post("/register", createDoctor);
router.post("/login", loginDoctor);

export default router;
