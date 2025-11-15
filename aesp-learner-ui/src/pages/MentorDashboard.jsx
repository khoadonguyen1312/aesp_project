import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  message,
  Spin,
  Popconfirm,
  Input,
  Typography,
  Modal,
  Form,
  Space,
  Card,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import API from "../services/api";

const { Title } = Typography;

function MentorDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchCourse, setSearchCourse] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [form] = Form.useForm();

  const [thumbBase64, setThumbBase64] = useState("");

  /** Convert File to Base64 */
  const convertToBase64 = (file, cb) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(",")[1];
      // Loại bỏ các ký tự không hợp lệ (whitespace, newlines)
      const cleanBase64 = base64.replace(/\s/g, '');
      cb(cleanBase64);
    };
    reader.onerror = () => {
      message.error("Lỗi khi đọc file!");
      cb(null);
    };
    reader.readAsDataURL(file);
  };

  // Fetch courses - API: GET /mentor/course/list
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await API.get("/mentor/list-course");
      if (res.data.code === 200) {
        console.log("=== Fetch Courses ===");
        console.log(res.data);
        setCourses(res.data.data || []);
      } else {
        message.error(res.data.message || "Không thể tải danh sách khóa học!");
      }
    } catch (err) {
      message.error("Không thể kết nối đến server!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  /** Add lesson */
  const handleAddLesson = () => {
    const leasons = form.getFieldValue("leasons") || [];
    form.setFieldsValue({
      leasons: [
        ...leasons,
        { 
          orderIndex: leasons.length + 1, 
          title: "", 
          description: "", 
          video: "", 
          pdf: "",
          vocabularies: [] 
        },
      ],
    });
  };

  /** Remove lesson */
  const handleRemoveLesson = (index) => {
    const leasons = form.getFieldValue("leasons") || [];
    leasons.splice(index, 1);
    leasons.forEach((l, i) => (l.orderIndex = i + 1));
    form.setFieldsValue({ leasons: [...leasons] });
  };

  /** Save Course */
  const handleSaveCourse = async (values) => {
    // Validate và làm sạch Base64
    const cleanBase64 = (str) => {
      if (!str || str === '' || str === 'null' || str === 'undefined') {
        return null;
      }
      
      // Loại bỏ data URL prefix nếu có (data:image/jpeg;base64,)
      let cleaned = str;
      if (cleaned.includes(',')) {
        cleaned = cleaned.split(',')[1];
      }
      
      // Loại bỏ tất cả whitespace, newlines, carriage returns
      cleaned = cleaned.replace(/[\s\r\n]/g, '').trim();
      
      // Kiểm tra xem có phải Base64 hợp lệ không
      const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
      if (!base64Regex.test(cleaned)) {
        console.error("Invalid Base64 string detected:", cleaned.substring(0, 50));
        return null;
      }
      
      return cleaned;
    };

    // Chỉ gửi thumb nếu có thay đổi (thumbBase64 được set từ file upload mới)
    // Nếu đang edit và không upload file mới, không gửi thumb
    const shouldSendThumb = thumbBase64 && thumbBase64.length > 0;
    
    const payload = {
      name: values.name,
      courseContent: values.courseContent,
      requiredForLearning: values.requiredForLearning,
      description: values.description,
      ...(shouldSendThumb && { thumb: cleanBase64(thumbBase64) }),
      leasons: (values.leasons || []).map((lesson, idx) => {
        const cleanedLesson = {
          orderIndex: idx + 1,
          title: lesson.title,
          description: lesson.description || "",
          vocabularies: lesson.vocabularies || []
        };
        
        // Chỉ thêm video nếu có giá trị mới (được upload)
        if (lesson.video && typeof lesson.video === 'string' && lesson.video.length > 0) {
          const cleanedVideo = cleanBase64(lesson.video);
          if (cleanedVideo) {
            cleanedLesson.video = cleanedVideo;
          }
        }
        
        // Chỉ thêm pdf nếu có giá trị mới (được upload)
        if (lesson.pdf && typeof lesson.pdf === 'string' && lesson.pdf.length > 0) {
          const cleanedPdf = cleanBase64(lesson.pdf);
          if (cleanedPdf) {
            cleanedLesson.pdf = cleanedPdf;
          }
        }
        
        return cleanedLesson;
      })
    };

    console.log("=== Payload Debug ===");
    console.log("Thumb length:", payload.thumb ? payload.thumb.length : "null");
    payload.leasons.forEach((l, i) => {
      console.log(`Lesson ${i} - Video:`, l.video ? l.video.length : "null");
      console.log(`Lesson ${i} - PDF:`, l.pdf ? l.pdf.length : "null");
    });

    try {
      let res;
      if (editingCourse) {
        // Debug: Kiểm tra ID trước khi gọi API
        console.log("=== Update Debug ===");
        console.log("editingCourse:", editingCourse);
        console.log("editingCourse.id:", editingCourse?.id);
        
        if (!editingCourse.id) {
          message.error("Không tìm thấy ID khóa học để cập nhật!");
          return;
        }
        
        const loadingMsg = message.loading("Đang cập nhật khóa học...", 0);
        res = await API.post(`/mentor/course/update?id=${editingCourse.id}`, payload);
        loadingMsg();
      } else {
        const loadingMsg = message.loading("Đang tạo khóa học...", 0);
        res = await API.post("/mentor/course/create", payload);
        loadingMsg();
      }

      if (res.data.code === 200) {
        message.success(editingCourse ? "Cập nhật khóa học thành công!" : "Tạo khóa học thành công!");
        fetchCourses();
        form.resetFields();
        setThumbBase64("");
        setEditingCourse(null);
        setModalVisible(false);
      } else {
        message.error(res.data.message || "Thao tác thất bại!");
      }
    } catch (err) {
      message.error("Lỗi server: " + (err.response?.data?.message || err.message));
      console.error("Full error:", err);
    }
  };

  /** Delete course */
  const handleDelete = async (id) => {
    try {
      // API: DELETE /mentor/course/delete?id={id}
      const res = await API.delete(`/mentor/course/delete?id=${id}`);
      if (res.data.code === 200) {
        message.success("Xóa thành công!");
        fetchCourses();
      } else {
        message.error(res.data.message || "Xóa thất bại!");
      }
    } catch (err) {
      message.error("Lỗi server!");
      console.error(err);
    }
  };

  /** View course details */
  const handleViewCourse = async (id) => {
    try {
      // API: GET /mentor/course/info?id={id}
      const res = await API.get(`/mentor/course/info?id=${id}`);
      if (res.data.code === 200) {
        const courseData = res.data.data;
        
        // Debug: Kiểm tra dữ liệu nhận được
        console.log("=== Course Data Debug ===");
        console.log("Full courseData:", courseData);
        console.log("Course ID:", courseData.id);
        
        // Đảm bảo lưu đầy đủ thông tin course bao gồm ID
        setEditingCourse({
          id: courseData.id || id, // Fallback về id từ parameter nếu không có
          ...courseData
        });
        
        // QUAN TRỌNG: Đặt thumbBase64 rỗng để không gửi lại Base64 cũ
        // Chỉ set khi user upload file mới
        setThumbBase64("");
        
        form.setFieldsValue({
          name: courseData.name,
          courseContent: courseData.courseContent,
          requiredForLearning: courseData.requiredForLearning,
          description: courseData.description,
          leasons: (courseData.leasons || []).map(lesson => ({
            orderIndex: lesson.orderIndex,
            title: lesson.title,
            description: lesson.description,
            vocabularies: lesson.vocabularies || [],
            // KHÔNG set video/pdf từ server vào form để tránh gửi lại Base64 cũ
            video: "",
            pdf: ""
          }))
        });
        setModalVisible(true);
      } else {
        message.error(res.data.message || "Không thể tải thông tin khóa học!");
      }
    } catch (err) {
      message.error("Lỗi server!");
      console.error(err);
    }
  };

  const columns = [
    { 
      title: "ID", 
      dataIndex: "id", 
      width: 70,
      sorter: (a, b) => a.id - b.id,
    },
    { 
      title: "Ảnh", 
      dataIndex: "thumb",
      width: 100,
      render: (thumb) => (
        thumb ? (
          <img 
            src={`data:image/jpeg;base64,${thumb}`}
            alt="Course thumbnail"
            style={{ 
              width: 60, 
              height: 60, 
              objectFit: "cover", 
              borderRadius: 4 
            }}
          />
        ) : (
          <div style={{ 
            width: 60, 
            height: 60, 
            background: "#f0f0f0", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            borderRadius: 4,
            color: "#999"
          }}>
            No Image
          </div>
        )
      )
    },
    { 
      title: "Tên khóa học", 
      dataIndex: "name",
      ellipsis: true,
    },
    { 
      title: "Nội dung", 
      dataIndex: "courseContent",
      ellipsis: true,
      width: 200,
    },
    { 
      title: "Số bài học", 
      dataIndex: "leasons",
      width: 100,
      render: (leasons) => (
        <span>{leasons ? leasons.length : 0} bài</span>
      )
    },
    { 
      title: "Giá", 
      dataIndex: "price",
      width: 120,
      render: (price) => (
        price ? `${price.toLocaleString()} VNĐ` : "Miễn phí"
      )
    },
    {
      title: "Thao tác",
      width: 180,
      render: (_, record) => (
        <Space>
          <Button 
            type="primary"
            size="small"
            onClick={() => handleViewCourse(record.id)}
          >
            Xem/Sửa
          </Button>
          <Popconfirm 
            title="Bạn có chắc muốn xóa khóa học này?" 
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button danger size="small" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const filteredCourses = courses.filter((c) =>
    [c.name, c.description, c.courseContent].some((f) =>
      String(f || "").toLowerCase().includes(searchCourse.toLowerCase())
    )
  );

  return (
    <div style={{ padding: 24, minHeight: "100vh", background: "#f6f9fc" }}>
      <Title level={2} style={{ textAlign: "center" }}>Quản lý khóa học - Mentor</Title>

      <Space style={{ marginBottom: 16 }}>
        <Input 
          placeholder="Tìm kiếm khóa học..." 
          onChange={(e) => setSearchCourse(e.target.value)} 
          style={{ width: 250 }} 
        />
        <Button onClick={fetchCourses}>Tải lại</Button>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => {
            form.resetFields();
            setThumbBase64("");
            setEditingCourse(null);
            setModalVisible(true);
          }}
        >
          Tạo khóa học mới
        </Button>
      </Space>

      {loading ? (
        <div style={{ textAlign: "center", marginTop: 50 }}>
          <Spin size="large" tip="Đang tải danh sách khóa học..." />
        </div>
      ) : (
        <>
          {courses.length === 0 ? (
            <div style={{ 
              textAlign: "center", 
              padding: "60px 20px", 
              background: "white",
              borderRadius: 8,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}>
              <p style={{ fontSize: 16, color: "#999", marginBottom: 16 }}>
                Chưa có khóa học nào
              </p>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => {
                  form.resetFields();
                  setThumbBase64("");
                  setEditingCourse(null);
                  setModalVisible(true);
                }}
              >
                Tạo khóa học đầu tiên
              </Button>
            </div>
          ) : (
            <Table 
              columns={columns} 
              dataSource={filteredCourses} 
              rowKey="id"
              pagination={{ 
                pageSize: 10,
                showTotal: (total) => `Tổng ${total} khóa học`,
                showSizeChanger: true,
                pageSizeOptions: ['10', '20', '50']
              }}
              bordered
              style={{ background: "white", borderRadius: 8 }}
            />
          )}
        </>
      )}

      <Modal
        width={900}
        title={editingCourse ? "Chỉnh sửa khóa học" : "Tạo khóa học mới"}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingCourse(null);
          form.resetFields();
          setThumbBase64("");
        }}
        onOk={() => form.submit()}
        okText={editingCourse ? "Cập nhật" : "Tạo"}
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical" onFinish={handleSaveCourse}>
          <Form.Item 
            name="name" 
            label="Tên khóa học" 
            rules={[{ required: true, message: "Vui lòng nhập tên khóa học!" }]}
          >
            <Input placeholder="VD: Tiếng Anh giao tiếp cơ bản" />
          </Form.Item>

          <Form.Item label="Thumbnail (Ảnh đại diện)">
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => {
                if (e.target.files[0]) {
                  convertToBase64(e.target.files[0], setThumbBase64);
                }
              }} 
            />
            {/* Hiển thị preview từ Base64 mới upload */}
            {thumbBase64 && (
              <div style={{ marginTop: 8 }}>
                <img 
                  src={`data:image/jpeg;base64,${thumbBase64}`} 
                  alt="Preview" 
                  style={{ maxWidth: 200, maxHeight: 200, objectFit: "cover" }}
                />
              </div>
            )}
            {/* Hiển thị ảnh cũ nếu đang edit và chưa upload mới */}
            {!thumbBase64 && editingCourse?.thumb && (
              <div style={{ marginTop: 8 }}>
                <p style={{ fontSize: 12, color: "#666" }}>Ảnh hiện tại:</p>
                <img 
                  src={`data:image/jpeg;base64,${editingCourse.thumb}`} 
                  alt="Current thumbnail" 
                  style={{ maxWidth: 200, maxHeight: 200, objectFit: "cover" }}
                />
                <p style={{ fontSize: 12, color: "#999", marginTop: 4 }}>
                  (Chọn file mới để thay đổi)
                </p>
              </div>
            )}
          </Form.Item>

          <Form.Item 
            name="courseContent" 
            label="Nội dung khóa học" 
            rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
          >
            <Input.TextArea rows={3} placeholder="Mô tả tổng quan về nội dung khóa học..." />
          </Form.Item>

          <Form.Item name="requiredForLearning" label="Yêu cầu đầu vào">
            <Input.TextArea rows={2} placeholder="VD: Biết chữ cái, có kiến thức cơ bản..." />
          </Form.Item>

          <Form.Item 
            name="description" 
            label="Mô tả chi tiết" 
            rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
          >
            <Input.TextArea rows={4} placeholder="Mô tả chi tiết về khóa học..." />
          </Form.Item>

          <Form.List name="leasons">
            {(fields) => (
              <>
                <Button 
                  type="dashed" 
                  icon={<PlusOutlined />} 
                  onClick={handleAddLesson} 
                  style={{ marginBottom: 10 }}
                  block
                >
                  Thêm Lesson
                </Button>

                {fields.map((field, index) => (
                  <Card 
                    key={field.key}
                    title={`Lesson ${index + 1}`}
                    extra={
                      <Button 
                        danger 
                        icon={<DeleteOutlined />} 
                        onClick={() => handleRemoveLesson(index)} 
                        size="small"
                      />
                    }
                    style={{ marginBottom: 12 }}
                  >
                    <Form.Item 
                      name={[field.name, "title"]} 
                      label="Tiêu đề Lesson" 
                      rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
                    >
                      <Input placeholder="VD: Bài 1 - Chào hỏi" />
                    </Form.Item>

                    <Form.Item name={[field.name, "description"]} label="Mô tả">
                      <Input.TextArea rows={2} placeholder="Mô tả ngắn về lesson này..." />
                    </Form.Item>

                    <Form.Item label="Video Lesson (Base64)">
                      <input 
                        type="file" 
                        accept="video/*" 
                        onChange={(e) => {
                          if (e.target.files[0]) {
                            convertToBase64(e.target.files[0], (base64) => {
                              const leasons = form.getFieldValue("leasons");
                              leasons[index].video = base64;
                              form.setFieldsValue({ leasons: [...leasons] });
                            });
                          }
                        }} 
                      />
                    </Form.Item>

                    <Form.Item label="PDF Lesson (Base64)">
                      <input 
                        type="file" 
                        accept="application/pdf" 
                        onChange={(e) => {
                          if (e.target.files[0]) {
                            convertToBase64(e.target.files[0], (base64) => {
                              const leasons = form.getFieldValue("leasons");
                              leasons[index].pdf = base64;
                              form.setFieldsValue({ leasons: [...leasons] });
                            });
                          }
                        }} 
                      />
                    </Form.Item>
                  </Card>
                ))}
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </div>
  );
}

export default MentorDashboard;