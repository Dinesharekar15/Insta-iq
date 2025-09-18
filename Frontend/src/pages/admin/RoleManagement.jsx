import React, { useState, useEffect } from "react";
import { PermissionRender, usePermissions } from "../../components/PermissionGuard";
import { PERMISSIONS, ROLES, ROLE_PERMISSIONS } from "../../config/roles";

const RoleManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  // Sample users data
  const sampleUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      currentRole: "student",
      status: "active",
      joinDate: "2024-01-01"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      currentRole: "instructor",
      status: "active",
      joinDate: "2024-01-05"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      currentRole: "junior admin",
      status: "active",
      joinDate: "2024-01-10"
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah.wilson@example.com",
      currentRole: "super admin",
      status: "active",
      joinDate: "2024-01-15"
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUsers(sampleUsers);
      setLoading(false);
    }, 1000);
  }, []);

  const handleRoleChange = (userId, newRole) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, currentRole: newRole } : user
    ));
    setShowRoleModal(false);
    setSelectedUser(null);
  };

  const getRoleColor = (role) => {
    const colors = {
      'super admin': '#dc3545',
      'junior admin': '#fd7e14',
      'instructor': '#28a745',
      'student': '#17a2b8'
    };
    return colors[role] || '#6c757d';
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.currentRole === filterRole;
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <i className="fa fa-spinner fa-spin" style={{ fontSize: '24px', color: '#007bff' }}></i>
        <p>Loading role management...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ margin: 0, color: '#333' }}>Role Management</h2>
        <p style={{ margin: '5px 0 0 0', color: '#666' }}>Manage user roles and permissions</p>
      </div>

      {/* Filters */}
      <div style={{
        background: '#fff',
        borderRadius: '10px',
        padding: '25px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        border: '1px solid #eee',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
              Search Users
            </label>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '14px'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
              Filter by Role
            </label>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '14px'
              }}
            >
              <option value="all">All Roles</option>
              <option value="super admin">Super Admin</option>
              <option value="junior admin">Junior Admin</option>
              <option value="instructor">Instructor</option>
              <option value="student">Student</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
              Total Users
            </label>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
              {filteredUsers.length}
            </div>
          </div>
        </div>
      </div>

             {/* Access Control Matrix */}
       <div style={{
         background: '#fff',
         borderRadius: '10px',
         padding: '25px',
         boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
         border: '1px solid #eee',
         marginBottom: '20px'
       }}>
         <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>Access Control Matrix</h3>
         <div style={{ overflowX: 'auto' }}>
           <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
             <thead>
               <tr style={{ borderBottom: '2px solid #eee' }}>
                 <th style={{ 
                   textAlign: 'left', 
                   padding: '12px', 
                   color: '#333', 
                   fontWeight: 'bold',
                   background: '#f8f9fa',
                   border: '1px solid #dee2e6'
                 }}>
                   Feature
                 </th>
                 <th style={{ 
                   textAlign: 'center', 
                   padding: '12px', 
                   color: '#333', 
                   fontWeight: 'bold',
                   background: '#f8f9fa',
                   border: '1px solid #dee2e6'
                 }}>
                   Super Admin
                 </th>
                 <th style={{ 
                   textAlign: 'center', 
                   padding: '12px', 
                   color: '#333', 
                   fontWeight: 'bold',
                   background: '#f8f9fa',
                   border: '1px solid #dee2e6'
                 }}>
                   Junior Admin
                 </th>
                 <th style={{ 
                   textAlign: 'center', 
                   padding: '12px', 
                   color: '#333', 
                   fontWeight: 'bold',
                   background: '#f8f9fa',
                   border: '1px solid #dee2e6'
                 }}>
                   Instructor
                 </th>
                 <th style={{ 
                   textAlign: 'center', 
                   padding: '12px', 
                   color: '#333', 
                   fontWeight: 'bold',
                   background: '#f8f9fa',
                   border: '1px solid #dee2e6'
                 }}>
                   Student
                 </th>
               </tr>
             </thead>
             <tbody>
               <tr style={{ borderBottom: '1px solid #f8f9fa' }}>
                 <td style={{ 
                   padding: '12px', 
                   fontWeight: 'bold', 
                   color: '#333',
                   border: '1px solid #dee2e6'
                 }}>
                   Dashboard
                 </td>
                 <td style={{ 
                   textAlign: 'center', 
                   padding: '12px',
                   border: '1px solid #dee2e6'
                 }}>
                   <span style={{ color: '#28a745', fontWeight: 'bold' }}>✅</span>
                 </td>
                 <td style={{ 
                   textAlign: 'center', 
                   padding: '12px',
                   border: '1px solid #dee2e6'
                 }}>
                   <span style={{ color: '#28a745', fontWeight: 'bold' }}>✅</span>
                 </td>
                 <td style={{ 
                   textAlign: 'center', 
                   padding: '12px',
                   border: '1px solid #dee2e6'
                 }}>
                   <span style={{ color: '#28a745', fontWeight: 'bold' }}>✅</span>
                 </td>
                 <td style={{ 
                   textAlign: 'center', 
                   padding: '12px',
                   border: '1px solid #dee2e6'
                 }}>
                   <span style={{ color: '#dc3545', fontWeight: 'bold' }}>❌</span>
                 </td>
               </tr>
               <tr style={{ borderBottom: '1px solid #f8f9fa' }}>
                 <td style={{ 
                   padding: '12px', 
                   fontWeight: 'bold', 
                   color: '#333',
                   border: '1px solid #dee2e6'
                 }}>
                   User Management
                 </td>
                 <td style={{ 
                   textAlign: 'center', 
                   padding: '12px',
                   border: '1px solid #dee2e6'
                 }}>
                   <span style={{ color: '#28a745', fontWeight: 'bold' }}>✅</span>
                 </td>
                 <td style={{ 
                   textAlign: 'center', 
                   padding: '12px',
                   border: '1px solid #dee2e6'
                 }}>
                   <span style={{ color: '#28a745', fontWeight: 'bold' }}>✅</span>
                 </td>
                 <td style={{ 
                   textAlign: 'center', 
                   padding: '12px',
                   border: '1px solid #dee2e6'
                 }}>
                   <span style={{ color: '#dc3545', fontWeight: 'bold' }}>❌</span>
                 </td>
                 <td style={{ 
                   textAlign: 'center', 
                   padding: '12px',
                   border: '1px solid #dee2e6'
                 }}>
                   <span style={{ color: '#dc3545', fontWeight: 'bold' }}>❌</span>
                 </td>
               </tr>
               <tr style={{ borderBottom: '1px solid #f8f9fa' }}>
                 <td style={{ 
                   padding: '12px', 
                   fontWeight: 'bold', 
                   color: '#333',
                   border: '1px solid #dee2e6'
                 }}>
                   Role Management
                 </td>
                 <td style={{ 
                   textAlign: 'center', 
                   padding: '12px',
                   border: '1px solid #dee2e6'
                 }}>
                   <span style={{ color: '#28a745', fontWeight: 'bold' }}>✅</span>
                 </td>
                 <td style={{ 
                   textAlign: 'center', 
                   padding: '12px',
                   border: '1px solid #dee2e6'
                 }}>
                   <span style={{ color: '#dc3545', fontWeight: 'bold' }}>❌</span>
                 </td>
                 <td style={{ 
                   textAlign: 'center', 
                   padding: '12px',
                   border: '1px solid #dee2e6'
                 }}>
                   <span style={{ color: '#dc3545', fontWeight: 'bold' }}>❌</span>
                 </td>
                 <td style={{ 
                   textAlign: 'center', 
                   padding: '12px',
                   border: '1px solid #dee2e6'
                 }}>
                   <span style={{ color: '#dc3545', fontWeight: 'bold' }}>❌</span>
                 </td>
               </tr>
               <tr style={{ borderBottom: '1px solid #f8f9fa' }}>
                 <td style={{ 
                   padding: '12px', 
                   fontWeight: 'bold', 
                   color: '#333',
                   border: '1px solid #dee2e6'
                 }}>
                   Course Management
                 </td>
                 <td style={{ 
                   textAlign: 'center', 
                   padding: '12px',
                   border: '1px solid #dee2e6'
                 }}>
                   <span style={{ color: '#28a745', fontWeight: 'bold' }}>✅</span>
                 </td>
                 <td style={{ 
                   textAlign: 'center', 
                   padding: '12px',
                   border: '1px solid #dee2e6'
                 }}>
                   <span style={{ color: '#28a745', fontWeight: 'bold' }}>✅</span>
                 </td>
                 <td style={{ 
                   textAlign: 'center', 
                   padding: '12px',
                   border: '1px solid #dee2e6'
                 }}>
                   <span style={{ color: '#28a745', fontWeight: 'bold' }}>✅</span>
                 </td>
                 <td style={{ 
                   textAlign: 'center', 
                   padding: '12px',
                   border: '1px solid #dee2e6'
                 }}>
                   <span style={{ color: '#dc3545', fontWeight: 'bold' }}>❌</span>
                 </td>
               </tr>
               <tr style={{ borderBottom: '1px solid #f8f9fa' }}>
                 <td style={{ 
                   padding: '12px', 
                   fontWeight: 'bold', 
                   color: '#333',
                   border: '1px solid #dee2e6'
                 }}>
                   Event Management
                 </td>
                 <td style={{ 
                   textAlign: 'center', 
                   padding: '12px',
                   border: '1px solid #dee2e6'
                 }}>
                   <span style={{ color: '#28a745', fontWeight: 'bold' }}>✅</span>
                 </td>
                 <td style={{ 
                   textAlign: 'center', 
                   padding: '12px',
                   border: '1px solid #dee2e6'
                 }}>
                   <span style={{ color: '#28a745', fontWeight: 'bold' }}>✅</span>
                 </td>
                 <td style={{ 
                   textAlign: 'center', 
                   padding: '12px',
                   border: '1px solid #dee2e6'
                 }}>
                   <span style={{ color: '#dc3545', fontWeight: 'bold' }}>❌</span>
                 </td>
                 <td style={{ 
                   textAlign: 'center', 
                   padding: '12px',
                   border: '1px solid #dee2e6'
                 }}>
                   <span style={{ color: '#dc3545', fontWeight: 'bold' }}>❌</span>
                 </td>
               </tr>
               <tr style={{ borderBottom: '1px solid #f8f9fa' }}>
                 <td style={{ 
                   padding: '12px', 
                   fontWeight: 'bold', 
                   color: '#333',
                   border: '1px solid #dee2e6'
                 }}>
                   Content Management
                 </td>
                 <td style={{ 
                   textAlign: 'center', 
                   padding: '12px',
                   border: '1px solid #dee2e6'
                 }}>
                   <span style={{ color: '#28a745', fontWeight: 'bold' }}>✅</span>
                 </td>
                 <td style={{ 
                   textAlign: 'center', 
                   padding: '12px',
                   border: '1px solid #dee2e6'
                 }}>
                   <span style={{ color: '#28a745', fontWeight: 'bold' }}>✅</span>
                 </td>
                 <td style={{ 
                   textAlign: 'center', 
                   padding: '12px',
                   border: '1px solid #dee2e6'
                 }}>
                   <span style={{ color: '#28a745', fontWeight: 'bold' }}>✅</span>
                 </td>
                 <td style={{ 
                   textAlign: 'center', 
                   padding: '12px',
                   border: '1px solid #dee2e6'
                 }}>
                   <span style={{ color: '#dc3545', fontWeight: 'bold' }}>❌</span>
                 </td>
               </tr>
               <tr style={{ borderBottom: '1px solid #f8f9fa' }}>
                 <td style={{ 
                   padding: '12px', 
                   fontWeight: 'bold', 
                   color: '#333',
                   border: '1px solid #dee2e6'
                 }}>
                   Order Management
                 </td>
                 <td style={{ 
                   textAlign: 'center', 
                   padding: '12px',
                   border: '1px solid #dee2e6'
                 }}>
                   <span style={{ color: '#28a745', fontWeight: 'bold' }}>✅</span>
                 </td>
                 <td style={{ 
                   textAlign: 'center', 
                   padding: '12px',
                   border: '1px solid #dee2e6'
                 }}>
                   <span style={{ color: '#28a745', fontWeight: 'bold' }}>✅</span>
                 </td>
                 <td style={{ 
                   textAlign: 'center', 
                   padding: '12px',
                   border: '1px solid #dee2e6'
                 }}>
                   <span style={{ color: '#dc3545', fontWeight: 'bold' }}>❌</span>
                 </td>
                 <td style={{ 
                   textAlign: 'center', 
                   padding: '12px',
                   border: '1px solid #dee2e6'
                 }}>
                   <span style={{ color: '#dc3545', fontWeight: 'bold' }}>❌</span>
                 </td>
               </tr>
               <tr style={{ borderBottom: '1px solid #f8f9fa' }}>
                 <td style={{ 
                   padding: '12px', 
                   fontWeight: 'bold', 
                   color: '#333',
                   border: '1px solid #dee2e6'
                 }}>
                   Settings
                 </td>
                 <td style={{ 
                   textAlign: 'center', 
                   padding: '12px',
                   border: '1px solid #dee2e6'
                 }}>
                   <span style={{ color: '#28a745', fontWeight: 'bold' }}>✅</span>
                 </td>
                 <td style={{ 
                   textAlign: 'center', 
                   padding: '12px',
                   border: '1px solid #dee2e6'
                 }}>
                   <span style={{ color: '#dc3545', fontWeight: 'bold' }}>❌</span>
                 </td>
                 <td style={{ 
                   textAlign: 'center', 
                   padding: '12px',
                   border: '1px solid #dee2e6'
                 }}>
                   <span style={{ color: '#dc3545', fontWeight: 'bold' }}>❌</span>
                 </td>
                 <td style={{ 
                   textAlign: 'center', 
                   padding: '12px',
                   border: '1px solid #dee2e6'
                 }}>
                   <span style={{ color: '#dc3545', fontWeight: 'bold' }}>❌</span>
                 </td>
               </tr>
               <tr style={{ borderBottom: '1px solid #f8f9fa' }}>
                 <td style={{ 
                   padding: '12px', 
                   fontWeight: 'bold', 
                   color: '#333',
                   border: '1px solid #dee2e6'
                 }}>
                   Profile
                 </td>
                 <td style={{ 
                   textAlign: 'center', 
                   padding: '12px',
                   border: '1px solid #dee2e6'
                 }}>
                   <span style={{ color: '#28a745', fontWeight: 'bold' }}>✅</span>
                 </td>
                 <td style={{ 
                   textAlign: 'center', 
                   padding: '12px',
                   border: '1px solid #dee2e6'
                 }}>
                   <span style={{ color: '#28a745', fontWeight: 'bold' }}>✅</span>
                 </td>
                 <td style={{ 
                   textAlign: 'center', 
                   padding: '12px',
                   border: '1px solid #dee2e6'
                 }}>
                   <span style={{ color: '#28a745', fontWeight: 'bold' }}>✅</span>
                 </td>
                 <td style={{ 
                   textAlign: 'center', 
                   padding: '12px',
                   border: '1px solid #dee2e6'
                 }}>
                   <span style={{ color: '#28a745', fontWeight: 'bold' }}>✅</span>
                 </td>
               </tr>
             </tbody>
           </table>
         </div>
         
         <div style={{ 
           marginTop: '20px', 
           padding: '15px', 
           background: '#f8f9fa', 
           borderRadius: '8px',
           border: '1px solid #dee2e6'
         }}>
           <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>Legend</h4>
           <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
               <span style={{ color: '#28a745', fontWeight: 'bold', fontSize: '16px' }}>✅</span>
               <span style={{ fontSize: '14px', color: '#666' }}>Full Access</span>
             </div>
             <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
               <span style={{ color: '#dc3545', fontWeight: 'bold', fontSize: '16px' }}>❌</span>
               <span style={{ fontSize: '14px', color: '#666' }}>No Access</span>
             </div>
           </div>
         </div>
       </div>

       {/* Users Table */}
       <div style={{
         background: '#fff',
         borderRadius: '10px',
         padding: '25px',
         boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
         border: '1px solid #eee'
       }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #eee' }}>
                <th style={{ textAlign: 'left', padding: '15px 0', color: '#333', fontWeight: 'bold' }}>User</th>
                <th style={{ textAlign: 'left', padding: '15px 0', color: '#333', fontWeight: 'bold' }}>Current Role</th>
                <th style={{ textAlign: 'left', padding: '15px 0', color: '#333', fontWeight: 'bold' }}>Status</th>
                <th style={{ textAlign: 'left', padding: '15px 0', color: '#333', fontWeight: 'bold' }}>Join Date</th>
                <th style={{ textAlign: 'left', padding: '15px 0', color: '#333', fontWeight: 'bold' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} style={{ borderBottom: '1px solid #f8f9fa' }}>
                  <td style={{ padding: '15px 0' }}>
                    <div>
                      <div style={{ fontWeight: 'bold', color: '#333', marginBottom: '5px' }}>
                        {user.name}
                      </div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {user.email}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '15px 0' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      background: getRoleColor(user.currentRole) + '20',
                      color: getRoleColor(user.currentRole)
                    }}>
                      {user.currentRole}
                    </span>
                  </td>
                  <td style={{ padding: '15px 0' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      background: user.status === 'active' ? '#d4edda' : '#f8d7da',
                      color: user.status === 'active' ? '#155724' : '#721c24'
                    }}>
                      {user.status}
                    </span>
                  </td>
                  <td style={{ padding: '15px 0', color: '#666' }}>
                    {new Date(user.joinDate).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '15px 0' }}>
                    <PermissionRender
                      userRole="super admin"
                      requiredPermissions={[PERMISSIONS.MANAGE_USER_ROLES]}
                      fallback={<span style={{ color: '#999', fontSize: '12px' }}>No permission</span>}
                    >
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowRoleModal(true);
                        }}
                        style={{
                          background: '#007bff',
                          color: 'white',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        Change Role
                      </button>
                    </PermissionRender>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Change Modal */}
      {showRoleModal && selectedUser && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '10px',
            padding: '30px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>
              Change Role for {selectedUser.name}
            </h3>
            
            <div style={{ marginBottom: '20px' }}>
              <p style={{ margin: '0 0 10px 0', color: '#666' }}>
                Current Role: <strong>{selectedUser.currentRole}</strong>
              </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                New Role
              </label>
              <select
                id="newRole"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '14px'
                }}
              >
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
                <option value="junior admin">Junior Admin</option>
                <option value="super admin">Super Admin</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setShowRoleModal(false);
                  setSelectedUser(null);
                }}
                style={{
                  background: '#6c757d',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const newRole = document.getElementById('newRole').value;
                  handleRoleChange(selectedUser.id, newRole);
                }}
                style={{
                  background: '#28a745',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Update Role
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleManagement;
