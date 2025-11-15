import React, { useState, useEffect } from 'react';
import { Layout, Dropdown, Avatar, Badge, message, Spin, Card, Button, Empty, Collapse, Tag, Breadcrumb } from 'antd';
import { BookOpen, FileText, ArrowLeft, CheckCircle } from 'lucide-react';
import { UserOutlined, BellOutlined, LogoutOutlined, SettingOutlined, HomeOutlined, BookOutlined } from '@ant-design/icons';
import API from '../services/api';

const { Content, Header } = Layout;
const { Panel } = Collapse;

// Component hiển thị chi tiết khóa học
function CourseDetailView({ courseId, onBack }) {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourseDetail = async () => {
      if (!courseId || courseId === undefined || courseId === null) {
        message.error('ID khóa học không hợp lệ!');
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await API.get(`/user/see-course?id=${courseId}`);
        console.log('Course detail response:', res.data);
        if (res.data.code === 200) {
          setCourse(res.data.data);
        } else {
          message.error(res.data.message || 'Không thể tải thông tin khóa học!');
        }
      } catch (err) {
        console.error(err);
        message.error('Lỗi kết nối server!');
      } finally {
        setLoading(false);
      }
    };
    
    loadCourseDetail();
  }, [courseId]);

  const handleDownloadPDF = (pdfData, lessonTitle) => {
    if (!pdfData || pdfData === '[B@2d3a197e' || pdfData === null) {
      message.warning('Bài học này chưa có tài liệu PDF');
      return;
    }
    
    try {
      const byteCharacters = atob(pdfData);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${lessonTitle}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
      
      message.success('Đang tải xuống PDF...');
    } catch (err) {
      console.error(err);
      message.error('Lỗi khi tải PDF!');
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <Spin size="large" tip="Đang tải khóa học..." />
      </div>
    );
  }

  if (!course) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <Empty description="Không tìm thấy khóa học" />
        <Button type="primary" onClick={onBack} style={{ marginTop: '20px' }}>
          Quay lại
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb & Back Button */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <HomeOutlined /> Dashboard
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <BookOutlined /> Khóa học
          </Breadcrumb.Item>
          <Breadcrumb.Item>{course.name || 'Khóa học'}</Breadcrumb.Item>
        </Breadcrumb>
        
        <Button icon={<ArrowLeft size={16} />} onClick={onBack}>
          Quay lại
        </Button>
      </div>

      {/* Course Header */}
      <Card 
        style={{ 
          marginBottom: '24px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {course.thumb && course.thumb !== '[B@7561defa' && course.thumb !== null ? (
            <img 
              src={`data:image/jpeg;base64,${course.thumb}`}
              alt={course.name || 'Course'}
              style={{ 
                width: '200px', 
                height: '200px', 
                objectFit: 'cover', 
                borderRadius: '8px' 
              }}
            />
          ) : (
            <div style={{ 
              width: '200px', 
              height: '200px', 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <BookOpen size={64} color="white" />
            </div>
          )}
          
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h1 style={{ 
              fontSize: '28px', 
              fontWeight: 'bold', 
              marginBottom: '12px',
              color: '#111827'
            }}>
              {course.name || 'Tên khóa học'}
            </h1>
            
            {course.description && (
              <Tag color="blue" style={{ marginBottom: '16px', fontSize: '13px' }}>
                {course.description}
              </Tag>
            )}
            
            {course.courseContent && (
              <div style={{ 
                background: '#f9fafb', 
                padding: '16px', 
                borderRadius: '8px',
                marginBottom: '16px'
              }}>
                <h3 style={{ 
                  fontSize: '16px', 
                  fontWeight: 600, 
                  marginBottom: '8px',
                  color: '#374151'
                }}>
                  📚 Nội dung khóa học
                </h3>
                <p style={{ 
                  fontSize: '14px', 
                  lineHeight: '1.6', 
                  color: '#6b7280',
                  whiteSpace: 'pre-line',
                  margin: 0
                }}>
                  {course.courseContent}
                </p>
              </div>
            )}
            
            {course.requiredForLearning && (
              <div style={{ 
                background: '#fef3c7', 
                padding: '12px', 
                borderRadius: '8px',
                border: '1px solid #fbbf24',
                marginBottom: '16px'
              }}>
                <strong style={{ color: '#92400e' }}>⚠️ Yêu cầu đầu vào:</strong>
                <span style={{ marginLeft: '8px', color: '#92400e' }}>
                  {course.requiredForLearning}
                </span>
              </div>
            )}
            
            <Tag color="green" style={{ fontSize: '14px', padding: '4px 12px' }}>
              {course.leasons?.length || 0} bài học
            </Tag>
          </div>
        </div>
      </Card>

      {/* Lessons List */}
      <Card 
        title={
          <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
            📖 Danh sách bài học
          </span>
        }
        style={{ 
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        {!course.leasons || course.leasons.length === 0 ? (
          <Empty description="Chưa có bài học nào" />
        ) : (
          <Collapse 
            accordion 
            defaultActiveKey={['0']}
            style={{ background: 'transparent', border: 'none' }}
          >
            {course.leasons.map((lesson, index) => {
              const hasPDF = lesson.pdf && lesson.pdf !== '[B@2d3a197e' && lesson.pdf !== null;
              
              return (
                <Panel
                  key={index}
                  header={
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      width: '100%',
                      paddingRight: '10px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                        <div style={{ 
                          width: '32px', 
                          height: '32px', 
                          background: '#3b82f6', 
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '14px',
                          flexShrink: 0
                        }}>
                          {index + 1}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ 
                            fontSize: '16px', 
                            fontWeight: 600,
                            color: '#111827'
                          }}>
                            {lesson.title || `Bài học ${index + 1}`}
                          </div>
                          {lesson.description && (
                            <div style={{ 
                              fontSize: '13px', 
                              color: '#6b7280',
                              marginTop: '4px'
                            }}>
                              {lesson.description}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {hasPDF && (
                        <Tag color="orange" icon={<FileText size={14} />} style={{ marginLeft: '8px' }}>
                          Có PDF
                        </Tag>
                      )}
                    </div>
                  }
                  style={{ 
                    marginBottom: '12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    background: 'white'
                  }}
                >
                  <div style={{ padding: '16px' }}>
                    <div style={{ 
                      display: 'flex', 
                      gap: '12px',
                      marginBottom: '16px',
                      flexWrap: 'wrap'
                    }}>
                      {hasPDF ? (
                        <Button 
                          type="primary"
                          icon={<FileText size={16} />}
                          onClick={() => handleDownloadPDF(lesson.pdf, lesson.title)}
                        >
                          Tải PDF
                        </Button>
                      ) : (
                        <Button disabled icon={<FileText size={16} />}>
                          Chưa có tài liệu
                        </Button>
                      )}
                      
                      <Button 
                        type="default"
                        icon={<CheckCircle size={16} />}
                      >
                        Đánh dấu hoàn thành
                      </Button>
                    </div>
                    
                    {lesson.vocabularies && lesson.vocabularies.length > 0 && (
                      <div style={{ 
                        background: '#f9fafb', 
                        padding: '12px', 
                        borderRadius: '6px',
                        marginTop: '12px'
                      }}>
                        <h4 style={{ 
                          fontSize: '14px', 
                          fontWeight: 600,
                          marginBottom: '8px',
                          color: '#374151'
                        }}>
                          📝 Từ vựng trong bài:
                        </h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {lesson.vocabularies.map((vocab, vIndex) => (
                            <Tag key={vIndex} color="blue">
                              {vocab}
                            </Tag>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Panel>
              );
            })}
          </Collapse>
        )}
      </Card>
    </div>
  );
}

// Component chính
export default function LearnerDashboard() {
  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMy, setLoadingMy] = useState(true);
  const [currentUserId] = useState(1);
  const [viewingCourseId, setViewingCourseId] = useState(null);

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      try {
        const res = await API.get('/user/list-courses?page=0&size=20');
        if (res.data.code === 200) {
          // Lọc bỏ khóa học không có tên
          const validCourses = (res.data.data || []).filter(course => 
            course.name && course.name.trim() !== ''
          );
          setCourses(validCourses);
          console.log('Valid courses:', validCourses.length);
        } else {
          message.error(res.data.message || 'Không thể tải danh sách khóa học!');
        }
      } catch (err) {
        console.error(err);
        message.error('Lỗi kết nối server!');
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, []);

  useEffect(() => {
    const loadMyCourses = async () => {
      setLoadingMy(true);
      try {
        const res = await API.get(`/user/my-course?id=${currentUserId}&page=0&size=20`);
        console.log('My courses response:', res.data);
        if (res.data.code === 200) {
          // Lọc bỏ khóa học không có tên
          const validCourses = (res.data.data || []).filter(course => 
            course.name && course.name.trim() !== ''
          );
          setMyCourses(validCourses);
          console.log('Valid my courses:', validCourses.length);
        } else {
          message.error(res.data.message || 'Không thể tải khóa học của bạn!');
        }
      } catch (err) {
        console.error(err);
        message.error('Lỗi kết nối khóa học của tôi!');
      } finally {
        setLoadingMy(false);
      }
    };
    loadMyCourses();
  }, [currentUserId]);

  const handleViewCourse = (courseId) => {
    console.log('Viewing course ID:', courseId);
    if (!courseId) {
      message.error('ID khóa học không hợp lệ!');
      return;
    }
    setViewingCourseId(courseId);
  };

  const handleBackToDashboard = () => {
    setViewingCourseId(null);
  };

  const handleEnrollCourse = async (courseId) => {
    try {
      const loadingMsg = message.loading('Đang đăng ký khóa học...', 0);
      const res = await API.post(`/user/learn-course?id=${courseId}`, {});
      loadingMsg();
      
      if (res.data.code === 200) {
        message.success('Đăng ký khóa học thành công!');
        // Reload lại danh sách khóa học của tôi
        const resMy = await API.get(`/user/my-course?id=${currentUserId}&page=0&size=20`);
        if (resMy.data.code === 200) {
          const validCourses = (resMy.data.data || []).filter(course => 
            course.name && course.name.trim() !== ''
          );
          setMyCourses(validCourses);
        }
      } else {
        message.error(res.data.message || 'Đăng ký thất bại!');
      }
    } catch (err) {
      message.error('Lỗi server!');
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    message.success('Đăng xuất thành công!');
    window.location.href = '/login';
  };

  const menuItems = [
    { key: 'profile', icon: <UserOutlined />, label: 'Hồ sơ cá nhân' },
    { key: 'settings', icon: <SettingOutlined />, label: 'Cài đặt' },
    { type: 'divider' },
    { key: 'logout', icon: <LogoutOutlined />, label: 'Đăng xuất', onClick: handleLogout, danger: true },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
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
          justifyContent: 'space-between' 
        }}>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#1890ff' }}>
            👋 Xin chào!
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Badge count={3} size="small">
              <div style={{ 
                width: '36px', 
                height: '36px', 
                background: '#f3f4f6', 
                borderRadius: '8px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                cursor: 'pointer' 
              }}>
                <BellOutlined style={{ fontSize: '18px', color: '#374151' }} />
              </div>
            </Badge>
            <Dropdown menu={{ items: menuItems }} placement="bottomRight" arrow trigger={['click']}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px', 
                background: '#f3f4f6', 
                padding: '6px 12px 6px 6px', 
                borderRadius: '24px', 
                cursor: 'pointer' 
              }}>
                <Avatar 
                  size={40} 
                  icon={<UserOutlined />} 
                  style={{ 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                    border: '2px solid #e5e7eb' 
                  }} 
                />
                <div style={{ lineHeight: 1.2 }}>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>User</div>
                  <div style={{ fontSize: '11px', color: '#6b7280' }}>Học viên</div>
                </div>
              </div>
            </Dropdown>
          </div>
        </Header>

        <Content style={{ background: '#f5f7fa', minHeight: 'calc(100vh - 64px)', padding: '32px 48px' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            
            {viewingCourseId ? (
              <CourseDetailView 
                courseId={viewingCourseId} 
                onBack={handleBackToDashboard}
              />
            ) : (
              <>
                {/* Khóa học của tôi */}
                <section style={{ marginBottom: '48px' }}>
                  <h2 style={{ 
                    fontSize: '24px', 
                    fontWeight: 'bold', 
                    color: '#111827', 
                    marginBottom: '24px', 
                    display: 'flex', 
                    alignItems: 'center' 
                  }}>
                    <BookOpen style={{ marginRight: '12px', color: '#3b82f6' }} />
                    Khóa học của tôi
                  </h2>
                  
                  {loadingMy ? (
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                      <Spin size="large" tip="Đang tải khóa học của bạn..." />
                    </div>
                  ) : myCourses.length === 0 ? (
                    <div style={{ 
                      background: 'white', 
                      padding: '40px', 
                      borderRadius: '12px', 
                      textAlign: 'center',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}>
                      <Empty description="Bạn chưa đăng ký khóa học nào" />
                    </div>
                  ) : (
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
                      gap: '24px' 
                    }}>
                      {myCourses.map(course => (
                        <Card
                          key={course.id}
                          hoverable
                          cover={
                            course.thumb && course.thumb !== '[B@7561defa' && course.thumb !== null ? (
                              <div style={{ 
                                width: '100%', 
                                height: '200px', 
                                background: `url(data:image/jpeg;base64,${course.thumb}) center/cover no-repeat` 
                              }} />
                            ) : (
                              <div style={{ 
                                width: '100%', 
                                height: '200px', 
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
                                <BookOpen size={64} color="white" />
                              </div>
                            )
                          }
                        >
                          <Card.Meta
                            title={
                              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                {course.name}
                              </span>
                            }
                            description={
                              <div>
                                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '12px', minHeight: '40px' }}>
                                  {course.description ? course.description.substring(0, 70) + '...' : 'Chưa có mô tả'}
                                </p>
                                <div style={{ 
                                  display: 'flex', 
                                  justifyContent: 'space-between', 
                                  alignItems: 'center',
                                  marginBottom: '12px',
                                  padding: '8px 0',
                                  borderTop: '1px solid #f0f0f0'
                                }}>
                                  <span style={{ fontSize: '12px', color: '#666' }}>
                                    📚 {course.leason_count || 0} bài học
                                  </span>
                                  <span style={{ fontSize: '12px', color: '#52c41a', fontWeight: 'bold' }}>
                                    ✓ Đã đăng ký
                                  </span>
                                </div>
                                <Button 
                                  type="primary" 
                                  block 
                                  style={{ height: '40px', fontWeight: 600 }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleViewCourse(course.id);
                                  }}
                                >
                                  Tiếp tục học
                                </Button>
                              </div>
                            }
                          />
                        </Card>
                      ))}
                    </div>
                  )}
                </section>

                {/* Tất cả khóa học */}
                <section>
                  <h2 style={{ 
                    fontSize: '24px', 
                    fontWeight: 'bold', 
                    color: '#111827', 
                    marginBottom: '24px', 
                    display: 'flex', 
                    alignItems: 'center' 
                  }}>
                    <BookOpen style={{ marginRight: '12px', color: '#10b981' }} />
                    Danh sách khóa học
                  </h2>
                  
                  {loading ? (
                    <div style={{ textAlign: 'center', padding: '60px 0' }}>
                      <Spin size="large" tip="Đang tải danh sách khóa học..." />
                    </div>
                  ) : courses.length === 0 ? (
                    <Empty description="Chưa có khóa học nào" style={{ padding: '60px 0' }} />
                  ) : (
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                      gap: '24px' 
                    }}>
                      {courses.map(course => (
                        <Card
                          key={course.id}
                          hoverable
                          cover={
                            course.thumb && course.thumb !== '[B@7561defa' && course.thumb !== null ? (
                              <div style={{ 
                                width: '100%', 
                                height: '180px', 
                                background: `url(data:image/jpeg;base64,${course.thumb}) center/cover no-repeat` 
                              }} />
                            ) : (
                              <div style={{ 
                                width: '100%', 
                                height: '180px', 
                                background: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
                                <BookOpen size={48} color="white" />
                              </div>
                            )
                          }
                        >
                          <Card.Meta
                            title={<span style={{ fontSize: '17px' }}>{course.name}</span>}
                            description={
                              <div>
                                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '12px', minHeight: '40px' }}>
                                  {course.description ? course.description.substring(0, 60) + '...' : 'Chưa có mô tả'}
                                </p>
                                <div style={{ 
                                  display: 'flex', 
                                  justifyContent: 'space-between', 
                                  alignItems: 'center',
                                  marginBottom: '12px'
                                }}>
                                  <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981' }}>
                                    Miễn phí
                                  </span>
                                  <span style={{ fontSize: '12px', color: '#666' }}>
                                    {course.leason_count || 0} bài
                                  </span>
                                </div>
                                <Button 
                                  type="primary" 
                                  block 
                                  style={{ height: '36px' }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEnrollCourse(course.id);
                                  }}
                                >
                                  Đăng ký học
                                </Button>
                              </div>
                            }
                          />
                        </Card>
                      ))}
                    </div>
                  )}
                </section>
              </>
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}