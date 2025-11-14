import React from "react";
import { Layout, Menu } from "antd";
import { UserOutlined, DashboardOutlined, TeamOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const { Sider } = Layout;

export default function AdminSider() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { key: "/admin/dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
    { key: "/admin/list-user", icon: <UserOutlined />, label: "Users" },
    { key: "/admin/list-mentor", icon: <TeamOutlined />, label: "Mentors" },
  ];

  return (
    <Sider breakpoint="lg" collapsedWidth="0" theme="dark">
      <div
        style={{
          height: 60,
          margin: 16,
          fontWeight: "bold",
          color: "white",
          textAlign: "center",
          fontSize: 18,
        }}
      >
        AESP Admin
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
      />
    </Sider>
  );
}
