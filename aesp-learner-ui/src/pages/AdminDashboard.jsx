import React, { useEffect, useState } from "react";
import { Tabs, Table, Button, message, Spin, Popconfirm, Input, Typography, Badge, Tag } from "antd";
import { SearchOutlined, ReloadOutlined, CrownOutlined, UserOutlined } from "@ant-design/icons";
import API from "../services/api";

const { TabPane } = Tabs;
const { Title } = Typography;

function AdminDashboard() {
  // STATES
  const [mentors, setMentors] = useState([]);
  const [loadingMentor, setLoadingMentor] = useState(false);
  const [searchMentor, setSearchMentor] = useState("");

  const [users, setUsers] = useState([]);
  const [loadingUser, setLoadingUser] = useState(false);
  const [searchUser, setSearchUser] = useState("");

  // FETCH DATA
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
      message.error("Lỗi kết nối server!");
      console.error(err);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    fetchMentors();
    fetchUsers();
  }, []);

  // ACTIONS
  const handleDelete = async (id) => {
    try {
      const res = await API.delete(`/admin/delete-member?id=${id}`);
      if (res.data.code === 200) {
        message.success(res.data.message);
        fetchMentors();
        fetchUsers();
      } else {
        message.error(res.data.message);
      }
    } catch {
      message.error("Lỗi kết nối server!");
    }
  };

  const handleLock = async (id) => {
    try {
      const res = await API.get(`/admin/lock-member?id=${id}`);
      if (res.data.code === 200) {
        message.success(res.data.message);
        fetchMentors();
        fetchUsers();
      } else {
        message.error(res.data.message);
      }
    } catch {
      message.error("Lỗi kết nối server!");
    }
  };

  const handleUnlock = async (id) => {
    try {
      const res = await API.get(`/admin/unlock-member?id=${id}`);
      if (res.data.code === 200) {
        message.success(res.data.message);
        fetchMentors();
        fetchUsers();
      } else {
        message.error(res.data.message);
      }
    } catch {
      message.error("Lỗi kết nối server!");
    }
  };

  // FILTER DATA
  const filteredMentors = mentors.filter((m) =>
    [m.username, m.email, m.fullName || m.umsMentorData?.fullName]
      .some((field) => String(field || "").toLowerCase().includes(searchMentor.toLowerCase()))
  );

  const filteredUsers = users.filter((u) =>
    [u.username, u.email, u.fullName || u.umsUserData?.fullName]
      .some((field) => String(field || "").toLowerCase().includes(searchUser.toLowerCase()))
  );

  // TABLE COLUMNS
  const columns = [
    { title: "ID", dataIndex: "id", key: "id", width: 80 },
    { title: "Username", dataIndex: "username", key: "username" },
    {
      title: "Full Name",
      key: "fullName",
      render: (_, record) =>
        record.fullName || record.umsMentorData?.fullName || record.umsUserData?.fullName || "-",
    },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Roles",
      key: "roles",
      render: (_, record) =>
        (record.umsRoles || []).map((role) => (
          <Tag key={role.id} color={role.role === "ADMIN" ? "red" : role.role === "MENTOR" ? "blue" : "green"}>
            {role.role}
          </Tag>
        )),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Badge
          status={status === 1 ? "success" : "error"}
          text={status === 1 ? "Hoạt động" : "Bị khóa"}
        />
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
              <Button size="small">Mở khóa</Button>
            </Popconfirm>
          )}
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: 24, minHeight: "100vh", background: "linear-gradient(135deg, #f6f9fc, #e9ecef)" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: 32 }}>Admin Dashboard</Title>

      <Tabs defaultActiveKey="mentors" centered tabBarGutter={30}>
        {/* MENTORS TAB */}
        <TabPane tab={<span><CrownOutlined /> Mentors ({filteredMentors.length})</span>} key="mentors">
          <Input
            placeholder="Search by username, email, fullName..."
            prefix={<SearchOutlined />}
            style={{ marginBottom: 16, width: 300 }}
            onChange={(e) => setSearchMentor(e.target.value)}
          />
          <Button icon={<ReloadOutlined />} onClick={fetchMentors} style={{ marginLeft: 8, marginBottom: 16 }}>
            Reload
          </Button>

          {loadingMentor ? (
            <Spin tip="Đang tải..." style={{ display: "block", margin: "50px auto" }} />
          ) : (
            <Table
              dataSource={filteredMentors}
              columns={columns}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          )}
        </TabPane>

        {/* USERS TAB */}
        <TabPane tab={<span><UserOutlined /> Users ({filteredUsers.length})</span>} key="users">
          <Input
            placeholder="Search by username, email, fullName..."
            prefix={<SearchOutlined />}
            style={{ marginBottom: 16, width: 300 }}
            onChange={(e) => setSearchUser(e.target.value)}
          />
          <Button icon={<ReloadOutlined />} onClick={fetchUsers} style={{ marginLeft: 8, marginBottom: 16 }}>
            Reload
          </Button>

          {loadingUser ? (
            <Spin tip="Đang tải..." style={{ display: "block", margin: "50px auto" }} />
          ) : (
            <Table
              dataSource={filteredUsers}
              columns={columns}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          )}
        </TabPane>
      </Tabs>
    </div>
  );
}

export default AdminDashboard;
