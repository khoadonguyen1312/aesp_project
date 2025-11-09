// src/components/SidebarMenu.jsx
import React from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  BookOutlined,
  PieChartOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

export default function SidebarMenu() {
  const location = useLocation();
  const selectedKey = location.pathname;

  return (
    <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]}>
      <Menu.Item key="/dashboard" icon={<HomeOutlined />}>
        <Link to="/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="/learners" icon={<UserOutlined />}>
        <Link to="/learners">Learners</Link>
      </Menu.Item>
      <Menu.Item key="/packages" icon={<BookOutlined />}>
        <Link to="/packages">Packages</Link>
      </Menu.Item>
      <Menu.Item key="/progress" icon={<PieChartOutlined />}>
        <Link to="/progress">Progress</Link>
      </Menu.Item>
      <Menu.Item key="/challenges" icon={<TrophyOutlined />}>
        <Link to="/challenges">Challenges</Link>
      </Menu.Item>
    </Menu>
  );
}
