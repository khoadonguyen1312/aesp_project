// src/pages/ListUserPage.jsx
import React, { useEffect, useState } from "react";
import { Table, Button, message, Popconfirm, Input, Typography, Spin, Tag } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import API from "../services/api";

const { Title } = Typography;
const { Search } = Input;

function ListUserPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLock = async (id) => {
    try {
      await API.get(`/admin/lock-member?id=${id}`);
      message.success("Đã khóa");
      fetchUsers();
    } catch {
      message.error("Lỗi");
    }
  };

  const handleUnlock = async (id) => {
    try {
      await API.get(`/admin/unlock-member?id=${id}`);
      message.success("Đã mở khóa");
      fetchUsers();
    } catch {
      message.error("Lỗi");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/admin/delete-member?id=${id}`);
      message.success("Đã xóa");
      fetchUsers();
    } catch {
      message.error("Lỗi");
    }
  };

  const filteredUsers = users.filter(u =>
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.fullName.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { title: "ID", dataIndex: "id", key: "id", width: 80 },
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Họ tên", dataIndex: "fullName", key: "fullName" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (s) => (
        <Tag color={s === 1 ? "green" : "red"}>
          {s === 1 ? "Hoạt động" : "Đã khóa"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <span style={{ display: "flex", gap: 8 }}>
          {record.status === 1 ? (
            <Popconfirm title="Khóa?" onConfirm={() => handleLock(record.id)}>
              <Button type="primary" size="small">Khóa</Button>
            </Popconfirm>
          ) : (
            <Popconfirm title="Mở khóa?" onConfirm={() => handleUnlock(record.id)}>
              <Button type="default" size="small">Mở khóa</Button>
            </Popconfirm>
          )}
          <Popconfirm title="Xóa?" onConfirm={() => handleDelete(record.id)}>
            <Button danger size="small">Xóa</Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div style={{ padding: 24, background: "#f0f2f5", borderRadius: 8 }}>
      <Title level={3} style={{ marginBottom: 16 }}>
        Danh sách người dùng
      </Title>
      <Input
        placeholder="Tìm theo username, email, họ tên..."
        prefix={<SearchOutlined />}
        style={{ marginBottom: 16, width: 300 }}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button icon={<ReloadOutlined />} onClick={fetchUsers} style={{ marginLeft: 8, marginBottom: 16 }}>
        Tải lại
      </Button>

      {loading ? (
        <Spin tip="Đang tải..." style={{ display: "block", margin: "50px auto" }} />
      ) : filteredUsers.length === 0 ? (
        <Empty description="Không có dữ liệu" />
      ) : (
        <Table
          dataSource={filteredUsers}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10, showSizeChanger: true }}
          scroll={{ x: 800 }}
        />
      )}
    </div>
  );
}

export default ListUserPage;