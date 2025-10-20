import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <>
      <section className="flex items-center justify-center h-screen bg-[#e2a9f1]">
        <div className="text-center">
          <img
            src={logo}
            className="w-80 h-80 mx-auto mb-6 hover:scale-110 transition"
          />
          <h1 className="text-5xl font-bold mb-2">Welcome to zyra</h1>
          <p className="text-xl text-stone-700 mb-4">Share a fact today!</p>
          <Link to="/log-in">
            <button className="px-4 py-2 rounded-lg bg-black text-white hover:bg-stone-800">
              Get Started
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}

export default Hero;
