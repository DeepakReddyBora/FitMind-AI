import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/ai", aiRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/chat", chatRoutes);

app.use("/api/progress", progressRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {

  res.send("FitMind API Running");

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});