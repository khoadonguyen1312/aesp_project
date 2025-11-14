import React from "react";
import { Layout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

const { Sider, Content, Header } = Layout;

export default function LearnerLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider breakpoint="lg" collapsedWidth="0">
        <div
          style={{
            height: 64,
            color: "#fff",
            fontSize: 18,
            textAlign: "center",
            lineHeight: "64px",
            background: "#1677ff",
            marginBottom: 8,
          }}
        >
          Learner
        </div>
        <Menu
          theme="dark"
          mode="inline"
          items={[
            { key: "1", label: "Dashboard", onClick: () => navigate("/learner/dashboard") },
            { key: "2", label: "Hồ sơ cá nhân", onClick: () => navigate("/learner/profile") },
            { key: "3", label: "Đăng xuất", onClick: handleLogout },
          ]}
        />
      </Sider>

      {/* Content */}
      <Layout>
        <Header style={{ background: "#fff", paddingLeft: 16 }}>
          <h3>Hệ thống học viên</h3>
        </Header>
        <Content
          style={{
            margin: "16px",
            background: "#fff",
            padding: 24,
            borderRadius: 8,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

