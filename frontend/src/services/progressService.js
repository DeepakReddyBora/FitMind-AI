import axios from "axios";

const API = "http://localhost:5000/api/progress";

export const addProgress = async (
  progressData,
  token
) => {

  const response = await axios.post(
    API,
    progressData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getProgress = async (token) => {

  const response = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};