// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Profile from "./pages/Profile";
import MyCourses from "./pages/MyCourses";
import CourseDetail from "./pages/CourseDetail";
import PronunciationPractice from "./pages/PronunciationPractice"; // ✅ Thêm dòng này

function App() {
  const handleLogout = () => {
    console.log("Logout clicked");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* 🔹 Trang đăng nhập */}
        <Route path="/login" element={<LoginPage />} />

        {/* 🔹 Trang đăng ký */}
        <Route path="/register" element={<RegisterPage />} />

        {/* 🔹 Điều hướng mặc định sang dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* 🔹 Các trang chính trong layout */}
        <Route element={<AppLayout onLogout={handleLogout} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/practice" element={<PronunciationPractice />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;



