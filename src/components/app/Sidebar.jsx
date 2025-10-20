import logo from "../../assets/logo_dm.png";
import React, { useState } from "react";
import { Menu, X, Home, FileText, Settings, LogOut } from "lucide-react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: "Home", icon: Home, href: "/" },
    { name: "Facts", icon: FileText, href: "/facts" },
    { name: "Settings", icon: Settings, href: "/settings" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <div
        className={`${
          isOpen ? "w-64" : "w-20"
        } bg-black text-white transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {isOpen && <img src={logo} className="w-20 h-20" />}
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-800 rounded-lg transition"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 transition"
            >
              <item.icon size={24} />
              {isOpen && <span className="text-lg">{item.name}</span>}
            </a>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button className="flex items-center gap-4 p-3 w-full rounded-lg hover:bg-gray-800 transition text-red-500">
            <LogOut size={24} />
            {isOpen && <span className="text-lg">Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
