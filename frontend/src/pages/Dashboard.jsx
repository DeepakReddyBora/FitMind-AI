import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { generateWorkout } from "../services/aiService";

import {
  addProgress,
  getProgress,
} from "../services/progressService";

import FitnessChart from "../components/FitnessChart";

const Dashboard = () => {

  const navigate = useNavigate();

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const [progress, setProgress] = useState([]);

  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    goal: "",
    level: "",
  });

  const [progressData, setProgressData] = useState({
    weight: "",
    calories: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);

  const [aiResponse, setAiResponse] = useState("");

  useEffect(() => {

    const fetchProgress = async () => {

      try {

        const data = await getProgress(
          userInfo.token
        );

        setProgress(data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchProgress();

  }, [userInfo.token]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleProgressChange = (e) => {

    setProgressData({
      ...progressData,
      [e.target.name]: e.target.value,
    });

  };

  const submitProgress = async () => {

    try {

      await addProgress(
        progressData,
        userInfo.token
      );

      const updatedProgress = await getProgress(
        userInfo.token
      );

      setProgress(updatedProgress);

      setProgressData({
        weight: "",
        calories: "",
        date: "",
      });

    } catch (error) {

      console.log(error);

    }

  };

  const generatePlan = async () => {

    try {

      setLoading(true);

      const data = await generateWorkout(
        formData
      );

      setAiResponse(data.response);

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);

    }

  };

  const logoutHandler = () => {

    localStorage.removeItem("userInfo");

    navigate("/login");

  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">

        <h1 className="text-3xl md:text-4xl font-bold text-center md:text-left">
          Welcome {userInfo?.name}
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">

          <button
            onClick={() => navigate("/chat")}
            className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition w-full"
          >
            AI Trainer Chat
          </button>

          <button
            onClick={logoutHandler}
            className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition w-full"
          >
            Logout
          </button>

        </div>

      </div>

      {/* AI PLAN GENERATOR */}

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg max-w-3xl mx-auto">

        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
          Generate AI Fitness Plan
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            name="height"
            placeholder="Height (cm)"
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="goal"
            placeholder="Goal"
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <select
            name="level"
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >

            <option value="">
              Select Level
            </option>

            <option value="beginner">
              Beginner
            </option>

            <option value="intermediate">
              Intermediate
            </option>

            <option value="advanced">
              Advanced
            </option>

          </select>

        </div>

        <button
          onClick={generatePlan}
          className="bg-black text-white px-6 py-3 rounded-lg mt-6 w-full hover:bg-gray-800 transition"
        >

          {loading
            ? "Generating..."
            : "Generate Plan"}

        </button>

      </div>

      {/* PROGRESS TRACKER */}

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg max-w-3xl mx-auto mt-10">

        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
          Track Daily Progress
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <input
            type="number"
            name="weight"
            placeholder="Weight"
            value={progressData.weight}
            onChange={handleProgressChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            name="calories"
            placeholder="Calories"
            value={progressData.calories}
            onChange={handleProgressChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="date"
            placeholder="Mon"
            value={progressData.date}
            onChange={handleProgressChange}
            className="border p-3 rounded-lg"
          />

        </div>

        <button
          onClick={submitProgress}
          className="bg-black text-white px-6 py-3 rounded-lg mt-6 w-full hover:bg-gray-800 transition"
        >
          Save Progress
        </button>

      </div>

      {/* ANALYTICS CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-10">

        <div className="bg-white p-6 rounded-2xl shadow-lg">

          <h2 className="text-xl font-bold mb-2">
            Current Weight
          </h2>

          <p className="text-3xl md:text-4xl font-bold">
            {progress.length > 0
              ? `${progress[progress.length - 1].weight} kg`
              : "0 kg"}
          </p>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">

          <h2 className="text-xl font-bold mb-2">
            Calories Burned
          </h2>

          <p className="text-3xl md:text-4xl font-bold">
            {progress.length > 0
              ? progress[progress.length - 1].calories
              : 0}
          </p>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">

          <h2 className="text-xl font-bold mb-2">
            Workout Streak
          </h2>

          <p className="text-3xl md:text-4xl font-bold">
            {progress.length} Days
          </p>

        </div>

      </div>

      {/* CHART */}

      <div className="max-w-6xl mx-auto mt-10 overflow-x-auto">

        <FitnessChart progress={progress} />

      </div>

      {/* PROGRESS HISTORY */}

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg max-w-6xl mx-auto mt-10">

        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Progress History
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full border-collapse min-w-125">

            <thead>

              <tr className="bg-gray-100">

                <th className="p-4 text-left">
                  Date
                </th>

                <th className="p-4 text-left">
                  Weight
                </th>

                <th className="p-4 text-left">
                  Calories
                </th>

              </tr>

            </thead>

            <tbody>

              {progress.map((item, index) => (

                <tr
                  key={index}
                  className="border-b"
                >

                  <td className="p-4">
                    {item.date}
                  </td>

                  <td className="p-4">
                    {item.weight} kg
                  </td>

                  <td className="p-4">
                    {item.calories}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* AI RESPONSE */}

      {aiResponse && (

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg max-w-4xl mx-auto mt-10 whitespace-pre-wrap">

          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Your AI Fitness Plan
          </h2>

          <p>{aiResponse}</p>

        </div>

      )}

    </div>
  );
};

export default Dashboard;