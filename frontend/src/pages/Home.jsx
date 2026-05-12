import { Link } from "react-router-dom";

const Home = () => {

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HERO */}

      <div className="flex flex-col items-center justify-center text-center px-6 pt-32 pb-20">

        <h1 className="text-6xl font-extrabold mb-6 leading-tight">
          FitMind AI
        </h1>

        <p className="text-2xl text-gray-600 max-w-2xl mb-10">
          Your AI-powered fitness coach with
          realtime trainer chat, workout plans,
          analytics, and progress tracking.
        </p>

        <div className="flex gap-6">

          <Link
            to="/register"
            className="bg-black text-white px-8 py-4 rounded-2xl text-lg hover:bg-gray-800 transition"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="bg-white border border-black px-8 py-4 rounded-2xl text-lg hover:bg-gray-200 transition"
          >
            Login
          </Link>

        </div>

      </div>

      {/* FEATURES */}

      <div className="max-w-6xl mx-auto grid grid-cols-3 gap-8 px-8 pb-20">

        <div className="bg-white p-8 rounded-3xl shadow-lg">

          <h2 className="text-2xl font-bold mb-4">
            AI Workout Plans
          </h2>

          <p className="text-gray-600">
            Generate personalized fitness and
            diet plans using AI.
          </p>

        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg">

          <h2 className="text-2xl font-bold mb-4">
            Realtime AI Trainer
          </h2>

          <p className="text-gray-600">
            Chat instantly with your AI trainer
            using realtime messaging.
          </p>

        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg">

          <h2 className="text-2xl font-bold mb-4">
            Analytics Dashboard
          </h2>

          <p className="text-gray-600">
            Track calories, workouts, weight,
            and progress dynamically.
          </p>

        </div>

      </div>

    </div>
  );
};

export default Home;