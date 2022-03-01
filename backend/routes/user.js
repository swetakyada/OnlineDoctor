import express from "express";
import { getDoctors } from "../controllers/getDoctors.js";
import { loginUser, createUser } from "../controllers/user.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/doctors", getDoctors);

export default router;
