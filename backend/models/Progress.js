import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    weight: {
      type: Number,
      required: true,
    },

    calories: {
      type: Number,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Progress = mongoose.model(
  "Progress",
  progressSchema
);

export default Progress;