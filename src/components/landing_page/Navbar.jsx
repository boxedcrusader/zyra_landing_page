import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

function Navbar() {
  return (
    <nav className="top-0 z-50 bg-[#e2a9f1] px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="no-underline">
          <img
            src={logo}
            alt="Logo"
            className="w-20 h-20 hover:opacity-80 transition"
          />
        </Link>

        {/* Navigation Links */}
        <ul className="flex gap-6 items-center">
          <Link to="/sign-up" className="no-underline">
            <li className="text-gray-800 font-medium hover:border-b-2 hover:border-gray-800 pb-1 transition cursor-pointer">
              SIGN UP
            </li>
          </Link>
          <Link to="/log-in" className="no-underline">
            <li className="text-gray-800 font-medium hover:border-b-2 hover:border-gray-800 pb-1 transition cursor-pointer">
              LOG IN
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
