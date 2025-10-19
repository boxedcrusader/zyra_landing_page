import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './components/landing_page/Home'
import Login from './components/landing_page/Login'
import Signup from './components/landing_page/Signup'
import { ProtectedRoute } from './components/landing_page/ProjectedRoute'
import Dashboard from './components/app/Dashboard'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route 
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
