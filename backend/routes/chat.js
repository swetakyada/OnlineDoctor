import express from "express";
import {
  addMessage,
  createChat,
  getChat,
  getDoctorChats,
  getMessages,
  getUserChats,
} from "../controllers/chat.js";

const router = express.Router();

router.post("/create", createChat);
router.post("/get", getChat);
router.post("/uget", getUserChats);
router.post("/dget", getDoctorChats);
router.post("/add_message", addMessage);
router.post("/get_messages", getMessages);

export default router;
