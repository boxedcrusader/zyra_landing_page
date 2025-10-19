import React, {useState} from "react";
import logo from "../assets/logo.png"
import { Link, useNavigate } from "react-router-dom"
import { apiClient } from "../../api/client";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await apiClient.post("/auth/signin", {
                email,
                password,
            });

            if (response.access_token) {
                localStorage.setItem("token", response.access_token);
            }

            navigate("/dashboard");
        } catch (err) {
            console.error("Login error:", err);
            setError(err.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section className="flex min-h-screen items-center justify-center px-4 bg-[#e2a9f1]">
                <div className="rounded-lg mr-8 pb-25">
                    <img src={logo} className="h-64 w-72"/>
                    <h1 className="text-5xl font-bold">Welcome back to zyra!</h1>
                    <p className="">Continue sharing or rating other facts</p>
                </div>

                <div className="rounded-lg bg-[#fff] p-8 ">
                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                {error}
                            </div>
                        )}
                        <div className="mb-2">
                            <label className="block text-gray-800 font-medium mb-2">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                                required
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-800 font-medium mb-2">Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                                required
                                disabled={loading}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition mt-6"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                    <div className="text-center mt-4">
                        <p className="text-gray-700">
                            Don't have an account?{" "}
                            <Link to="/sign-up" className="text-black font-semibold hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login
