// src/pages/AdminDashboardMock.jsx
import React, { useState } from "react";
import { Card, Row, Col, Button, message, Tabs, Popconfirm, Avatar, Badge, Empty, Typography, Spin } from "antd";
import { UserOutlined, LockOutlined, UnlockOutlined, DeleteOutlined, TeamOutlined, CrownOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;
const { Title, Text } = Typography;

const AdminDashboardMock = () => {
  const [users, setUsers] = useState([
    { id: 1, username: "admin", email: "admin@aesp.com", fullName: "Quản trị viên", status: 1 },
    { id: 2, username: "user123", email: "user123@gmail.com", fullName: "Nguyễn Văn A", status: 1 },
    { id: 3, username: "locked_user", email: "locked@aesp.com", fullName: "Trần Thị B", status: 0 },
  ]);

  const [mentors, setMentors] = useState([
    { id: 101, username: "mentor_pro", email: "mentor@aesp.com", fullName: "Thầy Giáo Pro", status: 1 },
    { id: 102, username: "mentor_ai", email: "ai@aesp.com", fullName: "AI Mentor", status: 1 },
  ]);

  const [loading, setLoading] = useState(false);

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      message.success("Tải dữ liệu thành công (mock)!");
      setLoading(false);
    }, 800);
  };

  const handleDelete = (id, type) => {
    if (type === "user") setUsers(users.filter(u => u.id !== id));
    else setMentors(mentors.filter(m => m.id !== id));
    message.success(`Đã xóa ID: ${id} (giả lập)`);
  };

  const toggleStatus = (id, type) => {
    if (type === "user") {
      setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 1 ? 0 : 1 } : u));
    } else {
      setMentors(mentors.map(m => m.id === id ? { ...m, status: m.status === 1 ? 0 : 1 } : m));
    }
    message.success("Cập nhật trạng thái thành công");
  };

  const UserCard = ({ item, type }) => (
    <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
      <Card hoverable style={{ borderRadius: 16, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <Avatar size={64} icon={<UserOutlined />} style={{ backgroundColor: item.status === 1 ? "#52c41a" : "#f5222d" }} />
          <Title level={5} style={{ margin: "12px 0 4px" }}>{item.fullName || item.username}</Title>
          <Text type="secondary" style={{ fontSize: 12 }}>{item.email}</Text>
        </div>
        <Badge status={item.status === 1 ? "success" : "error"} text={item.status === 1 ? "Hoạt động" : "Đã khóa"} />
        <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
          <Popconfirm title="Xóa?" onConfirm={() => handleDelete(item.id, type)}>
            <Button danger size="small" icon={<DeleteOutlined />}>Xóa</Button>
          </Popconfirm>
          {item.status === 1 ? (
            <Popconfirm title="Khóa?" onConfirm={() => toggleStatus(item.id, type)}>
              <Button size="small" icon={<LockOutlined />}>Khóa</Button>
            </Popconfirm>
          ) : (
            <Popconfirm title="Mở khóa?" onConfirm={() => toggleStatus(item.id, type)}>
              <Button type="primary" size="small" icon={<UnlockOutlined />}>Mở khóa</Button>
            </Popconfirm>
          )}
        </div>
      </Card>
    </Col>
  );

  return (
    <div style={{ padding: 24, minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <Title level={2} style={{ color: "white", textAlign: "center", marginBottom: 32 }}>
          Admin Dashboard – Mock Mode
        </Title>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Button type="primary" onClick={refreshData} loading={loading}>Tải lại</Button>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <Spin size="large" tip="Đang tải dữ liệu giả..." />
          </div>
        ) : (
          <Tabs defaultActiveKey="users" centered>
            <TabPane tab={<span><TeamOutlined /> Người dùng ({users.length})</span>} key="users">
              {users.length === 0 ? <Empty /> : <Row gutter={[16, 24]}>{users.map(item => <UserCard key={item.id} item={item} type="user" />)}</Row>}
            </TabPane>
            <TabPane tab={<span><CrownOutlined /> Mentor ({mentors.length})</span>} key="mentors">
              {mentors.length === 0 ? <Empty /> : <Row gutter={[16, 24]}>{mentors.map(item => <UserCard key={item.id} item={item} type="mentor" />)}</Row>}
            </TabPane>
          </Tabs>
        )}
        <div style={{ textAlign: "center", marginTop: 40, color: "rgba(255,255,255,0.7)" }}>
          <Text>Không cần backend • Dùng để demo</Text>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardMock;