import React, { useState, useEffect } from "react";
import { useNavigate, Routes, Route, Link, useLocation } from "react-router-dom";
import AdminDashboard from "./admin/AdminDashboard";
import CourseManagement from "./admin/CourseManagement";
import EventManagement from "./admin/EventManagement";
import UserManagement from "./admin/UserManagement";
import RoleManagement from "./admin/RoleManagement";
import OrderManagement from "./admin/OrderManagement";
import TestimonialManagement from "./admin/TestimonialManagement";
import AdminProfile from "./admin/AdminProfile";
import Settings from "./admin/Settings";
import BackToTop from "../components/BackToTop";
import { PermissionGuard, PermissionRender } from "../components/PermissionGuard";
import { getMenuItemsForRole, ROLES, PERMISSIONS } from "../config/roles";
// Import FontAwesome for icons
import "@fortawesome/fontawesome-free/css/all.min.css";

// Check if user has admin access (any admin role)
const hasAdminAccess = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const userRole = userInfo.role;
  console.log('AdminPanel - Checking access for role:', userRole);
  console.log('AdminPanel - Available roles:', [ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.JUNIOR_ADMIN, ROLES.INSTRUCTOR]);
  const hasAccess = [ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.JUNIOR_ADMIN, ROLES.INSTRUCTOR].includes(userRole);
  console.log('AdminPanel - Has access:', hasAccess);
  return hasAccess;
};

