// src/layouts/LearnerLayout.jsx
import React from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { Layout, Menu, message } from "antd";
import {
  HomeOutlined,
  BookOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { Content } = Layout;

export default function LearnerLayout() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // BẢO VỆ ROUTE
  if (!token) {
    message.warning("Vui lòng đăng nhập để tiếp tục");
    return <Navigate to="/login" replace />;
  }

  // XỬ LÝ ĐĂNG XUẤT
  const handleLogout = () => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
    if (confirmed) {
      localStorage.clear();
      message.success("Đăng xuất thành công");
      navigate("/login", { replace: true });
    }
  };

  // MENU ITEMS
  const menuItems = [
    {
      key: "/learner",
      icon: <HomeOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/learner"),
    },
    {
      key: "/learner/mycourse",
      icon: <BookOutlined />,
      label: "Khóa học của tôi",
      onClick: () => navigate("/learner/mycourse"),
    },
    {
      key: "/learner/profile",
      icon: <UserOutlined />,
      label: "Thông tin cá nhân",
      onClick: () => navigate("/learner/profile"),
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      onClick: handleLogout,
      danger: true,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* === SIDEBAR CỐ ĐỊNH === */}
      <Layout.Sider
        width={220}
        style={{
          position: "fixed",
          height: "100vh",
          left: 0,
          top: 0,
          zIndex: 10,
          background: "#001529",
          boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            height: 64,
            color: "#fff",
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
            lineHeight: "64px",
            background: "rgba(255,255,255,0.1)",
          }}
        >
          AESP Learner
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{ borderRight: 0 }}
        />
      </Layout.Sider>

      {/* === NỘI DUNG CHÍNH === */}
      <Layout style={{ marginLeft: 220, transition: "margin 0.2s ease" }}>
        <Content
          style={{
            padding: "24px",
            background: "#f4f6f9",
            minHeight: "100vh",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}