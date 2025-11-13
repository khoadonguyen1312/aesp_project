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

const menuItems = [
  {
    key: "/dashboard",
    icon: <HomeOutlined />,
    label: "Dashboard",
  },
  {
    key: "/learners",
    icon: <UserOutlined />,
    label: "Learners",
  },
  {
    key: "/packages",
    icon: <BookOutlined />,
    label: "Packages",
  },
  {
    key: "/progress",
    icon: <PieChartOutlined />,
    label: "Progress",
  },
  {
    key: "/challenges",
    icon: <TrophyOutlined />,
    label: "Challenges",
  },
];

const SidebarMenu = () => {
  const location = useLocation();

  const items = menuItems.map(({ key, icon, label }) => ({
    key,
    icon,
    label: <Link to={key}>{label}</Link>,
  }));

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[location.pathname]}
      items={items}
    />
  );
};

export default SidebarMenu;
