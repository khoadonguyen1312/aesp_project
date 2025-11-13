import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, message } from "antd";
import { getCourses, createCourse, deleteCourse } from "../api/courseApi";

function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const token = localStorage.getItem("token");

  const loadCourses = async () => {
    setLoading(true);
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (err) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleCreate = async (values) => {
    try {
      await createCourse(values, token);
      message.success("Tạo khóa học thành công!");
      setIsModalVisible(false);
      form.resetFields();
      loadCourses();
    } catch (err) {
      message.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Xác nhận xóa khóa học?",
      onOk: async () => {
        try {
          await deleteCourse(id, token);
          message.success("Đã xóa khóa học!");
          loadCourses();
        } catch (err) {
          message.error(err.message);
        }
      },
    });
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Tên khóa học", dataIndex: "title", key: "title" },
    { title: "Mô tả", dataIndex: "description", key: "description" },
    { title: "Giá (VND)", dataIndex: "price", key: "price" },
    {
      title: "Thao tác",
      render: (_, record) => (
        <Button danger onClick={() => handleDelete(record.id)}>
          Xóa
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>📚 Quản lý khóa học</h2>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        ➕ Thêm khóa học
      </Button>

      <Table
        style={{ marginTop: 16 }}
        columns={columns}
        dataSource={courses}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title="Thêm khóa học mới"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleCreate}>
          <Form.Item
            name="title"
            label="Tên khóa học"
            rules={[{ required: true, message: "Nhập tên khóa học!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: "Nhập mô tả!" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            name="thumbnailUrl"
            label="Ảnh khóa học (URL)"
            rules={[{ required: true, message: "Nhập link ảnh!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Giá (VND)"
            rules={[{ required: true, message: "Nhập giá khóa học!" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Lưu
          </Button>
        </Form>
      </Modal>
    </div>
  );
}

export default CourseManagement;
