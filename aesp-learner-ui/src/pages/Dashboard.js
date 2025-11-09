// src/pages/Dashboard.js
import React from "react";
import { Card, Progress, Row, Col } from "antd";

function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome back, Learner 👋</h2>
      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col span={8}>
          <Card title="Pronunciation Score">
            <Progress percent={76} status="active" />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Vocabulary Growth">
            <Progress percent={58} status="active" />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Speaking Streak">
            <Progress percent={90} status="active" />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
