import React, { useState } from "react";
import { Button, Form, Input, Select, Card, message } from "antd";
import { useNavigate, Link } from "react-router-dom";

const { Option } = Select;

function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Register info:", values);
    setLoading(true);
    setTimeout(() => {
      message.success("Đăng ký thành công!");
      navigate("/login");
      setLoading(false);
    }, 1000);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #e8f5e9, #e3f2fd, #fff3e0)",
      }}
    >
      <Card
        title="📝 Đăng ký tài khoản"
        style={{
          width: 420,
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[{ required: true, message: "Vui lòng nhập username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Họ và tên"
            name="fullName"
            rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Tuổi" name="age">
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Cấp độ hiện tại" name="level">
            <Select placeholder="Chọn cấp độ">
              <Option value="BEGINNER">Beginner</Option>
              <Option value="INTERMEDIATE">Intermediate</Option>
              <Option value="ADVANCED">Advanced</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Ngôn ngữ mẹ đẻ" name="nativeLanguage">
            <Input />
          </Form.Item>

          <Form.Item label="Mục tiêu học" name="goal">
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Đăng ký
            </Button>
          </Form.Item>

          {/* 🔹 Liên kết sang trang đăng nhập */}
          <div style={{ textAlign: "center" }}>
            Đã có tài khoản?{" "}
            <Link to="/login">Đăng nhập</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default RegisterPage;


