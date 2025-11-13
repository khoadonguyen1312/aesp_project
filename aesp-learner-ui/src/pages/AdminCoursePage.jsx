import React, { useState, useEffect } from "react";
import { Table, Button, message } from "antd";

const AdminCoursePage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    //  Giả lập gọi API
    setCourses([
      { id: 1, title: "Luyện phát âm tiếng Anh cơ bản", price: 250000 },
      { id: 2, title: "Ngữ pháp nâng cao", price: 300000 },
    ]);
  }, []);

  const handleEdit = (id) => {
    message.info(`Sửa khóa học ID: ${id}`);
  };

  const handleDelete = (id) => {
    message.warning(`Xóa khóa học ID: ${id}`);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Tên khóa học", dataIndex: "title", key: "title" },
    { title: "Giá (VNĐ)", dataIndex: "price", key: "price" },
    {
      title: "Hành động",
      key: "actions",
      render: (record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record.id)}>
            Sửa
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            Xóa
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <h2> Quản lý khóa học</h2>
      <Button type="primary" style={{ marginBottom: "16px" }}>
        + Thêm khóa học
      </Button>
      <Table dataSource={courses} columns={columns} rowKey="id" />
    </div>
  );
};

export default AdminCoursePage;
