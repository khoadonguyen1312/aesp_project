// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { Card, Input, Button, message } from "antd";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      message.warning("Vui lòng nhập đầy đủ email và mật khẩu");
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });
      const { token, user } = res.data;

      // Lưu token vào localStorage
      localStorage.setItem("token", token);

      // Cập nhật Redux store
      dispatch(setUser(user));

      message.success("Đăng nhập thành công!");
      // Chuyển hướng sang learner dashboard
      navigate("/learner/dashboard");
    } catch (err) {
      console.error(err);
      message.error("Sai email hoặc mật khẩu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card title="Đăng nhập Học viên" style={{ width: 350 }}>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-3"
        />
        <Input.Password
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-3"
        />
        <Button
          type="primary"
          block
          loading={loading}
          onClick={handleLogin}
        >
          Đăng nhập
        </Button>
      </Card>
    </div>
  );
}
