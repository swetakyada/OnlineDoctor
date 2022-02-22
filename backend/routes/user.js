import express from "express";
import { loginUser, createUser } from "../controllers/user.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);

export default router;
