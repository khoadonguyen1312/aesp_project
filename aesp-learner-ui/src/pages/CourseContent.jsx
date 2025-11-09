import React from "react";
import { Card, Tabs, List, Avatar, Typography, Button } from "antd";
import {
  MessageOutlined,
  InfoCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

function CourseContent() {
  return (
    <div style={{ padding: "16px" }}>
      <Title level={3}>
        [010412213603] - Lập trình Java - 7460108039316
      </Title>

      <Tabs defaultActiveKey="1" style={{ marginTop: 16 }}>
        {/* Tab 1: Khóa học */}
        <Tabs.TabPane tab="Khóa học" key="1">
          <Title level={4}>Elearning UTH</Title>

          <Card style={{ marginTop: 16, borderRadius: 8 }}>
            <List
              itemLayout="horizontal"
              dataSource={[
                {
                  title: "Các thông báo",
                  icon: <MessageOutlined style={{ color: "#ff4d4f" }} />,
                  content: "Hiện chưa có thông báo mới.",
                },
                {
                  title: "Thông tin GV",
                  icon: <UserOutlined style={{ color: "#52c41a" }} />,
                  content: (
                    <>
                      <Text strong>ThS. Nguyễn Văn Chiến</Text>
                      <br />
                      <Text>Email: chiennv@ut.edu.vn</Text>
                    </>
                  ),
                  action: (
                    <Button type="default" size="small">
                      Đánh dấu là đã hoàn thành
                    </Button>
                  ),
                },
                {
                  title: "Nội quy môn học",
                  icon: <InfoCircleOutlined style={{ color: "#faad14" }} />,
                  content: "Môn học 3 tín chỉ, sinh viên cần tuân thủ đúng quy định học tập.",
                },
              ]}
              renderItem={(item) => (
                <List.Item actions={item.action ? [item.action] : []}>
                  <List.Item.Meta
                    avatar={<Avatar icon={item.icon} />}
                    title={<Text strong>{item.title}</Text>}
                    description={item.content}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Tabs.TabPane>

        {/* Tab 2: Điểm */}
        <Tabs.TabPane tab="Điểm" key="2">
          <Card>
            <Title level={5}>Bảng điểm</Title>
            <Text>Hiện chưa có dữ liệu điểm cho môn học này.</Text>
          </Card>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default CourseContent;
