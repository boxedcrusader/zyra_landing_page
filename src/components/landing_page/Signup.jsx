import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { apiClient } from "../../api/client";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await apiClient.post("/auth/signup", {
        email,
        firstName,
        lastName,
        password,
      });

      if (response.access_token) {
        localStorage.setItem("token", response.access_token);
      }

      navigate("/dashboard");
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="flex min-h-screen flex-col lg:flex-row items-center justify-center px-4 py-8 lg:py-0 bg-[#e2a9f1] gap-8 lg:gap-16">
        {/* Logo and Welcome Section */}
        <div className="w-full lg:w-auto flex flex-col items-center lg:items-start text-center lg:text-left">
          <img
            src={logo}
            className="h-40 w-48 lg:h-64 lg:w-72 mb-6 lg:mb-8"
            alt="Zyra Logo"
          />
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-2 lg:mb-4">
            Welcome to zyra!
          </h1>
          <p className="text-sm lg:text-base text-gray-700">
            Create your account to share or rate facts
          </p>
        </div>

        {/* Form Section */}
        <div className="w-full sm:w-96 rounded-lg bg-white p-6 sm:p-8 shadow-lg">
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                {error}
              </div>
            )}

            <div className="mb-4">
              <label className="block text-gray-800 font-medium mb-2 text-sm">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition text-sm"
                required
                disabled={loading}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-800 font-medium mb-2 text-sm">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition text-sm"
                required
                disabled={loading}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-800 font-medium mb-2 text-sm">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition text-sm"
                disabled={loading}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-800 font-medium mb-2 text-sm">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition text-sm"
                disabled={loading}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-800 active:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              disabled={loading}
            >
              {loading ? "Creating your account..." : "Create Account"}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-700 text-sm">
              Already a zyrite?{" "}
              <Link
                to="/log-in"
                className="text-black font-semibold hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Signup;
