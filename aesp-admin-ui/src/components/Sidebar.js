import { Menu } from "antd";
import { DashboardOutlined, UserOutlined, BarChartOutlined, SettingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const items = [
    { key: "1", icon: <DashboardOutlined />, label: <Link to="/">Dashboard</Link> },
    { key: "2", icon: <UserOutlined />, label: <Link to="/users">Users</Link> },
    { key: "3", icon: <BarChartOutlined />, label: <Link to="/reports">Reports</Link> },
    { key: "4", icon: <SettingOutlined />, label: <Link to="/settings">Settings</Link> },
  ];
  return <Menu theme="dark" mode="inline" items={items} />;
}
