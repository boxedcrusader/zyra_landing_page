import React from "react";
import { User, Settings, Home, FileText } from "lucide-react";

function Sidebar() {
  const menuItems = [
    { name: "Home", icon: Home, href: "/admin/dashboard" },
    { name: "Users", icon: User, href: "/Users" },
    { name: "Topics", icon: FileText, href: "/topics" },
    { name: "Settings", icon: Settings, href: "/settings" },
  ];

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            return (
              <a
                key={item.name}
                title={item.name}
                href={item.href}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-white transition"
              >
                <item.icon size={20} />
              </a>
            );
          })}
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
