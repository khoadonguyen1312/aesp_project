import React, { useState } from 'react';
import { Layout, Dropdown, Avatar, Badge } from 'antd';
import { BookOpen, ShoppingCart, Award } from 'lucide-react';
import { UserOutlined, BellOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import SidebarMenu from '../components/SidebarMenu';

const { Sider, Content, Header } = Layout;

export default function LearnerDashboard() {
  const [collapsed, setCollapsed] = useState(false);

  // Khóa học đã mua
  const myCourses = [
    {
      id: 1,
      title: 'English Grammar Basics',
      progress: 75,
      instructor: 'John Smith',
      thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400',
      status: 'In Progress'
    },
    {
      id: 2,
      title: 'Business English',
      progress: 40,
      instructor: 'Sarah Johnson',
      thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400',
      status: 'In Progress'
    },
    {
      id: 3,
      title: 'IELTS Speaking',
      progress: 100,
      instructor: 'Michael Brown',
      thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400',
      status: 'Completed'
    }
  ];

  // Khóa học có sẵn để mua
  const availableCourses = [
    {
      id: 4,
      title: 'Advanced Pronunciation',
      price: '599,000đ',
      rating: 4.8,
      students: 1234,
      instructor: 'Emma Wilson',
      thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400'
    },
    {
      id: 5,
      title: 'TOEIC Preparation',
      price: '799,000đ',
      rating: 4.9,
      students: 2156,
      instructor: 'David Lee',
      thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400'
    },
    {
      id: 6,
      title: 'Academic Writing',
      price: '699,000đ',
      rating: 4.7,
      students: 987,
      instructor: 'Lisa Chen',
      thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400'
    },
    {
      id: 7,
      title: 'English for Travel',
      price: '449,000đ',
      rating: 4.6,
      students: 1567,
      instructor: 'Tom Anderson',
      thumbnail: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400'
    }
  ];

  const handleLogout = () => {
    alert('Đăng xuất thành công!');
  };

  const menuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Hồ sơ cá nhân',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Cài đặt',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      onClick: handleLogout,
      danger: true,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="lg"
        width={200}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <SidebarMenu />
      </Sider>

      {/* Main Layout */}
      <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'all 0.2s' }}>
        {/* Fixed Header */}
        <Header style={{ 
          position: 'sticky',
          top: 0,
          zIndex: 10,
          padding: '0 24px',
          background: 'white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}>
          {/* Right Section */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '20px' 
          }}>
            {/* Notification Bell */}
            <Badge count={3} size="small">
              <div style={{
                width: '36px',
                height: '36px',
                background: '#f3f4f6',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#e5e7eb';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f3f4f6';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              >
                <BellOutlined style={{ fontSize: '18px', color: '#374151' }} />
              </div>
            </Badge>

            {/* User Section */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: '#f3f4f6',
              padding: '6px 12px 6px 6px',
              borderRadius: '24px',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#e5e7eb';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#f3f4f6';
            }}
            >
              <Dropdown 
                menu={{ items: menuItems }}
                placement="bottomRight"
                arrow
                trigger={['click']}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Avatar 
                    size={40}
                    icon={<UserOutlined />}
                    style={{ 
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: '2px solid #e5e7eb',
                      cursor: 'pointer'
                    }}
                  />
                  <div style={{ color: '#111827', lineHeight: 1.2 }}>
                    <div style={{ 
                      fontSize: '14px', 
                      fontWeight: 600 
                    }}>
                      Learner User
                    </div>
                    <div style={{ 
                      fontSize: '11px', 
                      color: '#6b7280'
                    }}>
                      Học viên
                    </div>
                  </div>
                </div>
              </Dropdown>
            </div>
          </div>
        </Header>

        {/* Content */}
        <Content style={{ 
          background: '#f5f7fa',
          minHeight: 'calc(100vh - 64px)'
        }}>
          <div style={{ 
            maxWidth: '1280px', 
            margin: '0 auto', 
            padding: '32px 24px'
          }}>
            {/* My Courses Section */}
            <div style={{ marginBottom: '48px' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                marginBottom: '24px'
              }}>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#111827',
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <BookOpen style={{ marginRight: '12px', color: '#3b82f6' }} />
                  Khóa học của tôi
                </h2>
              </div>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '24px'
              }}>
                {myCourses.map((course) => (
                  <div
                    key={course.id}
                    style={{
                      background: 'white',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                    }}
                  >
                    <div style={{
                      width: '100%',
                      height: '180px',
                      background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${course.thumbnail})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative'
                    }}>
                      {course.status === 'Completed' && (
                        <div style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          background: '#22c55e',
                          color: 'white',
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <Award size={14} />
                          Hoàn thành
                        </div>
                      )}
                    </div>
                    
                    <div style={{ padding: '20px' }}>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#111827',
                        margin: '0 0 8px',
                        lineHeight: '1.4'
                      }}>
                        {course.title}
                      </h3>
                      
                      <p style={{
                        fontSize: '14px',
                        color: '#6b7280',
                        margin: '0 0 16px'
                      }}>
                        {course.instructor}
                      </p>

                      <div style={{ marginBottom: '12px' }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '8px'
                        }}>
                          <span style={{ fontSize: '13px', color: '#6b7280' }}>Tiến độ</span>
                          <span style={{ fontSize: '13px', fontWeight: '600', color: '#3b82f6' }}>
                            {course.progress}%
                          </span>
                        </div>
                        <div style={{
                          width: '100%',
                          height: '8px',
                          background: '#e5e7eb',
                          borderRadius: '999px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${course.progress}%`,
                            height: '100%',
                            background: course.progress === 100 ? '#22c55e' : '#3b82f6',
                            borderRadius: '999px',
                            transition: 'width 0.3s'
                          }}></div>
                        </div>
                      </div>

                      <button style={{
                        width: '100%',
                        padding: '12px',
                        background: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        fontWeight: '600',
                        fontSize: '14px',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#2563eb'}
                      onMouseLeave={(e) => e.currentTarget.style.background = '#3b82f6'}
                      >
                        {course.progress === 100 ? 'Xem lại' : 'Tiếp tục học'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Courses Section */}
            <div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                marginBottom: '24px'
              }}>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#111827',
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <ShoppingCart style={{ marginRight: '12px', color: '#10b981' }} />
                  Khóa học có sẵn
                </h2>
              </div>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '24px'
              }}>
                {availableCourses.map((course) => (
                  <div
                    key={course.id}
                    style={{
                      background: 'white',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                    }}
                  >
                    <div style={{
                      width: '100%',
                      height: '160px',
                      background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${course.thumbnail})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}></div>
                    
                    <div style={{ padding: '20px' }}>
                      <h3 style={{
                        fontSize: '17px',
                        fontWeight: 'bold',
                        color: '#111827',
                        margin: '0 0 8px',
                        lineHeight: '1.4'
                      }}>
                        {course.title}
                      </h3>
                      
                      <p style={{
                        fontSize: '13px',
                        color: '#6b7280',
                        margin: '0 0 12px'
                      }}>
                        {course.instructor}
                      </p>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '16px',
                        fontSize: '13px',
                        color: '#6b7280'
                      }}>
                        <span style={{ color: '#f59e0b', fontWeight: '600' }}>
                          ⭐ {course.rating}
                        </span>
                        <span>•</span>
                        <span>{course.students.toLocaleString()} học viên</span>
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                        <span style={{
                          fontSize: '20px',
                          fontWeight: 'bold',
                          color: '#10b981'
                        }}>
                          {course.price}
                        </span>
                        <button style={{
                          padding: '10px 20px',
                          background: '#10b981',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          fontWeight: '600',
                          fontSize: '14px',
                          cursor: 'pointer',
                          transition: 'background 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#059669'}
                        onMouseLeave={(e) => e.currentTarget.style.background = '#10b981'}
                        >
                          Mua ngay
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
