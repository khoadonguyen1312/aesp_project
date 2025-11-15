import React from "react";
import { Layout, Dropdown, Avatar, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Header } = Layout;

export default function AdminHeaderBar({ onLogout }) {
  const menu = (
    <Menu>
      <Menu.Item key="logout" onClick={onLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      style={{
        background: "#fff",
        padding: "0 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 18 }}>Admin Dashboard</div>
      <Dropdown overlay={menu} placement="bottomRight">
        <Avatar icon={<UserOutlined />} />
      </Dropdown>
    </Header>
  );
}

