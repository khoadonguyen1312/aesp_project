import React, { useEffect, useState } from "react";
import { Card, Row, Col, Spin, Empty, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const mockCourses = [
  {
    id: 1,
    title: "Tiếng Anh cơ bản",
    instructor: "Nguyễn Văn A",
    progress: 75,
    thumbnail: "https://img.freepik.com/free-vector/react-logo_1017-3913.jpg",
  },
  {
    id: 2,
    title: "Tiếng Anh giao tiếp",
    instructor: "Trần Thị B",
    progress: 40,
    thumbnail: "https://cdn.worldvectorlogo.com/logos/java-4.svg",
  },
  {
    id: 3,
    title: "Khóa IELTS cơ bản",
    instructor: "Lê Minh C",
    progress: 100,
    thumbnail: "https://cdn-icons-png.flaticon.com/512/2772/2772128.png",
  },
];

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // 🔹 Giả lập gọi API (fetch)
    setTimeout(() => {
      setCourses(mockCourses);
      setLoading(false);
    }, 800);
  }, []);

  const handleCourseClick = (id) => {
    navigate(`/course/${id}`);
  };

  return (
    <div style={{ padding: "24px" }}>
      <Title level={3}>📚 Khóa học của tôi</Title>

      {loading ? (
        <div style={{ textAlign: "center", marginTop: 100 }}>
          <Spin size="large" />
        </div>
      ) : courses.length === 0 ? (
        <Empty description="Bạn chưa đăng ký khóa học nào" />
      ) : (
        <Row gutter={[24, 24]}>
          {courses.map((course) => (
            <Col xs={24} sm={12} md={8} key={course.id}>
              <Card
                hoverable
                onClick={() => handleCourseClick(course.id)}
                style={{
                  borderRadius: 12,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  transition: "all 0.3s",
                  cursor: "pointer",
                }}
                cover={
                  <img
                    alt={course.title}
                    src={course.thumbnail}
                    style={{
                      height: 180,
                      objectFit: "cover",
                      borderRadius: "12px 12px 0 0",
                    }}
                  />
                }
              >
                <Card.Meta
                  title={<b>{course.title}</b>}
                  description={`Giảng viên: ${course.instructor}`}
                />
                <div style={{ marginTop: 12 }}>
                  <div style={{ fontWeight: "bold" }}>Tiến độ: {course.progress}%</div>
                  <div
                    style={{
                      height: 8,
                      borderRadius: 4,
                      background: "#f0f0f0",
                      marginTop: 4,
                    }}
                  >
                    <div
                      style={{
                        width: `${course.progress}%`,
                        height: "100%",
                        borderRadius: 4,
                        background:
                          course.progress === 100 ? "#52c41a" : "#1890ff",
                        transition: "width 0.4s ease-in-out",
                      }}
                    />
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default MyCourses;

