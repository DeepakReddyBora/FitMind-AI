import express from "express";

import {
  getChats,
  sendMessage,
} from "../controllers/chatController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getChats);

router.post("/", protect, sendMessage);

export default router;