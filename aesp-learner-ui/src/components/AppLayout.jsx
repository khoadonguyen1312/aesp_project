// src/components/AppLayout.jsx
import React from "react";
import { Layout, Menu, Dropdown, Avatar } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
  IdcardOutlined,
  BookOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

function AppLayout({ onLogout }) {
  const navigate = useNavigate();

  // 🔹 Menu dropdown khi click vào avatar (góc phải header)
  const userMenu = (
    <Menu
      items={[
        {
          key: "profile",
          label: "Hồ sơ cá nhân",
          icon: <IdcardOutlined />,
          onClick: () => navigate("/profile"),
        },
        {
          key: "logout",
          label: "Đăng xuất",
          icon: <LogoutOutlined />,
          onClick: onLogout,
        },
      ]}
    />
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar trái */}
      <Sider theme="dark" collapsible>
        <div
          style={{
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
            textAlign: "center",
            margin: "16px 0",
          }}
        >
          🎓 AESP Learner
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          items={[
            {
              key: "dashboard",
              icon: <DashboardOutlined />,
              label: "Dashboard",
              onClick: () => navigate("/dashboard"),
            },
            {
              key: "courses",
              icon: <BookOutlined />,
              label: "My Courses",
              onClick: () => navigate("/my-courses"),
            },
            {
              key: "profile",
              icon: <IdcardOutlined />,
              label: "Hồ sơ cá nhân",
              onClick: () => navigate("/profile"),
            },
            {
              key: "logout",
              icon: <LogoutOutlined />,
              label: "Đăng xuất",
              onClick: onLogout,
            },
            {
              key: "my-courses",
              icon: <BookOutlined />,
              label: "Khóa học của tôi",
              onClick: () => navigate("/my-courses"),
},
          ]}
        />
      </Sider>

      {/* Header + Nội dung chính */}
      <Layout>
        <Header
          style={{
            background: "#fff",
            textAlign: "right",
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          {/* Avatar + Tên người dùng */}
          <Dropdown overlay={userMenu} placement="bottomRight" arrow>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <Avatar
                style={{ backgroundColor: "#1890ff", marginRight: 8 }}
                icon={<UserOutlined />}
              />
              <span style={{ fontWeight: "bold" }}>Nguyễn Đình Bảo Tùng</span>
            </div>
          </Dropdown>
        </Header>

        {/* Nội dung hiển thị các trang con */}
        <Content
          style={{
            margin: "16px",
            background: "#fff",
            padding: "24px",
            borderRadius: "10px",
            minHeight: "80vh",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default AppLayout;


