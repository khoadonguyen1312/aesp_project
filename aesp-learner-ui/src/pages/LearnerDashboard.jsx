// src/pages/LearnerDashboard.jsx
import React, { useState, useEffect } from "react";
import {
  Layout,
  Card,
  Typography,
  Space,
  Tag,
  Button,
  Spin,
  message,
  Avatar,
  Dropdown,
  Badge,
  Empty,
} from "antd";
import {
  BookOutlined,
  ShoppingCartOutlined,
  FireOutlined,
  UserOutlined,
  BellOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import SidebarMenu from "../components/SidebarMenu";
import { getCourses } from "../api/courseApi";

const { Title, Text } = Typography;
const { Header, Content, Sider } = Layout;

export default function LearnerDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [myCourses, setMyCourses] = useState([]); // Đọc từ localStorage
  const [availableCourses, setAvailableCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // === LOAD KHÓA HỌC CỦA TÔI TỪ localStorage ===
  const loadMyCourses = () => {
    const saved = localStorage.getItem("myCourses");
    if (saved) {
      setMyCourses(JSON.parse(saved));
    } else {
      // Dữ liệu mẫu mặc định (nếu chưa có)
      const defaultCourses = [
        { id: 1, title: "English Grammar Basics", progress: 75, instructor: "John Smith" },
        { id: 2, title: "Business English", progress: 40, instructor: "Sarah Johnson" },
      ];
      setMyCourses(defaultCourses);
      localStorage.setItem("myCourses", JSON.stringify(defaultCourses));
    }
  };

  // === LOAD KHÓA HỌC MỞ BÁN TỪ API ===
  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      try {
        const data = await getCourses();
        setAvailableCourses(data);
      } catch (err) {
        message.error("Lỗi tải khóa học – đang hiển thị dữ liệu mẫu");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, []);

  // === LOAD MY COURSES KHI VÀO TRANG ===
  useEffect(() => {
    loadMyCourses();
  }, []);

  // === THEO DÕI THAY ĐỔI localStorage (khi mua ở tab khác) ===
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "myCourses") {
        loadMyCourses();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // === XEM CHI TIẾT KHÓA HỌC ===
  const handleOpenCourse = (id) => {
    navigate(`/learner/courses/${id}`);
  };

  // === ĐĂNG XUẤT ===
  const handleLogout = () => {
    localStorage.clear();
    message.success("Đăng xuất thành công");
    navigate("/login");
  };

  // === MENU USER ===
  const menuItems = [
    { key: "profile", icon: <UserOutlined />, label: "Hồ sơ cá nhân" },
    { key: "settings", icon: <SettingOutlined />, label: "Cài đặt" },
    { type: "divider" },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      onClick: handleLogout,
      danger: true,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* === SIDEBAR === */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={220}
        style={{
          position: "fixed",
          height: "100vh",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 10,
          boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
        }}
      >
        <SidebarMenu />
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 220, transition: "margin 0.2s" }}>
        {/* === HEADER === */}
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            padding: "0 24px",
            background: "#fff",
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Space size={20}>
            <Badge count={3} size="small">
              <Button shape="circle" icon={<BellOutlined />} size="large" />
            </Badge>
            <Dropdown menu={{ items: menuItems }} trigger={["click"]} placement="bottomRight">
              <Space style={{ cursor: "pointer" }}>
                <Avatar icon={<UserOutlined />} size="default" />
                <div style={{ lineHeight: 1.2 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>Học viên</div>
                  <Text type="secondary" style={{ fontSize: 12 }}>Online</Text>
                </div>
              </Space>
            </Dropdown>
          </Space>
        </Header>

        {/* === NỘI DUNG CHÍNH === */}
        <Content style={{ padding: "24px", background: "#f4f6f9", minHeight: "calc(100vh - 64px)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>

            {/* === KHÓA HỌC CỦA TÔI === */}
            <section style={{ marginBottom: 48 }}>
              <Title level={3} style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
                <BookOutlined style={{ marginRight: 8, color: "#1890ff" }} />
                Khóa học của tôi
              </Title>

              {myCourses.length === 0 ? (
                <Empty description="Bạn chưa đăng ký khóa học nào" style={{ margin: "40px 0" }} />
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: 20,
                  }}
                >
                  {myCourses.map((c) => (
                    <Card
                      key={c.id}
                      hoverable
                      onClick={() => handleOpenCourse(c.id)}
                      style={{ borderRadius: 12, cursor: "pointer" }}
                    >
                      <Space direction="vertical" size={12} style={{ width: "100%" }}>
                        <Title level={5} style={{ margin: 0, fontSize: 16 }}>
                          {c.title}
                        </Title>
                        <Text type="secondary" style={{ fontSize: 13 }}>
                          {c.instructor}
                        </Text>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Text strong>{c.progress}% hoàn thành</Text>
                          <Tag color={c.progress === 100 ? "success" : "processing"}>
                            {c.progress === 100 ? "Hoàn thành" : "Đang học"}
                          </Tag>
                        </div>
                      </Space>
                    </Card>
                  ))}
                </div>
              )}
            </section>

            {/* === KHÓA HỌC ĐANG MỞ BÁN === */}
            <section>
              <Title level={3} style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
                <ShoppingCartOutlined style={{ marginRight: 8, color: "#52c41a" }} />
                Khóa học đang mở bán
              </Title>

              {loading ? (
                <div style={{ textAlign: "center", padding: "60px 0" }}>
                  <Spin size="large" tip="Đang tải khóa học..." />
                </div>
              ) : availableCourses.length === 0 ? (
                <Empty description="Chưa có khóa học nào đang mở bán" style={{ margin: "40px 0" }} />
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: 24,
                  }}
                >
                  {availableCourses
                    .filter((course) => !myCourses.some((c) => c.id === course.id)) // Ẩn khóa đã mua
                    .map((course) => (
                      <Card
                        key={course.id}
                        hoverable
                        onClick={() => handleOpenCourse(course.id)}
                        style={{
                          borderRadius: 12,
                          position: "relative",
                          overflow: "hidden",
                          transition: "transform 0.2s, box-shadow 0.2s",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                      >
                        {/* Badge Hot / Mới */}
                        <div style={{ position: "absolute", top: 8, left: 8, zIndex: 1 }}>
                          {course.isHot && (
                            <Tag color="red" style={{ marginBottom: 4 }}>
                              <FireOutlined /> Hot
                            </Tag>
                          )}
                          {course.isNew && <Tag color="green">Mới</Tag>}
                        </div>

                        {/* Thumbnail */}
                        <div
                          style={{
                            height: 160,
                            background: course.thumbnailUrl
                              ? `url(${course.thumbnailUrl}) center/cover no-repeat`
                              : course.thumbnail
                              ? `url(${course.thumbnail}) center/cover no-repeat`
                              : "#e0e0e0",
                            borderRadius: "8px 8px 0 0",
                            backgroundColor: "#f5f5f5",
                          }}
                        />

                        {/* Nội dung */}
                        <div style={{ padding: 16 }}>
                          <Title level={5} style={{ margin: "0 0 8px 0", fontSize: 16, lineHeight: 1.4 }}>
                            {course.title}
                          </Title>
                          <Text type="secondary" style={{ fontSize: 13, display: "block", marginBottom: 12 }}>
                            {course.instructor || "Giảng viên AESP"}
                          </Text>

                          {/* Giá + Nút mua */}
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                              {course.originalPrice && course.originalPrice > course.price && (
                                <Text delete type="secondary" style={{ marginRight: 8, fontSize: 13 }}>
                                  {course.originalPrice.toLocaleString("vi-VN")}đ
                                </Text>
                              )}
                              <Text strong style={{ fontSize: 18, color: "#f5222d" }}>
                                {course.price.toLocaleString("vi-VN")}đ
                              </Text>
                            </div>

                            <Button
                              type="primary"
                              danger
                              size="middle"
                              style={{ borderRadius: 6 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate("/learner/payment", { state: { course } });
                              }}
                            >
                              Mua ngay
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              )}
            </section>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}