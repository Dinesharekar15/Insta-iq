import React, { useState, useEffect } from "react";
import { useAdmin } from "../../context/AdminContext";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { 
    courses, 
    events, 
    loading, 
    orderStats, 
    getStats,
    fetchOrderStats,
    fetchOrdersData,
    fetchUsersData,
    orders,
    users,
    userStats,
    clientTestimonials,
    studentTestimonials 
  } = useAdmin();
  const [stats, setStats] = useState({
    totalUsers: 0,
    recentOrders: [],
    recentUsers: []
  });

  useEffect(() => {
    // Get real stats from admin context
    const realStats = getStats();
    setStats(prev => ({
      ...prev,
      ...realStats,
      totalUsers: userStats?.totalUsers || users?.length || realStats.totalUsers || 0
    }));
  }, [courses, events, orderStats, userStats, users]);

  // Fetch order stats and user data on component mount
  useEffect(() => {
    fetchOrderStats();
    fetchOrdersData();
    fetchUsersData();
  }, []);

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: "fa fa-users",
      color: "#007bff",
      changeType: "positive",
      change: "+12%"
    },
    {
      title: "Total Orders",
      value: orderStats?.totalOrders || 0,
      icon: "fa fa-shopping-cart",
      color: "#6f42c1",
      changeType: "positive",
      change: "+24%"
    },
    {
      title: "Total Revenue",
      value: `₹${orderStats?.totalRevenue || 0}`,
      icon: "fa fa-rupee-sign",
      color: "#dc3545",
      changeType: "positive",
      change: "+18%"
    },
    {
      title: "Total Courses",
      value: stats.totalCourses || 0,
      icon: "fa fa-book",
      color: "#28a745",
      changeType: "positive",
      change: "+8%"
    },
    {
      title: "Total Events",
      value: events?.length || 0,
      icon: "fa fa-calendar",
      color: "#fd7e14",
      changeType: "positive",
      change: "+15%"
    },
    {
      title: "Delivered Orders",
      value: orderStats?.deliveredOrders || 0,
      icon: "fa fa-check-circle",
      color: "#20c997",
      changeType: "positive",
      change: "+22%"
    },
    {
      title: "Pending Orders",
      value: orderStats?.pendingOrders || 0,
      icon: "fa fa-clock",
      color: "#ffc107",
      changeType: "neutral",
      change: "±5%"
    },
    {
      title: "Processing Orders",
      value: orderStats?.processingOrders || 0,
      icon: "fa fa-spinner",
      color: "#17a2b8",
      changeType: "neutral",
      change: "+10%"
    },
    {
      title: "Client Testimonials",
      value: clientTestimonials?.length || 0,
      icon: "fa fa-comments",
      color: "#6610f2",
      changeType: "positive",
      change: "+6%"
    },
    {
      title: "Student Testimonials",
      value: studentTestimonials?.length || 0,
      icon: "fa fa-graduation-cap",
      color: "#e83e8c",
      changeType: "positive",
      change: "+14%"
    },
    {
      title: "Cancelled Orders",
      value: orderStats?.cancelledOrders || 0,
      icon: "fa fa-times-circle",
      color: "#6c757d",
      changeType: "negative",
      change: "-2%"
    },
    {
      title: "Average Order Value",
      value: `₹${orderStats?.averageOrderValue ? Math.round(orderStats.averageOrderValue) : 0}`,
      icon: "fa fa-chart-line",
      color: "#198754",
      changeType: "positive",
      change: "+11%"
    }
  ];

  // Get real recent orders from orders data (top 4)
  const getRecentOrders = () => {
    if (orders && orders.length > 0) {
      return orders
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4)
        .map(order => ({
          id: order._id,
          user: order.name || order.customerName || 'N/A',
          course: order.course?.title || order.courseName || 'Course Order',
          amount: order.amount ? `₹${parseInt(order.amount).toLocaleString()}` : 'N/A',
          status: order.status || 'Pending',
          date: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'
        }));
    }
    // Fallback to course-based mock data if no real orders
    return courses.slice(0, 4).map((course, index) => ({
      id: course._id,
      user: ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson"][index],
      course: course.title.substring(0, 20) + "...",
      amount: course.price === 0 ? "Free" : `₹${course.price.toLocaleString()}`,
      status: ["Completed", "Pending", "Completed", "Processing"][index],
      date: course.createdAt
    }));
  };

  const recentOrders = getRecentOrders();

  // Get real recent users from users data (top 4)
  const getRecentUsers = () => {
    if (users && users.length > 0) {
      return users
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4)
        .map(user => ({
          id: user._id,
          name: user.name || 'N/A',
          email: user.email || 'N/A',
          joinDate: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A',
          status: user.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1) : 'Active'
        }));
    }
    // Fallback to mock data if no real users
    return [
      { id: 1, name: "Alice Brown", email: "alice@example.com", joinDate: "2024-01-15", status: "Active" },
      { id: 2, name: "Bob Davis", email: "bob@example.com", joinDate: "2024-01-14", status: "Active" },
      { id: 3, name: "Carol Evans", email: "carol@example.com", joinDate: "2024-01-13", status: "Pending" },
      { id: 4, name: "David Frank", email: "david@example.com", joinDate: "2024-01-12", status: "Active" }
    ];
  };

  const recentUsers = getRecentUsers();

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <i className="fa fa-spinner fa-spin" style={{ fontSize: '24px', color: '#007bff' }}></i>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ margin: 0, color: '#333' }}>Dashboard Overview</h2>
        <p style={{ margin: '5px 0 0 0', color: '#666' }}>Welcome to Insta iQ Admin Dashboard</p>
      </div>

      {/* Statistics Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px', 
        marginBottom: '30px' 
      }}>
        {statCards.map((card, index) => (
          <div key={index} style={{
            background: '#fff',
            borderRadius: '10px',
            padding: '25px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            border: `1px solid #eee`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#666', fontWeight: 'normal' }}>
                  {card.title}
                </h3>
                <h2 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold', color: '#333' }}>
                  {card.value}
                </h2>
              </div>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '10px',
                background: card.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <i className={card.icon} style={{ color: 'white', fontSize: '20px' }}></i>
              </div>
            </div>
            <div style={{ marginTop: '15px', display: 'flex', alignItems: 'center' }}>
              <span style={{ 
                color: card.changeType === 'positive' ? '#28a745' : 
                       card.changeType === 'negative' ? '#dc3545' : '#ffc107',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                {card.change}
              </span>
              <span style={{ marginLeft: '5px', fontSize: '12px', color: '#666' }}>
                from last month
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Tables Row */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '2fr 1fr', 
        gap: '20px',
        marginBottom: '30px'
      }}>
        {/* Recent Orders */}
        <div style={{
          background: '#fff',
          borderRadius: '10px',
          padding: '25px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          border: '1px solid #eee'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, color: '#333' }}>Recent Orders</h3>
            <Link to= "/admin/orders">
            <button style={{
              background: '#007bff',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px'
            }}>
              View All
            </button>
            </Link>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <th style={{ textAlign: 'left', padding: '12px 0', color: '#666', fontWeight: 'normal' }}>User</th>
                  <th style={{ textAlign: 'left', padding: '12px 0', color: '#666', fontWeight: 'normal' }}>Course</th>
                  <th style={{ textAlign: 'left', padding: '12px 0', color: '#666', fontWeight: 'normal' }}>Amount</th>
                  <th style={{ textAlign: 'left', padding: '12px 0', color: '#666', fontWeight: 'normal' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} style={{ borderBottom: '1px solid #f8f9fa' }}>
                    <td style={{ padding: '12px 0', color: '#333' }}>{order.user}</td>
                    <td style={{ padding: '12px 0', color: '#333' }}>{order.course}</td>
                    <td style={{ padding: '12px 0', color: '#333', fontWeight: 'bold' }}>{order.amount}</td>
                    <td style={{ padding: '12px 0' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        background: order.status === 'Completed' ? '#d4edda' : 
                                   order.status === 'Pending' ? '#fff3cd' : '#d1ecf1',
                        color: order.status === 'Completed' ? '#155724' : 
                               order.status === 'Pending' ? '#856404' : '#0c5460'
                      }}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Users */}
        <div style={{
          background: '#fff',
          borderRadius: '10px',
          padding: '25px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          border: '1px solid #eee'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, color: '#333' }}>Recent Users</h3>
          <Link to="/admin/users">
            <button style={{
              background: '#007bff',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px'
            }}>
              View All
            </button>
          </Link>
          </div>
          <div>
            {recentUsers.map((user) => (
              <div key={user.id} style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 0',
                borderBottom: '1px solid #f8f9fa'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#007bff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px'
                }}>
                  <i className="fa fa-user" style={{ color: 'white' }}></i>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', color: '#333' }}>{user.name}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>{user.email}</div>
                </div>
                <span style={{
                  padding: '2px 6px',
                  borderRadius: '8px',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  background: user.status === 'Active' ? '#d4edda' : '#fff3cd',
                  color: user.status === 'Active' ? '#155724' : '#856404'
                }}>
                  {user.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{
        background: '#fff',
        borderRadius: '10px',
        padding: '25px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        border: '1px solid #eee'
      }}>
        <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>Quick Actions</h3>
                 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
           <Link to="/admin/courses" style={{
             background: '#28a745',
             color: 'white',
             border: 'none',
             padding: '15px',
             borderRadius: '8px',
             cursor: 'pointer',
             fontSize: '14px',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             textDecoration: 'none'
           }}>
             <i className="fa fa-plus" style={{ marginRight: '8px' }}></i>
             Add New Course
           </Link>
           <Link to="/admin/events" style={{
             background: '#ffc107',
             color: 'white',
             border: 'none',
             padding: '15px',
             borderRadius: '8px',
             cursor: 'pointer',
             fontSize: '14px',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             textDecoration: 'none'
           }}>
             <i className="fa fa-calendar-plus" style={{ marginRight: '8px' }}></i>
             Create Event
           </Link>
           <Link to="/admin/users" style={{
             background: '#17a2b8',
             color: 'white',
             border: 'none',
             padding: '15px',
             borderRadius: '8px',
             cursor: 'pointer',
             fontSize: '14px',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             textDecoration: 'none'
           }}>
             <i className="fa fa-user-plus" style={{ marginRight: '8px' }}></i>
             Add User
           </Link>
           <Link to="/admin/settings" style={{
             background: '#6c757d',
             color: 'white',
             border: 'none',
             padding: '15px',
             borderRadius: '8px',
             cursor: 'pointer',
             fontSize: '14px',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             textDecoration: 'none'
           }}>
             <i className="fa fa-cog" style={{ marginRight: '8px' }}></i>
             Settings
           </Link>
         </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 