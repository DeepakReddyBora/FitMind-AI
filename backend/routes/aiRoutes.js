import express from "express";

import { generateWorkout } from "../controllers/aiController.js";

const router = express.Router();

router.post("/generate-workout", generateWorkout);

export default router;