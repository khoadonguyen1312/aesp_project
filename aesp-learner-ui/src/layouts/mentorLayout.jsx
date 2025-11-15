import React, { useState, useEffect } from "react";
import { Layout, Menu, Typography } from "antd";
import { UserOutlined, ReadOutlined, PlusOutlined } from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

function MentorLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Highlight menu dựa trên URL
  const path = location.pathname;
  const selectedMenu = path.includes("/mentor/courses")
    ? "courses"
    : path.includes("/mentor/create")
    ? "create"
    : "info";

  // Kiểm tra token nếu muốn redirect login khi 401
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/mentor/login");
    }
  }, [navigate]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div
          style={{
            height: 64,
            margin: 16,
            color: "#fff",
            fontSize: 18,
            textAlign: "center",
          }}
        >
          Mentor Panel
        </div>
        <Menu
          theme="dark"
          selectedKeys={[selectedMenu]}
          mode="inline"
          onSelect={({ key }) => {
            if (key === "info") navigate("/mentor/info");
            if (key === "courses") navigate("/mentor/courses");
            if (key === "create") navigate("/mentor/create");
          }}
        >
          <Menu.Item key="info" icon={<UserOutlined />}>
            Thông tin của tôi
          </Menu.Item>
          <Menu.Item key="courses" icon={<ReadOutlined />}>
            Khóa học của tôi
          </Menu.Item>
          <Menu.Item key="create" icon={<PlusOutlined />}>
            Tạo khóa học
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: "0 16px" }}>
          <Title level={3} style={{ margin: 0 }}>
            {selectedMenu === "info"
              ? "Thông tin của tôi"
              : selectedMenu === "courses"
              ? "Khóa học của tôi"
              : "Tạo khóa học"}
          </Title>
        </Header>
        <Content style={{ margin: 16 }}>
          {/* Render page con */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default MentorLayout;
