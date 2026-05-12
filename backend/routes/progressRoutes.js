import express from "express";

import {
  addProgress,
  getProgress,
} from "../controllers/progressController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addProgress);

router.get("/", protect, getProgress);

export default router;