import React from "react";
import { User, Settings, Search, Home } from "lucide-react";

function Sidebar() {
  const menuItems = [
    { name: "Home", icon: Home, href: "/" },
    { name: "Users", icon: User, href: "/Users" },
    { name: "Topics", icon: User, href: "/topics" },
    { name: "Settings", icon: Settings, href: "/settings" },
  ];

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            <a
              key={item.name}
              href={item.href}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 transition"
            >
              <item.icon size={20} />
            </a>;
          })}
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
