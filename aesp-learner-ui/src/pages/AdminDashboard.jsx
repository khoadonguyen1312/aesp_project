// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { Tabs, Table, Button, message, Spin, Popconfirm, Input, Typography, Badge, Tag } from "antd";
import { SearchOutlined, ReloadOutlined, TeamOutlined, CrownOutlined } from "@ant-design/icons";
import API from "../services/api";

const { TabPane } = Tabs;
const { Title } = Typography;
const { Search } = Input;

function AdminDashboard() {
  const [mentors, setMentors] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingMentor, setLoadingMentor] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const [searchMentor, setSearchMentor] = useState("");
  const [searchUser, setSearchUser] = useState("");

  // --- Fetch Mentors ---
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
      message.error("Lỗi kết nối server!");
      console.error(err);
      // Mock fallback nếu backend lỗi
      setMentors([
        { id: 101, username: "mentor_pro", email: "mentor@aesp.com", fullName: "Thầy Giáo Pro", status: 1 },
      ]);
    } finally {
      setLoadingMentor(false);
    }
  };

  // --- Fetch Users ---
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
      message.error("Lỗi kết nối server!");
      console.error(err);
      // Mock fallback nếu backend lỗi
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
        message.success(res.data.message || "Xóa thành công");
        fetchMentors();
        fetchUsers();
      } else {
        message.error(res.data.message || "Xóa thất bại");
      }
    } catch (err) {
      message.error("Lỗi kết nối server!");
      console.error(err);
    }
  };

  const handleLock = async (id) => {
    try {
      const res = await API.get(`/admin/lock-member?id=${id}`);
      if (res.data.code === 200) {
        message.success(res.data.message || "Khóa thành công");
        fetchMentors();
        fetchUsers();
      } else {
        message.error(res.data.message || "Khóa thất bại");
      }
    } catch (err) {
      message.error("Lỗi kết nối server!");
      console.error(err);
    }
  };

  const handleUnlock = async (id) => {
    try {
      const res = await API.get(`/admin/unlock-member?id=${id}`);
      if (res.data.code === 200) {
        message.success(res.data.message || "Mở khóa thành công");
        fetchMentors();
        fetchUsers();
      } else {
        message.error(res.data.message || "Mở khóa thất bại");
      }
    } catch (err) {
      message.error("Lỗi kết nối server!");
      console.error(err);
    }
  };

  // --- Filter data ---
  const filteredMentors = mentors.filter(m => 
    m.username.toLowerCase().includes(searchMentor.toLowerCase()) || 
    m.email.toLowerCase().includes(searchMentor.toLowerCase()) ||
    m.fullName.toLowerCase().includes(searchMentor.toLowerCase())
  );

  const filteredUsers = users.filter(u => 
    u.username.toLowerCase().includes(searchUser.toLowerCase()) || 
    u.email.toLowerCase().includes(searchUser.toLowerCase()) ||
    u.fullName.toLowerCase().includes(searchUser.toLowerCase())
  );

  // --- Common Columns ---
  const columns = [
    { title: "ID", dataIndex: "id", key: "id", width: 80 },
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Full Name", dataIndex: "fullName", key: "fullName" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Badge status={status === 1 ? "success" : "error"} text={status === 1 ? "Hoạt động" : "Bị khóa"} />
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Popconfirm title="Xác nhận xóa?" onConfirm={() => handleDelete(record.id)}>
            <Button danger size="small">Xóa</Button>
          </Popconfirm>

          {record.status === 1 ? (
            <Popconfirm title="Xác nhận khóa?" onConfirm={() => handleLock(record.id)}>
              <Button type="primary" size="small">Khóa</Button>
            </Popconfirm>
          ) : (
            <Popconfirm title="Xác nhận mở khóa?" onConfirm={() => handleUnlock(record.id)}>
              <Button type="default" size="small">Mở khóa</Button>
            </Popconfirm>
          )}
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: 24, minHeight: "100vh", background: "linear-gradient(135deg, #f6f9fc, #e9ecef)" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: 32 }}>
        Admin Dashboard
      </Title>

      <Tabs defaultActiveKey="mentors" tabBarGutter={30} centered>
        <TabPane
          tab={
            <span>
              <CrownOutlined /> Mentors ({filteredMentors.length})
            </span>
          }
          key="mentors"
        >
          <Input
            placeholder="Tìm theo username, email, họ tên..."
            prefix={<SearchOutlined />}
            style={{ marginBottom: 16, width: 300 }}
            onChange={(e) => setSearchMentor(e.target.value)}
          />
          <Button icon={<ReloadOutlined />} onClick={fetchMentors} style={{ marginLeft: 8, marginBottom: 16 }}>
            Tải lại
          </Button>

          {loadingMentor ? (
            <Spin tip="Đang tải..." style={{ display: "block", margin: "50px auto" }} />
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

        <TabPane
          tab={
            <span>
              <TeamOutlined /> Users ({filteredUsers.length})
            </span>
          }
          key="users"
        >
          <Input
            placeholder="Tìm theo username, email, họ tên..."
            prefix={<SearchOutlined />}
            style={{ marginBottom: 16, width: 300 }}
            onChange={(e) => setSearchUser(e.target.value)}
          />
          <Button icon={<ReloadOutlined />} onClick={fetchUsers} style={{ marginLeft: 8, marginBottom: 16 }}>
            Tải lại
          </Button>

          {loadingUser ? (
            <Spin tip="Đang tải..." style={{ display: "block", margin: "50px auto" }} />
          ) : filteredUsers.length === 0 ? (
            <Empty description="Không có user" />
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