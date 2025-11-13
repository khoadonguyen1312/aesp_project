import React, { useState, useEffect } from 'react';
import { Layout, Dropdown, Avatar, Badge, message, Spin } from 'antd';
import { BookOpen, ShoppingCart, Award } from 'lucide-react';
import { UserOutlined, BellOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import SidebarMenu from '../components/SidebarMenu';
import { getCourses } from '../api/courseApi';

const { Sider, Content, Header } = Layout;

export default function LearnerDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Khóa học của học viên (demo)
  const myCourses = [
    { id: 1, title: 'English Grammar Basics', progress: 75, instructor: 'John Smith', thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400', status: 'In Progress' },
    { id: 2, title: 'Business English', progress: 40, instructor: 'Sarah Johnson', thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400', status: 'In Progress' },
    { id: 3, title: 'IELTS Speaking', progress: 100, instructor: 'Michael Brown', thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400', status: 'Completed' },
  ];

  // Load khóa học có sẵn từ API
  useEffect(() => {
    const loadAvailableCourses = async () => {
      setLoading(true);
      try {
        const data = await getCourses();
        const formattedCourses = data.map(course => ({
          id: course.id,
          title: course.title,
          price: `${course.price.toLocaleString('vi-VN')}đ`,
          instructor: 'Giảng viên',
          thumbnail: course.thumbnailUrl || 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400',
        }));
        setAvailableCourses(formattedCourses);
      } catch (err) {
        message.error('Không thể tải danh sách khóa học: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    loadAvailableCourses();
  }, []);

  // ✅ Chỉ dẫn tới /learner/courses/:id
  const handleOpenCourse = (courseId) => {
    navigate(`/learner/courses/${courseId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    message.success('Đăng xuất thành công!');
    navigate('/login');
  };

  const menuItems = [
    { key: 'profile', icon: <UserOutlined />, label: 'Hồ sơ cá nhân' },
    { key: 'settings', icon: <SettingOutlined />, label: 'Cài đặt' },
    { type: 'divider' },
    { key: 'logout', icon: <LogoutOutlined />, label: 'Đăng xuất', onClick: handleLogout, danger: true },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} breakpoint="lg" width={200} style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}>
        <SidebarMenu />
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'all 0.2s' }}>
        <Header style={{ position: 'sticky', top: 0, zIndex: 10, padding: '0 24px', background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Badge count={3} size="small">
              <div style={{ width: '36px', height: '36px', background: '#f3f4f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <BellOutlined style={{ fontSize: '18px', color: '#374151' }} />
              </div>
            </Badge>
            <Dropdown menu={{ items: menuItems }} placement="bottomRight" arrow trigger={['click']}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f3f4f6', padding: '6px 12px 6px 6px', borderRadius: '24px', cursor: 'pointer' }}>
                <Avatar size={40} icon={<UserOutlined />} style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: '2px solid #e5e7eb' }} />
                <div style={{ color: '#111827', lineHeight: 1.2 }}>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>Learner User</div>
                  <div style={{ fontSize: '11px', color: '#6b7280' }}>Học viên</div>
                </div>
              </div>
            </Dropdown>
          </div>
        </Header>

        <Content style={{ background: '#f5f7fa', minHeight: 'calc(100vh - 64px)' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 48px' }}>
            {/* My Courses */}
            <section style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '24px', display: 'flex', alignItems: 'center' }}>
                <BookOpen style={{ marginRight: '12px', color: '#3b82f6' }} />
                Khóa học của tôi
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '24px', justifyItems: 'center' }}>
                {myCourses.map(course => (
                  <div key={course.id} onClick={() => handleOpenCourse(course.id)} style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', cursor: 'pointer', width: '100%', maxWidth: '420px' }}>
                    <div style={{ width: '100%', height: '180px', background: `url(${course.thumbnail}) center/cover no-repeat` }}></div>
                    <div style={{ padding: '20px' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>{course.title}</h3>
                      <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>{course.instructor}</p>
                      <button style={{ width: '100%', padding: '12px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>
                        {course.status === 'Completed' ? 'Xem lại' : 'Tiếp tục học'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Available Courses */}
            <section>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '24px', display: 'flex', alignItems: 'center' }}>
                <ShoppingCart style={{ marginRight: '12px', color: '#10b981' }} />
                Khóa học có sẵn
              </h2>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '60px 0' }}><Spin size="large" /></div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px', justifyItems: 'center' }}>
                  {availableCourses.map(course => (
                    <div key={course.id} onClick={() => handleOpenCourse(course.id)} style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', cursor: 'pointer', width: '100%', maxWidth: '360px' }}>
                      <div style={{ width: '100%', height: '160px', background: `url(${course.thumbnail}) center/cover no-repeat` }}></div>
                      <div style={{ padding: '20px' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 'bold', marginBottom: '8px' }}>{course.title}</h3>
                        <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '12px' }}>{course.instructor}</p>
                        <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981' }}>{course.price}</span>
                      </div>
                    </div>
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
