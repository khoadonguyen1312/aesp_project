// src/pages/DemoModePage.jsx
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { Button, Card, Typography, Space, message } from "antd";
import { RocketOutlined, DashboardOutlined, LoginOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

function DemoModePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const startDemo = () => {
    const demoUser = {
      id: 999,
      role: "admin",
      email: "demo@aesp.com",
      fullName: "Demo Admin",
    };

    localStorage.setItem("token", "demo-jwt-token-123456789");
    localStorage.setItem("user", JSON.stringify(demoUser));
    dispatch(setUser(demoUser));

    message.success("Demo Mode bật thành công!");
    navigate("/admin/dashboard");
  };

  // Tự động vào dashboard
  useEffect(() => {
    startDemo();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Card
        style={{
          width: 420,
          borderRadius: 16,
          textAlign: "center",
          boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
        }}
      >
        <RocketOutlined style={{ fontSize: 64, color: "#1890ff", marginBottom: 16 }} />
        
        <Title level={2} style={{ color: "#1890ff" }}>
          Demo Mode
        </Title>

        <Text type="secondary" style={{ display: "block", marginBottom: 24 }}>
          Không cần backend • Không cần login
        </Text>

        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Button
            type="primary"
            size="large"
            icon={<DashboardOutlined />}
            onClick={startDemo}
            block
          >
            Vào Dashboard Ngay
          </Button>

          <Button
            icon={<LoginOutlined />}
            onClick={() => navigate("/login")}
            block
          >
            Đi tới Login thật
          </Button>
        </Space>
      </Card>
    </div>
  );
}

export default DemoModePage; // PHẢI CÓ DÒNG NÀY