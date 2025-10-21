import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function AdminDashboard() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Dashboard Content
          </h1>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
