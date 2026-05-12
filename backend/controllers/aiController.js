import axios from "axios";

export const generateWorkout = async (req, res) => {
  try {
    const { weight, height, goal, level } = req.body;

    const prompt = `
      Create a professional fitness plan.

      Weight: ${weight}kg
      Height: ${height}cm
      Goal: ${goal}
      Fitness Level: ${level}

      Include:
      - 7 day workout plan
      - Diet suggestions
      - Fitness tips
    `;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
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

    res.status(200).json({
      response:
        response.data.choices[0].message.content,
    });

  } catch (error) {
    console.log(error.response?.data || error.message);

    res.status(500).json({
      message: "AI generation failed",
    });
  }
};