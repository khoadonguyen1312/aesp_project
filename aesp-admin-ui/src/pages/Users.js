import { Table } from "antd";

export default function Users() {
  const columns = [
    { title: "Tên", dataIndex: "name", key: "name" },
    { title: "Vai trò", dataIndex: "role", key: "role" },
    { title: "Trạng thái", dataIndex: "status", key: "status" },
  ];

  const data = [
    { key: 1, name: "Nguyễn Văn A", role: "Learner", status: "Active" },
    { key: 2, name: "Trần Thị B", role: "Mentor", status: "Inactive" },
  ];

  return (
    <div>
      <h3>👥 Quản lý người dùng</h3>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
