import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { LogOut } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 bg-gray-100 shadow-md">
      <div className="flex-shrink-0">
        <img src={logo} alt="Zyra Logo" className="h-10 w-12 sm:h-12 sm:w-16" />
      </div>

      <div className="flex-1 text-center">
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
          Admin Dashboard
        </h3>
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-3 sm:px-4 py-2 text-gray-700 hover:bg-red-50 rounded-lg transition group"
        title="Logout"
      >
        <LogOut
          size={20}
          className="text-gray-600 group-hover:text-red-600 transition"
        />
        <span className="hidden sm:inline text-sm font-medium group-hover:text-red-600 transition">
          Logout
        </span>
      </button>
    </nav>
  );
}

export default Navbar;
