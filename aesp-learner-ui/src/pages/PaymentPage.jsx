// src/pages/PaymentPage.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button, Typography, Space, Divider, message } from "antd";
import { ArrowLeftOutlined, CheckCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function PaymentPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const course = state?.course;

  // Hàm xử lý thanh toán thành công
  const handlePaymentSuccess = () => {
    if (!course) return;

    // Lấy danh sách khóa học đã mua từ localStorage
    const myCourses = JSON.parse(localStorage.getItem("myCourses") || "[]");

    // Kiểm tra xem khóa học đã tồn tại chưa
    const isAlreadyBought = myCourses.some((c) => c.id === course.id);

    if (!isAlreadyBought) {
      // Thêm khóa học mới với progress = 0
      const newCourse = {
        ...course,
        progress: 0,
        purchasedAt: new Date().toISOString(),
      };
      myCourses.push(newCourse);
      localStorage.setItem("myCourses", JSON.stringify(myCourses));
    }

    message.success({
      content: `Đã mua thành công: ${course.title}`,
      icon: <CheckCircleOutlined />,
    });

    // Chuyển về Dashboard
    navigate("/learner", { replace: true });
  };

  if (!course) {
    return (
      <div style={{ padding: 24, textAlign: "center" }}>
        <Text type="danger">Không tìm thấy khóa học.</Text>
        <Button type="link" onClick={() => navigate("/learner")}>
          Về trang chủ
        </Button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: "0 16px" }}>
      <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} style={{ marginBottom: 16 }}>
        Quay lại
      </Button>

      <Card>
        <Title level={3}>Xác nhận thanh toán</Title>
        <Divider />

        <Space direction="vertical" size={16} style={{ width: "100%" }}>
          <div>
            <Text strong>Khóa học:</Text>
            <Title level={5} style={{ margin: "4px 0" }}>{course.title}</Title>
          </div>

          <div>
            <Text strong>Giảng viên:</Text>
            <Text> {course.instructor || "Giảng viên AESP"}</Text>
          </div>

          <Divider style={{ margin: "12px 0" }} />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text strong style={{ fontSize: 18 }}>Tổng tiền:</Text>
            <Text strong style={{ fontSize: 24, color: "#f5222d" }}>
              {course.price.toLocaleString("vi-VN")}đ
            </Text>
          </div>

          <Button
            type="primary"
            danger
            size="large"
            block
            onClick={handlePaymentSuccess}
            style={{ marginTop: 16 }}
          >
            Xác nhận thanh toán
          </Button>
        </Space>
      </Card>
    </div>
  );
}