import React from "react";
import { Menu } from "antd";
import { DashboardOutlined, UserOutlined, BarChartOutlined, SettingOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  return (
    <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
      <Menu.Item key="/dashboard" icon={<DashboardOutlined />}>
        <Link to="/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="/users" icon={<UserOutlined />}>
        <Link to="/users">Users</Link>
      </Menu.Item>
      <Menu.Item key="/reports" icon={<BarChartOutlined />}>
        <Link to="/reports">Reports</Link>
      </Menu.Item>
      <Menu.Item key="/settings" icon={<SettingOutlined />}>
        <Link to="/settings">Settings</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Sidebar;
