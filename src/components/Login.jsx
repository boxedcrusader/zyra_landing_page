import React from "react";
import logo from "../assets/logo.png"
import {Link} from "react-router-dom"

function Login() { 
    return (
        <>
            <section className="flex min-h-screen items-center justify-center px-4 bg-[#e2a9f1]">
                <div className="rounded-lg mr-8">
                    <img src={logo} className="h-64 w-72"/>
                    <h1 className="text-5xl font-bold">Welcome back to zyra!</h1>
                    <p className="">Continue sharing or rating other facts</p>
                </div>

                <div className="rounded-lg bg-[#fff] p-8">
                    <form>
                        <div>
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
                            Login
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
