import React, { useEffect, useState } from "react";
import { Card, Spin, message } from "antd";
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

  useEffect(() => { fetchInfo(); }, []);

  if (loading) return <Spin tip="Loading..." />;
  if (!info) return <div>Không có thông tin</div>;

  return (
    <Card title="Thông tin Admin">
      <p>ID: {info.id}</p>
      <p>Username: {info.username}</p>
      <p>Email: {info.email}</p>
      <p>Full Name: {info.fullName}</p>
    </Card>
  );
}

export default AdminInfoPage;