const AdminPanel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    console.log('AdminPanel - useEffect triggered');
    if (!hasAdminAccess()) {
      console.log('AdminPanel - No admin access, redirecting to login');
      navigate("/login");
    } else {
      console.log('AdminPanel - Admin access confirmed');
    }
  }, [navigate]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownOpen && !event.target.closest('.profile-dropdown')) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileDropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  // Get user role and menu items
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const userRole = userInfo.role;
  const menuItems = getMenuItemsForRole(userRole);

  return (
    <div className="ttr-wrapper" style={{ minHeight: "100vh", background: "#f5f6fa" }}>
      {/* Sidebar */}
      <div className={`ttr-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`} style={{ 
        width: sidebarCollapsed ? '60px' : '250px', 
        position: 'fixed', 
        left: 0, 
        top: 0, 
        height: '100vh', 
        background: '#fff', 
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
        zIndex: 1000,
        transition: 'width 0.3s ease'
      }}>
        {/* Logo */}
        <div className="sidebar-header" style={{ 
          padding: '20px', 
          borderBottom: '1px solid #eee',
          textAlign: sidebarCollapsed ? 'center' : 'left'
        }}>
          {!sidebarCollapsed && (
            <div>
              <h4 style={{ margin: 0, color: '#333' }}>Insta iQ Admin</h4>
              <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#666', textTransform: 'capitalize' }}>
                {userRole}
              </p>
            </div>
          )}
          {sidebarCollapsed && (
            <i className="fas fa-graduation-cap" style={{ fontSize: '24px', color: '#007bff' }}></i>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav" style={{ padding: '20px 0' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {menuItems.map((item, index) => (
              <PermissionRender
                key={index}
                userRole={userRole}
                requiredPermissions={[item.permission]}
                fallback={null}
              >
                <li style={{ marginBottom: '5px' }}>
                  <Link
                    to={item.path}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px 20px',
                      color: location.pathname === item.path ? '#007bff' : '#666',
                      textDecoration: 'none',
                      backgroundColor: location.pathname === item.path ? '#f8f9fa' : 'transparent',
                      borderLeft: location.pathname === item.path ? '3px solid #007bff' : '3px solid transparent',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (location.pathname !== item.path) {
                        e.target.style.backgroundColor = '#f8f9fa';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (location.pathname !== item.path) {
                        e.target.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <i className={item.icon} style={{ 
                      marginRight: sidebarCollapsed ? '0' : '10px', 
                      fontSize: '16px',
                      width: sidebarCollapsed ? 'auto' : '20px',
                      textAlign: 'center'
                    }}></i>
                    {!sidebarCollapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              </PermissionRender>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div style={{ 
          position: 'absolute', 
          bottom: '20px', 
          left: '20px', 
          right: '20px' 
        }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '12px',
              background: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
              fontSize: '14px'
            }}
          >
            <i className="fas fa-sign-out-alt" style={{ 
              marginRight: sidebarCollapsed ? '0' : '10px',
              fontSize: '16px'
            }}></i>
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ 
        marginLeft: sidebarCollapsed ? '60px' : '250px',
        transition: 'margin-left 0.3s ease'
      }}>
        {/* Top Header */}
        <div style={{ 
          background: '#fff', 
          padding: '15px 30px', 
          borderBottom: '1px solid #eee',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '18px',
                cursor: 'pointer',
                marginRight: '15px',
                color: '#666'
              }}
            >
              <i className="fas fa-bars"></i>
            </button>
            <h4 style={{ margin: 0, color: '#333' }}>
              {menuItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
            </h4>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <span style={{ marginRight: '15px', color: '#666' }}>
              Welcome, Admin
            </span>
            <div style={{ position: 'relative' }} className="profile-dropdown">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '5px',
                  borderRadius: '50%',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <i className="fas fa-user-circle" style={{ fontSize: '24px', color: '#007bff' }}></i>
              </button>
              
              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: '0',
                  background: '#fff',
                  border: '1px solid #eee',
                  borderRadius: '8px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                  minWidth: '200px',
                  zIndex: 1000,
                  marginTop: '5px'
                }}>
                  {/* Profile Header */}
                  <div style={{
                    padding: '15px',
                    borderBottom: '1px solid #eee',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      background: '#007bff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 10px auto'
                    }}>
                      <i className="fas fa-user" style={{ color: 'white', fontSize: '20px' }}></i>
                    </div>
                    <div style={{ fontWeight: 'bold', color: '#333', marginBottom: '5px' }}>
                      Admin User
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      admin@instaiq.in
                    </div>
                  </div>
                  
                  {/* Menu Items */}
                  <div style={{ padding: '5px 0' }}>
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        navigate('/admin/profile');
                      }}
                      style={{
                        width: '100%',
                        padding: '10px 15px',
                        background: 'none',
                        border: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '14px',
                        color: '#333',
                        transition: 'background-color 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      <i className="fas fa-user" style={{ marginRight: '10px', width: '16px' }}></i>
                      My Profile
                    </button>
                    
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        navigate('/admin/settings');
                      }}
                      style={{
                        width: '100%',
                        padding: '10px 15px',
                        background: 'none',
                        border: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '14px',
                        color: '#333',
                        transition: 'background-color 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      <i className="fas fa-cog" style={{ marginRight: '10px', width: '16px' }}></i>
                      Settings
                    </button>
                    
                    <div style={{ borderTop: '1px solid #eee', margin: '5px 0' }}></div>
                    
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        handleLogout();
                      }}
                      style={{
                        width: '100%',
                        padding: '10px 15px',
                        background: 'none',
                        border: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '14px',
                        color: '#dc3545',
                        transition: 'background-color 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#fff5f5'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      <i className="fas fa-sign-out-alt" style={{ marginRight: '10px', width: '16px' }}></i>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div style={{ padding: '30px' }}>
          <Routes>
            <Route path="/" element={
              <PermissionGuard userRole={userRole} requiredPermissions={[PERMISSIONS.VIEW_DASHBOARD]}>
                <AdminDashboard />
              </PermissionGuard>
            } />
            <Route path="courses" element={
              <PermissionGuard userRole={userRole} requiredPermissions={[PERMISSIONS.VIEW_COURSES]}>
                <CourseManagement />
              </PermissionGuard>
            } />
            <Route path="events" element={
              <PermissionGuard userRole={userRole} requiredPermissions={[PERMISSIONS.VIEW_EVENTS]}>
                <EventManagement />
              </PermissionGuard>
            } />
            <Route path="testimonials" element={
              <PermissionGuard userRole={userRole} requiredPermissions={[PERMISSIONS.VIEW_CONTENT]}>
                <TestimonialManagement />
              </PermissionGuard>
            } />
            <Route path="users" element={
              <PermissionGuard userRole={userRole} requiredPermissions={[PERMISSIONS.VIEW_USERS]}>
                <UserManagement />
              </PermissionGuard>
            } />
            <Route path="roles" element={
              <PermissionGuard userRole={userRole} requiredPermissions={[PERMISSIONS.MANAGE_USER_ROLES]}>
                <RoleManagement />
              </PermissionGuard>
            } />
            <Route path="orders" element={
              <PermissionGuard userRole={userRole} requiredPermissions={[PERMISSIONS.VIEW_ORDERS]}>
                <OrderManagement />
              </PermissionGuard>
            } />
            <Route path="profile" element={
              <PermissionGuard userRole={userRole} requiredPermissions={[PERMISSIONS.VIEW_PROFILE]}>
                <AdminProfile />
              </PermissionGuard>
            } />
            <Route path="settings" element={
              <PermissionGuard userRole={userRole} requiredPermissions={[PERMISSIONS.VIEW_SETTINGS]}>
                <Settings />
              </PermissionGuard>
            } />
          </Routes>
        </div>
        
        {/* Admin Footer */}
        <footer style={{ 
          background: '#fff', 
          padding: '15px 30px',
          borderTop: '1px solid #eee',
          marginTop: '20px',
          textAlign: 'center',
          fontSize: '14px',
          color: '#666'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              © {new Date().getFullYear()} Insta iQ Admin Panel. All rights reserved.
            </div>
            <div>
              <a href="https://instaiq.in" target="_blank" rel="noopener noreferrer" style={{ 
                color: '#007bff', 
                textDecoration: 'none',
                marginLeft: '15px'
              }}>
                <i className="fas fa-globe" style={{ marginRight: '5px' }}></i>
                Website
              </a>
              <a href="mailto:support@instaiq.in" style={{ 
                color: '#007bff', 
                textDecoration: 'none',
                marginLeft: '15px'
              }}>
                <i className="fas fa-envelope" style={{ marginRight: '5px' }}></i>
                Support
              </a>
            </div>
          </div>
        </footer>
      </div>
      {/* Back to Top button for admin panel */}
      <BackToTop />
    </div>
  );
};

export default AdminPanel;