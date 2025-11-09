// src/App.js
import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import HeaderBar from "./components/HeaderBar";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import "antd/dist/reset.css";

const { Sider, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        {/* Sidebar bên trái */}
        <Sider collapsible breakpoint="lg" collapsedWidth="80">
          <div
            style={{
              color: "white",
              textAlign: "center",
              padding: "16px",
              fontWeight: "bold",
              fontSize: "18px",
              letterSpacing: "1px",
            }}
          >
            AESP
          </div>
          <Sidebar />
        </Sider>

        {/* Phần chính */}
        <Layout>
          <HeaderBar />
          <Content
            style={{
              margin: "16px",
              background: "#fff",
              padding: "16px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <Routes>
              {/* Chuyển hướng mặc định */}
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;


