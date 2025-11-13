// src/layouts/AdminLayout.jsx
import React from "react";
import { Layout, message } from "antd";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import AdminHeaderBar from "../components/AdminHeaderBar";
import AdminSider from "../components/AdminSider";

const { Content } = Layout;

export default function AdminLayout() {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!token) {
    message.warning("Vui lòng đăng nhập để truy cập trang quản trị");
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (user.role !== "admin") {
    message.warning("Bạn không có quyền truy cập trang này");
    return <Navigate to="/learner/dashboard" replace />;
  }

  const handleLogout = () => {
    localStorage.clear();
    message.success("Đăng xuất thành công");
    window.location.href = "/login";
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AdminSider />
      <Layout>
        <AdminHeaderBar onLogout={handleLogout} />
        <Content style={{ margin: "16px", background: "#fff", padding: 24, borderRadius: 8 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
