// src/pages/AdminLoginPage.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import API from "../services/api"; // DÙNG API CHUNG
import { useNavigate } from "react-router-dom";
import { Card, Input, Button, message, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      message.warning("Vui lòng nhập email và mật khẩu");
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Đăng nhập thất bại");
      }

      const { token, user } = res.data.data;

      // Lưu vào localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Cập nhật Redux
      dispatch(setUser(user));

      message.success("Đăng nhập Admin thành công!");

      // CHUYỂN HƯỚNG THEO ROLE
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        message.warning("Tài khoản không có quyền admin");
        localStorage.clear();
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      message.error(err.message || "Sai email hoặc mật khẩu");
    } finally {
      setLoading(false);
    }
  };

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
        style={{ width: 400, borderRadius: 16, boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}
        bodyStyle={{ padding: "32px" }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Title level={3} style={{ color: "#1890ff", margin: 0 }}>
            Admin Login
          </Title>
          <p style={{ color: "#888", marginTop: 8 }}>
            Quản trị hệ thống
          </p>
        </div>

        <Input
          prefix={<UserOutlined />}
          placeholder="Email (admin@aesp.com)"
          size="large"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: 16 }}
          onPressEnter={handleLogin}
        />

        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Mật khẩu (123456)"
          size="large"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: 24 }}
          onPressEnter={handleLogin}
        />

        <Button
          type="primary"
          size="large"
          block
          loading={loading}
          onClick={handleLogin}
          style={{ borderRadius: 8 }}
        >
          Đăng nhập Admin
        </Button>

        <div style={{ marginTop: 16, textAlign: "center", fontSize: 12, color: "#888" }}>
          <p><strong>Tài khoản test:</strong></p>
          <p>Email: <code>67@aesp.com</code> | Pass: <code>123456</code></p>
        </div>
      </Card>
    </div>
  );
}