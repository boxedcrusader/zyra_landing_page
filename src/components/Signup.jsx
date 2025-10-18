import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"

function Signup() {
    return (
        <>
            <nav className="top-0 bg-[#e2a9f1]">
                <Link to="/" className="no-underline">
                    <img src={logo} alt="Logo" className="w-20 h-20 hover:opacity-80 transition"/>
                </Link>
            </nav>
            <section className="flex min-h-screen items-center justify-center px-4 bg-[#e2a9f1]">
                <div className="rounded-lg mr-8">
                    <img src={logo} className="h-64 w-72"/>
                    <h1 className="text-5xl font-bold">Welcome to zyra!</h1>
                    <p className="">Create your account to share or rate facts</p>
                </div>

                <div className="rounded-lg bg-[#fff] p-8">
                    <form>
                        <div className="mb-2">
                            <label className="block text-gray-800 font-medium mb-2">Full-Name</label>
                            <input
                                type="full-name"
                                placeholder="Enter your full-name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-800 font-medium mb-2">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-800 font-medium mb-2">Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition mt-6"
                        >
                            Create account
                        </button>
                    </form>
                    <div className="text-center mt-4">
                        <p className="text-gray-700">
                            Don't have an account?{" "}
                            <Link to="/log-in" className="text-black font-semibold hover:underline">
                                Log-in
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Signup;
