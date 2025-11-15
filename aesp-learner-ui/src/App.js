import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import LearnerLayout from "./layouts/LearnerLayout";

// Auth Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminRegisterPage from "./pages/AdminRegisterPage";

// Admin Pages
import ListUserPage from "./pages/ListUserPage";
import AdminDashboardMock from "./pages/AdminDashboardMock";
import AdminDashboard from "./pages/AdminDashboard";
import DemoModePage from "./pages/DemoModePage"; // ĐÚNG

// Learner Pages
import LearnerDashboard from "./pages/LearnerDashboard";
import CourseDetail from "./pages/CourseDetail";
import Profile from "./pages/Profile";
import AdminInfoPage from "./pages/AdminInfoPage";
import MentorLayout from "./layouts/mentorLayout";
import MentorRegisterPage from "./pages/MentorRegisterPage";
import MentorDashboard from "./pages/MentorDashboard";

function App() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin/register" element={<AdminRegisterPage />} />
        <Route path="/mentor/register" element={<MentorRegisterPage />} />
        {/* DEMO MODE – RA NGOÀI /admin */}
        <Route path="/demo" element={<DemoModePage />} />
        <Route path="/mentor" element={<MentorDashboard />}>

        </Route>

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout onLogout={handleLogout} />}>
          <Route index element={<AdminDashboardMock />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="info" element={<AdminInfoPage />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Learner */}
        <Route path="/learner" element={<LearnerLayout />}>
          <Route index element={<LearnerDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="courses/:id" element={<CourseDetail />} />
        </Route>

        {/* Redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
