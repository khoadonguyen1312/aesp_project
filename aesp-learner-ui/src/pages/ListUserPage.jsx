// src/pages/ListUserPage.jsx
import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  message,
  Popconfirm,
  Input,
  Space,
  Spin,
  Tag,
  Empty,
  Typography,
} from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import API from "../services/api";

const { Title } = Typography;

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
        message.error(res.data.message || "Không thể tải danh sách");
      }
    } catch (err) {
      message.error("Lỗi kết nối server");
      console.error(err);
      // Dữ liệu giả nếu lỗi
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

  const filteredUsers = users.filter(
    (u) =>
      u.username?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.fullName?.toLowerCase().includes(search.toLowerCase())
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
      width: 100,
      render: (status) => (
        <Tag color={status === 1 ? "green" : "red"}>
          {status === 1 ? "Hoạt động" : "Đã khóa"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      width: 180,
      render: (_, record) => (
        <Space>
          {record.status === 1 ? (
            <Popconfirm title="Khóa tài khoản?" onConfirm={() => handleLock(record.id)}>
              <Button size="small" type="primary">Khóa</Button>
            </Popconfirm>
          ) : (
            <Popconfirm title="Mở khóa?" onConfirm={() => handleUnlock(record.id)}>
              <Button size="small">Mở khóa</Button>
            </Popconfirm>
          )}
          <Popconfirm title="Xóa vĩnh viễn?" onConfirm={() => handleDelete(record.id)}>
            <Button size="small" danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Danh sách người dùng</Title>

      <div style={{ marginBottom: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Input
          placeholder="Tìm kiếm (username, email, họ tên)"
          prefix={<SearchOutlined />}
          style={{ width: 300 }}
          onChange={(e) => setSearch(e.target.value)}
          allowClear
        />
        <Button icon={<ReloadOutlined />} onClick={fetchUsers}>
          Tải lại
        </Button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 40 }}>
          <Spin tip="Đang tải..." />
        </div>
      ) : filteredUsers.length === 0 ? (
        <Empty description="Không tìm thấy người dùng" />
      ) : (
        <Table
          dataSource={filteredUsers}
          columns={columns}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
          scroll={{ x: 800 }}
        />
      )}
    </div>
  );
}

export default ListUserPage;