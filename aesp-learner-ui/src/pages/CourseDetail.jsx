import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, List, Typography, Button, Spin, message } from "antd";

const { Title, Paragraph } = Typography;

const mockCourseData = {
  1: {
    title: "Tiếng Anh cơ bản",
    instructor: "Nguyễn Văn A",
    description:
      "Khóa học dành cho người mới bắt đầu, giúp bạn làm quen với từ vựng và ngữ pháp cơ bản trong tiếng Anh.",
    lessons: [
      { id: 1, title: "Giới thiệu bản thân", duration: "7 phút" },
      { id: 2, title: "Hỏi đường & chỉ dẫn", duration: "7 phút" },
      { id: 3, title: "Mua sắm và thanh toán", duration: "15 phút" },
    ],
    exercises: [
      { id: 1, title: "Nghe và điền từ", difficulty: "Dễ" },
      { id: 2, title: "Viết lại câu đúng ngữ pháp", difficulty: "Trung bình" },
    ],
  },
  2: {
    title: "Tiếng Anh giao tiếp",
    instructor: "Trần Thị B",
    description:
      "Khóa học giúp bạn tự tin giao tiếp tiếng Anh trong môi trường học tập và công việc.",
    lessons: [
      { id: 1, title: "Chào hỏi cơ bản", duration: "8 phút" },
      { id: 2, title: "Đặt câu với thì hiện tại đơn", duration: "14 phút" },
    ],
    exercises: [
      { id: 1, title: "Luyện phản xạ hội thoại", difficulty: "Khó" },
    ],
  },
  3: {
    title: "Khóa IELTS cơ bản",
    instructor: "Lê Minh C",
    description:
      "Tập trung xây dựng nền tảng vững chắc về 4 kỹ năng: nghe, nói, đọc, viết cho người học IELTS 0-5.0.",
    lessons: [
      { id: 1, title: "Phát âm chuẩn theo IPA", duration: "20 phút" },
      { id: 2, title: "Speaking Part 1 - Self Introduction", duration: "15 phút" },
    ],
    exercises: [
      { id: 1, title: "Bài Speaking Part 1", difficulty: "Trung bình" },
      { id: 2, title: "Viết bài Task 1: Line Graph", difficulty: "Khó" },
    ],
  },
};

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔹 Giả lập fetch dữ liệu khóa học
    setTimeout(() => {
      const data = mockCourseData[id];
      if (data) setCourse(data);
      else message.error("Không tìm thấy khóa học!");
      setLoading(false);
    }, 600);
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 100 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!course) return null;

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>{course.title}</Title>
      <Paragraph type="secondary">
        Giảng viên: <b>{course.instructor}</b>
      </Paragraph>
      <Paragraph>{course.description}</Paragraph>

      <Title level={4} style={{ marginTop: 24 }}>
         Danh sách bài học
      </Title>
      <List
        bordered
        dataSource={course.lessons}
        renderItem={(lesson) => (
          <List.Item>
            <div>
              <b>{lesson.title}</b> — <span>{lesson.duration}</span>
            </div>
            <Button
              type="primary"
              size="small"
              onClick={() => navigate("/practice")}
            >
               Luyện phát âm
            </Button>
          </List.Item>
        )}
      />

      <Title level={4} style={{ marginTop: 24 }}>
         Bài tập
      </Title>
      <List
        bordered
        dataSource={course.exercises}
        renderItem={(ex) => (
          <List.Item>
            <div>
              <b>{ex.title}</b> — Độ khó: <i>{ex.difficulty}</i>
            </div>
            <Button size="small" onClick={() => message.info("Tính năng đang phát triển!")}>
              Làm bài
            </Button>
          </List.Item>
        )}
      />
    </div>
  );
}

export default CourseDetail;

