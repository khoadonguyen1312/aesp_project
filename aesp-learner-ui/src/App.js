// src/App.js – ĐÃ XÓA PaymentSuccess
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";
import LearnerLayout from "./layouts/LearnerLayout";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminRegisterPage from "./pages/AdminRegisterPage";

import ListUserPage from "./pages/ListUserPage";
import AdminDashboard from "./pages/AdminDashboard";
import DemoModePage from "./pages/DemoModePage";

import LearnerDashboard from "./pages/LearnerDashboard";
import MyCoursesPage from "./pages/MyCoursesPage";
import CourseDetail from "./pages/CourseDetail";
import Profile from "./pages/Profile";
import PaymentPage from "./pages/PaymentPage";
// XÓA: import PaymentSuccess

const handleLogout = () => {
  localStorage.clear();
  window.location.href = "/login";
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin/register" element={<AdminRegisterPage />} />
        <Route path="/demo" element={<DemoModePage />} />

        <Route path="/admin" element={<AdminLayout onLogout={handleLogout} />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="list-user" element={<ListUserPage />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="/learner" element={<LearnerLayout />}>
          <Route index element={<LearnerDashboard />} />
          <Route path="mycourse" element={<MyCoursesPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="courses/:id" element={<CourseDetail />} />
          <Route path="payment" element={<PaymentPage />} />
          {/* XÓA: <Route path="payment/success" ... /> */}
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;