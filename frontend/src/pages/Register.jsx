import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { registerUser } from "../services/authService";

const Register = () => {

  const navigate = useNavigate();

  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    // validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {

      alert("Please fill all fields");

      return;

    }

    if (formData.password.length < 6) {

      alert(
        "Password must be at least 6 characters"
      );

      return;

    }

    try {

      await registerUser(formData);

      setSuccess(
        "Registration Successful! Redirecting..."
      );

      setTimeout(() => {

        navigate("/login");

      }, 1500);

    } catch (error) {

      alert(error.response.data.message);

    }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-100"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Register
        </h1>

        {success && (

          <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-center">

            {success}

          </div>

        )}

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg mb-4"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          minLength={6}
          className="w-full p-3 border rounded-lg mb-4"
        />

        <button className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition">

          Register

        </button>

        <p className="mt-4 text-center">

          Already have an account?

          <Link
            to="/login"
            className="text-blue-500 ml-2"
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  );
};

export default Register;