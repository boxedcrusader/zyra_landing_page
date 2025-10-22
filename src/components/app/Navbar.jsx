import React from "react";
import logo from "../../assets/favicon.svg";
import { Search, UserCircle } from "lucide-react";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-gray-900 shadow-sm border-b border-gray-600">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        {/* Left: Logo */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <img
            src={logo}
            alt="Logo"
            className="h-10 w-auto object-contain cursor-pointer"
          />
        </div>

        {/* Center: Search Bar */}
        <div className="hidden md:flex flex-1 justify-center px-8">
          <div className="relative w-full max-w-2xl">
            <input
              type="text"
              placeholder="Search for facts..."
              className="w-full rounded-full border text-gray-400 border-gray-600 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center space-x-4 flex-shrink-0">
          {/* Mobile Search Icon */}
          <button className="md:hidden p-2 rounded-full hover:bg-gray-600">
            <Search size={20} className="text-gray-300" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-600">
            <UserCircle size={26} className="text-gray-300" />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;