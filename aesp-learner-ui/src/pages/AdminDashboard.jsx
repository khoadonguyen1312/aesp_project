// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { Tabs, Table, Button, message, Spin, Popconfirm, Input, Badge, Space, Empty, Typography } from "antd";
import { SearchOutlined, ReloadOutlined, CrownOutlined, TeamOutlined } from "@ant-design/icons";
import API from "../services/api";

const { TabPane } = Tabs;
const { Title } = Typography;

function AdminDashboard() {
  const [mentors, setMentors] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingMentor, setLoadingMentor] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const [searchMentor, setSearchMentor] = useState("");
  const [searchUser, setSearchUser] = useState("");

  // --- Fetch Data ---
  const fetchMentors = async () => {
    setLoadingMentor(true);
    try {
      const res = await API.get("/admin/list-mentor?page=0&size=50");
      if (res.data.code === 200) {
        setMentors(res.data.data.content || []);
      } else {
        message.error(res.data.message || "Không lấy được danh sách mentor");
      }
    } catch (err) {
      message.error("Lỗi kết nối server");
      setMentors([
        { id: 101, username: "mentor_pro", email: "mentor@aesp.com", fullName: "Thầy Giáo Pro", status: 1 },
      ]);
    } finally {
      setLoadingMentor(false);
    }
  };

  const fetchUsers = async () => {
    setLoadingUser(true);
    try {
      const res = await API.get("/admin/list-user?page=0&size=50");
      if (res.data.code === 200) {
        setUsers(res.data.data.content || []);
      } else {
        message.error(res.data.message || "Không lấy được danh sách user");
      }
    } catch (err) {
      message.error("Lỗi kết nối server");
      setUsers([
        { id: 1, username: "admin", email: "admin@aesp.com", fullName: "Quản trị viên", status: 1 },
      ]);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    fetchMentors();
    fetchUsers();
  }, []);

  // --- Actions ---
  const handleDelete = async (id) => {
    try {
      const res = await API.delete(`/admin/delete-member?id=${id}`);
      if (res.data.code === 200) {
        message.success("Xóa thành công");
        fetchMentors();
        fetchUsers();
      } else {
        message.error(res.data.message || "Xóa thất bại");
      }
    } catch {
      message.error("Lỗi server");
    }
  };

  const handleLock = async (id) => {
    try {
      const res = await API.get(`/admin/lock-member?id=${id}`);
      if (res.data.code === 200) {
        message.success("Khóa thành công");
        fetchMentors();
        fetchUsers();
      } else {
        message.error("Khóa thất bại");
      }
    } catch {
      message.error("Lỗi server");
    }
  };

  const handleUnlock = async (id) => {
    try {
      const res = await API.get(`/admin/unlock-member?id=${id}`);
      if (res.data.code === 200) {
        message.success("Mở khóa thành công");
        fetchMentors();
        fetchUsers();
      } else {
        message.error("Mở khóa thất bại");
      }
    } catch {
      message.error("Lỗi server");
    }
  };

  // --- Filter ---
  const filteredMentors = mentors.filter(m =>
    [m.username, m.email, m.fullName].some(field =>
      field?.toLowerCase().includes(searchMentor.toLowerCase())
    )
  );

  const filteredUsers = users.filter(u =>
    [u.username, u.email, u.fullName].some(field =>
      field?.toLowerCase().includes(searchUser.toLowerCase())
    )
  );

  // --- Table Columns ---
  const columns = [
    { title: "ID", dataIndex: "id", key: "id", width: 80 },
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Họ tên", dataIndex: "fullName", key: "fullName" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status) => (
        <Badge status={status === 1 ? "success" : "error"} text={status === 1 ? "Hoạt động" : "Đã khóa"} />
      ),
    },
    {
      title: "Hành động",
      key: "action",
      width: 180,
      render: (_, record) => (
        <Space>
          <Popconfirm title="Xóa?" onConfirm={() => handleDelete(record.id)}>
            <Button danger size="small">Xóa</Button>
          </Popconfirm>
          {record.status === 1 ? (
            <Popconfirm title="Khóa?" onConfirm={() => handleLock(record.id)}>
              <Button type="primary" size="small">Khóa</Button>
            </Popconfirm>
          ) : (
            <Popconfirm title="Mở khóa?" onConfirm={() => handleUnlock(record.id)}>
              <Button size="small">Mở khóa</Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
        Quản lý hệ thống
      </Title>

      <Tabs defaultActiveKey="mentors" centered>
        {/* === Tab Mentors === */}
        <TabPane
          tab={
            <span>
              <CrownOutlined /> Mentors ({filteredMentors.length})
            </span>
          }
          key="mentors"
        >
          <div style={{ marginBottom: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Input
              placeholder="Tìm kiếm..."
              prefix={<SearchOutlined />}
              style={{ width: 280 }}
              onChange={(e) => setSearchMentor(e.target.value)}
              allowClear
            />
            <Button icon={<ReloadOutlined />} onClick={fetchMentors}>
              Tải lại
            </Button>
          </div>

          {loadingMentor ? (
            <div style={{ textAlign: "center", padding: 40 }}>
              <Spin tip="Đang tải..." />
            </div>
          ) : filteredMentors.length === 0 ? (
            <Empty description="Không có mentor" />
          ) : (
            <Table
              dataSource={filteredMentors}
              columns={columns}
              rowKey="id"
              pagination={{ pageSize: 10, showSizeChanger: true }}
              scroll={{ x: 800 }}
            />
          )}
        </TabPane>

        {/* === Tab Users === */}
        <TabPane
          tab={
            <span>
              <TeamOutlined /> Users ({filteredUsers.length})
            </span>
          }
          key="users"
        >
          <div style={{ marginBottom: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Input
              placeholder="Tìm kiếm..."
              prefix={<SearchOutlined />}
              style={{ width: 280 }}
              onChange={(e) => setSearchUser(e.target.value)}
              allowClear
            />
            <Button icon={<ReloadOutlined />} onClick={fetchUsers}>
              Tải lại
            </Button>
          </div>

          {loadingUser ? (
            <div style={{ textAlign: "center", padding: 40 }}>
              <Spin tip="Đang tải..." />
            </div>
          ) : filteredUsers.length === 0 ? (
            <Empty description="Không có người dùng" />
          ) : (
            <Table
              dataSource={filteredUsers}
              columns={columns}
              rowKey="id"
              pagination={{ pageSize: 10, showSizeChanger: true }}
              scroll={{ x: 800 }}
            />
          )}
        </TabPane>
      </Tabs>
    </div>
  );
}

export default AdminDashboard;