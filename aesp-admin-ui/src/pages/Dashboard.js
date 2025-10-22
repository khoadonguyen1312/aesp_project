import { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";
import { getHelloMessage } from "../api/adminApi";

export default function Dashboard() {
  const [message, setMessage] = useState("Đang tải...");

  useEffect(() => {
    getHelloMessage()
      .then(setMessage)
      .catch((err) => setMessage("Lỗi: " + err.message));
  }, []);

  return (
    <div>
      <h3 style={{ marginBottom: "1rem" }}>📊 Dashboard</h3>
      <Row gutter={[16, 16]}>
        <Col span={8}><Card title="Người học">128 learners</Card></Col>
        <Col span={8}><Card title="Mentors">12 mentors</Card></Col>
        <Col span={8}><Card title="Doanh thu">$1,250</Card></Col>
      </Row>

      <Card style={{ marginTop: "1.5rem" }}>
        <p><b>Thông điệp từ backend:</b> {message}</p>
      </Card>
    </div>
  );
}

