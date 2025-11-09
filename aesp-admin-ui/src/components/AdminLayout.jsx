// src/components/AdminLayout.jsx
import React from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useLocation } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const location = useLocation();
  const selectedKey = location.pathname;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible>
        <div
          style={{
            color: "white",
            textAlign: "center",
            padding: 16,
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          AESP Admin
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]}>
          <Menu.Item key="/dashboard" icon={<DashboardOutlined />}>
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="/users" icon={<UserOutlined />}>
            <Link to="/users">Users</Link>
          </Menu.Item>
          <Menu.Item key="/packages" icon={<ShoppingOutlined />}>
            <Link to="/packages">Packages</Link>
          </Menu.Item>
          <Menu.Item key="/reports" icon={<BarChartOutlined />}>
            <Link to="/reports">Reports</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ background: "#fff", padding: "0 20px" }}>
          <h3>AESP Management</h3>
        </Header>
        <Content style={{ margin: "20px", background: "#fff", padding: "20px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
