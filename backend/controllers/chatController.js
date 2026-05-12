import Chat from "../models/Chat.js";
import axios from "axios";

export const getChats = async (req, res) => {

  try {

    const chats = await Chat.find({
      userId: req.user._id,
    }).sort({
      createdAt: 1,
    });

    res.json(chats);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

export const sendMessage = async (req, res) => {

  try {

    const { text } = req.body;

    const userMessage = await Chat.create({
      userId: req.user._id,
      sender: "user",
      text,
    });

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a professional fitness trainer.",
          },
          {
            role: "user",
            content: text,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiText =
      response.data.choices[0].message.content;

    const aiMessage = await Chat.create({
      userId: req.user._id,
      sender: "ai",
      text: aiText,
    });

    res.json({
      userMessage,
      aiMessage,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

};