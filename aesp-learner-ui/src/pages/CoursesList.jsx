import React, { useEffect, useState } from "react";
import { Card, Row, Col, Spin, Empty, Button, message } from "antd";
import { getCourses } from "../api/courseApi";

function CoursesList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        message.error(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleBuy = (course) => {
    message.success(`Mua khóa học "${course.title}" thành công! (Demo)`);
  };

  return (
    <div style={{ padding: 24 }}>
      <h2> Các khóa học hiện có</h2>

      {loading ? (
        <div style={{ textAlign: "center", marginTop: 100 }}>
          <Spin size="large" />
        </div>
      ) : courses.length === 0 ? (
        <Empty description="Chưa có khóa học nào" />
      ) : (
        <Row gutter={[24, 24]}>
          {courses.map((course) => (
            <Col xs={24} sm={12} md={8} key={course.id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={course.title}
                    src={course.thumbnailUrl}
                    style={{
                      height: 180,
                      objectFit: "cover",
                      borderRadius: "8px 8px 0 0",
                    }}
                  />
                }
              >
                <Card.Meta
                  title={course.title}
                  description={course.description}
                />
                <div style={{ marginTop: 12 }}>
                  <b> Giá:</b> {course.price?.toLocaleString()} VND
                </div>
                <Button
                  type="primary"
                  block
                  style={{ marginTop: 12 }}
                  onClick={() => handleBuy(course)}
                >
                  Mua ngay
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default CoursesList;
