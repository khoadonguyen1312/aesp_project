import React, { useEffect, useState } from "react";
import { Card, Spin, message, Row, Col, Tag, Divider } from "antd";
import axios from "axios";

function AdminInfoPage() {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8080/admin/info?id=1", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.code === 200) setInfo(res.data.data);
      else message.error(res.data.message);
    } catch (err) {
      message.error("Lỗi kết nối server!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  if (loading)
    return (
      <Spin
        tip="Loading..."
        size="large"
        style={{ display: "block", margin: "100px auto" }}
      />
    );
  if (!info) return <div>Không có thông tin</div>;

  return (
    <Card
      title="Thông tin Admin"
      style={{
        maxWidth: 800,
        margin: "40px auto",
        borderRadius: 10,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <Row gutter={[16, 16]}>
        {/* Thông tin cá nhân */}
        <Col span={12}>
          <Card type="inner" title="Thông tin cá nhân" bordered={false}>
            <p>
              <b>ID:</b> {info.id}
            </p>
            <p>
              <b>Username:</b> {info.username}
            </p>
            <p>
              <b>Email:</b> {info.email}
            </p>
            <p>
              <b>Password:</b> {info.password}
            </p>
            <p>
              <b>Status:</b>{" "}
              {info.status === 1 ? (
                <Tag color="green">Active</Tag>
              ) : (
                <Tag color="red">Inactive</Tag>
              )}
            </p>
            <p>
              <b>Create At:</b>{" "}
              {new Date(info.create_at).toLocaleString()}
            </p>
            <p>
              <b>Last Login:</b>{" "}
              {new Date(info.login_time).toLocaleString()}
            </p>
          </Card>
        </Col>

        {/* Roles */}
        <Col span={12}>
          <Card type="inner" title="Roles" bordered={false}>
            {info.umsRoles && info.umsRoles.length > 0 ? (
              info.umsRoles.map((role) => (
                <Tag
                  key={role.id}
                  color={role.role === "ADMIN" ? "red" : role.role === "MENTOR" ? "blue" : "green"}
                  style={{ marginBottom: 8 }}
                >
                  {role.role}
                </Tag>
              ))
            ) : (
              <p>Không có role</p>
            )}
          </Card>
        </Col>
      </Row>

      <Divider />
      <p style={{ textAlign: "center", color: "#999" }}>
        Dashboard Admin Info
      </p>
    </Card>
  );
}

export default AdminInfoPage;
