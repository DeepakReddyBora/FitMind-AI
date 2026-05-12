import axios from "axios";

const API = "https://fit-mind-ai-backend.vercel.app/api/ai";

export const generateWorkout = async (data) => {
  const response = await axios.post(
    `${API}/generate-workout`,
    data
  );

  return response.data;
};