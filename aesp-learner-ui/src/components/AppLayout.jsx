// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { Table, Button, message, Spin, Tabs, Popconfirm } from "antd";
import axios from "axios";

const { TabPane } = Tabs;

function AdminDashboard() {
  const [mentors, setMentors] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingMentors, setLoadingMentors] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const token = localStorage.getItem("token");

  const fetchMentors = async () => {
    setLoadingMentors(true);
    try {
      const res = await axios.get(
        "http://192.168.1.112:8080/admin/list-mentor?page=0&size=50",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.code === 200 && res.data.data) {
        const content = Array.isArray(res.data.data.content)
          ? res.data.data.content
          : [];
        setMentors(content);
      } else {
        message.error(res.data.message || "Không lấy được danh sách mentor");
      }
    } catch (err) {
      message.error("Lỗi kết nối server!");
      console.error(err);
    } finally {
      setLoadingMentors(false);
    }
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await axios.get(
        "http://192.168.1.112:8080/admin/list-user?page=0&size=50",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.code === 200 && res.data.data) {
        const content = Array.isArray(res.data.data.content)
          ? res.data.data.content
          : [];
        setUsers(content);
      } else {
        message.error(res.data.message || "Không lấy được danh sách user");
      }
    } catch (err) {
      message.error("Lỗi kết nối server!");
      console.error(err);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchMentors();
    fetchUsers();
  }, []);

  // Các action
  const deleteAccount = async (id) => {
    try {
      const res = await axios.delete(
        `http://192.168.1.112:8080/admin/delete-member?id=${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.code === 200) {
        message.success(res.data.data || "Xóa thành công");
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

  const lockAccount = async (id) => {
    try {
      const res = await axios.get(
        `http://192.168.1.112:8080/admin/lock-member?id=${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.code === 200) {
        message.success(res.data.data || "Khóa tài khoản thành công");
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

  const unlockAccount = async (id) => {
    try {
      const res = await axios.get(
        `http://192.168.1.112:8080/admin/unlock-member?id=${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.code === 200) {
        message.success(res.data.data || "Mở khóa thành công");
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

  const renderActions = (record) => (
    <>
      <Popconfirm
        title="Bạn có chắc muốn xóa tài khoản này?"
        onConfirm={() => deleteAccount(record.id)}
      >
        <Button danger style={{ marginRight: 8 }}>
          Xóa
        </Button>
      </Popconfirm>
      {record.status === 1 ? (
        <Button type="default" onClick={() => lockAccount(record.id)}>
          Khóa
        </Button>
      ) : (
        <Button type="primary" onClick={() => unlockAccount(record.id)}>
          Mở khóa
        </Button>
      )}
    </>
  );

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Tên đầy đủ", dataIndex: "username", key: "username" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (status === 1 ? "Đang hoạt động" : "Đã khóa"),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => renderActions(record),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Tabs defaultActiveKey="mentors">
        <TabPane tab="Danh sách Mentor" key="mentors">
          {loadingMentors ? (
            <div style={{ textAlign: "center", marginTop: 50 }}>
              <Spin size="large" />
            </div>
          ) : (
            <Table
              dataSource={Array.isArray(mentors) ? mentors : []}
              columns={columns}
              rowKey="id"
            />
          )}
        </TabPane>
        <TabPane tab="Danh sách User" key="users">
          {loadingUsers ? (
            <div style={{ textAlign: "center", marginTop: 50 }}>
              <Spin size="large" />
            </div>
          ) : (
            <Table
              dataSource={Array.isArray(users) ? users : []}
              columns={columns}
              rowKey="id"
            />
          )}
        </TabPane>
      </Tabs>
    </div>
  );
}

export default AdminDashboard;




