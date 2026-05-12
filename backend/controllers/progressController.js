import Progress from "../models/Progress.js";

export const addProgress = async (req, res) => {

  try {

    const { weight, calories, date } = req.body;

    const progress = await Progress.create({
      userId: req.user._id,
      weight,
      calories,
      date,
    });

    res.status(201).json(progress);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

export const getProgress = async (req, res) => {

  try {

    const progress = await Progress.find({
      userId: req.user._id,
    }).sort({
      createdAt: 1,
    });

    res.json(progress);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};