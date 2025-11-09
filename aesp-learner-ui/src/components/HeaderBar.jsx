// src/components/HeaderBar.jsx
import React from "react";
import { Layout, Dropdown, Avatar, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Header } = Layout;

export default function HeaderBar({ onLogout }) {
  const menu = (
    <Menu>
      <Menu.Item key="profile">Profile</Menu.Item>
      <Menu.Item key="logout" onClick={onLogout}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <Header style={{ background: "#fff", padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
      <div style={{ fontWeight: 700 }}>AESP Learner</div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ color: "#666" }}>Xin chào, Learner</div>
        <Dropdown overlay={menu} placement="bottomRight">
          <Avatar icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  );
}
