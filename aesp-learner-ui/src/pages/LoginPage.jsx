import React, { useState } from "react";
import { Button, Form, Input, Card, message } from "antd";
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    console.log("Login info:", values);

    try {
      // 🔹 Giả lập login
      if (values.username === "baotung" && values.password === "123456") {
        message.success("Đăng nhập thành công!");
        localStorage.setItem("token", "fake-jwt-token");
        navigate("/dashboard");
      } else {
        message.error("Sai tài khoản hoặc mật khẩu!");
      }
    } catch (error) {
      message.error("Lỗi hệ thống!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #e0f7fa, #e3f2fd, #f3e5f5)",
      }}
    >
      <Card
        title="🎓 Đăng nhập hệ thống"
        style={{
          width: 360,
          textAlign: "center",
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <Form name="login" onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[{ required: true, message: "Vui lòng nhập username!" }]}
          >
            <Input placeholder="Nhập username" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập password!" }]}
          >
            <Input.Password placeholder="Nhập password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Đăng nhập
            </Button>
          </Form.Item>

          {/* 🔹 Liên kết sang trang đăng ký */}
          <div style={{ marginTop: 8 }}>
            Chưa có tài khoản?{" "}
            <Link to="/register">Đăng ký ngay</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default LoginPage;

