// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { Card, Form, Input, Button, Select, message } from "antd";

const { Option } = Select;

function Profile() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // ✅ Giả lập dữ liệu người dùng từ localStorage (sau này có thể thay bằng API)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) form.setFieldsValue(user);
  }, [form]);

  const onFinish = (values) => {
    setLoading(true);
    console.log("Profile updated:", values);

    // 🔹 Lưu lại vào localStorage (giả lập update)
    localStorage.setItem("user", JSON.stringify(values));

    message.success("Cập nhật hồ sơ thành công!");
    setLoading(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: 40,
      }}
    >
      <Card
        title="👤 Hồ sơ cá nhân"
        style={{ width: 600, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ level: "BEGINNER" }}
        >
          <Form.Item label="Họ và tên" name="fullName" rules={[{ required: true }]}>
            <Input placeholder="Nhập họ tên của bạn" />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ type: "email", required: true }]}>
            <Input placeholder="Nhập email" />
          </Form.Item>

          <Form.Item label="Tuổi" name="age" rules={[{ required: true }]}>
            <Input type="number" min={5} max={99} />
          </Form.Item>

          <Form.Item label="Cấp độ hiện tại" name="level" rules={[{ required: true }]}>
            <Select>
              <Option value="BEGINNER">BEGINNER</Option>
              <Option value="INTERMEDIATE">INTERMEDIATE</Option>
              <Option value="ADVANCED">ADVANCED</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Ngôn ngữ mẹ đẻ" name="nativeLanguage" rules={[{ required: true }]}>
            <Input placeholder="VD: Vietnamese, English..." />
          </Form.Item>

          <Form.Item label="Mục tiêu học" name="goal">
            <Input placeholder="VD: IELTS 6.5, Giao tiếp, Du học..." />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Cập nhật thông tin
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Profile;
