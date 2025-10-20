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
      <section className="flex min-h-screen items-center justify-center px-4 bg-[#e2a9f1]">
        <div className="rounded-lg mr-8 pb-25">
          <img src={logo} className="h-64 w-72" />
          <h1 className="text-5xl font-bold">Welcome to zyra!</h1>
          <p className="">Create your account to share or rate facts</p>
        </div>

        <div className="rounded-lg bg-[#fff] p-8">
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}
            <div className="mb-2">
              <label className="block text-gray-800 font-medium mb-2">
                First-Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your First Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                required
                disabled={loading}
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-800 font-medium mb-2">
                Last-Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your Last Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                required
                disabled={loading}
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-800 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                disabled={loading}
                required
              />
            </div>
            <div>
              <label className="block text-gray-800 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                disabled={loading}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition mt-6 disabled:bg-gray-400"
              disabled={loading}
            >
              {loading ? "Creating your account..." : "Create Account"}
            </button>
          </form>
          <div className="text-center mt-4">
            <p className="text-gray-700">
              Already a zyrite?{" "}
              <Link
                to="/log-in"
                className="text-black font-semibold hover:underline"
              >
                Log-in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Signup;
