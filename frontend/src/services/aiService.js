import axios from "axios";

const API = "http://localhost:5000/api/ai";

export const generateWorkout = async (data) => {
  const response = await axios.post(
    `${API}/generate-workout`,
    data
  );

  return response.data;
};