import React from "react";
import { Layout } from "antd";

const { Header } = Layout;

const HeaderBar = () => (
  <Header
    style={{
      background: "#fff",
      padding: "0 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    }}
  >
    <h3 style={{ margin: 0 }}>AESP Admin Dashboard</h3>
    <div>Xin chào, Admin 👋</div>
  </Header>
);

export default HeaderBar;
