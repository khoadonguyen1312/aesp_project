import React, { useState } from "react";
import { Form, Input, Button, Typography, message, Card } from "antd";
import API from "../services/api"; // dùng API chung đã setup interceptor

const { Title } = Typography;

function MentorRegisterPage() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
    
      const res = await API.post("/mentor/register", {
        username: values.username,
        password: values.password,
        email: values.email,
        phone_number: values.phone_number,
        fullname: values.fullname,
        bio: values.bio,
      });

      if (res.data.code === 200) {
        message.success("Đăng ký mentor thành công!");
        form.resetFields();
      } else {
        message.error(res.data.message || "Đăng ký thất bại!");
      }
    } catch (err) {
      console.error(err);
      message.error("Lỗi kết nối server!");
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
        minHeight: "100vh",
        background: "#f0f2f5",
        padding: 16,
      }}
    >
      <Card style={{ width: 400, borderRadius: 8 }}>
        <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
          Đăng ký Mentor
        </Title>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Vui lòng nhập username" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập password" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone_number"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <Input placeholder="Phone number" />
          </Form.Item>

          <Form.Item
            label="Họ và tên"
            name="fullname"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
          >
            <Input placeholder="Full name" />
          </Form.Item>

          <Form.Item
            label="Bio"
            name="bio"
            rules={[{ required: true, message: "Vui lòng nhập bio" }]}
          >
            <Input.TextArea placeholder="Bio" rows={4} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default MentorRegisterPage;
