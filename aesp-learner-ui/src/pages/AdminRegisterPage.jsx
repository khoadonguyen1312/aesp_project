import React, { useState } from "react";
import { Card, Form, Input, Button, message, Alert } from "antd";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function AdminRegisterPage() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    setErrorMsg("");
    try {
      const payload = { ...values, role: "ADMIN" };
      console.log("Payload gửi lên:", payload);

      const res = await axios.post(
        "http://192.168.1.112:8080/admin/register",
        payload
      );

      console.log("Response:", res.data);

      if (res.data && res.data.code === 200 && res.data.data) {
        // Lấy token trả về
        const token = res.data.data;
        localStorage.setItem("token", token); // lưu token vào localStorage
        message.success("Đăng ký Admin thành công!");
        navigate("/dashboard"); // điều hướng sau khi đăng nhập
      } else {
        setErrorMsg(res.data.message || "Đăng ký thất bại!");
      }
    } catch (err) {
      if (err.response) {
        console.error("Response data:", err.response.data);
        setErrorMsg(err.response.data.message || "Đăng ký thất bại!");
      } else if (err.request) {
        console.error("No response:", err.request);
        setErrorMsg("Không kết nối được server!");
      } else {
        console.error("Error:", err.message);
        setErrorMsg(err.message);
      }
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
        background: "linear-gradient(135deg, #ffe0e0, #f0f0f0)",
      }}
    >
      <Card
        title="Đăng ký Admin"
        style={{ width: 400, borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
      >
        {errorMsg && <Alert type="error" message={errorMsg} style={{ marginBottom: 16 }} />}

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

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Đăng ký Admin
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center" }}>
            Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default AdminRegisterPage;


