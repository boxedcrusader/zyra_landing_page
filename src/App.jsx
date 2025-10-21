import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/landing_page/Home";
import Login from "./components/landing_page/Login";
import Signup from "./components/landing_page/Signup";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Dashboard from "./components/app/Dashboard";
import AdminLogin from "./components/admin/AdminLogin";
import AdminReg from "./components/admin/AdminReg";
import AdminDashboard from "./components/admin/Dashboard";
import Topics from "./components/admin/topics/Topics";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminReg />} />
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute requiredRole="USER">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
