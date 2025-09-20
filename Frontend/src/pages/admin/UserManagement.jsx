import React, { useState, useEffect } from "react";
import { PermissionRender } from "../../components/PermissionGuard";
import { PERMISSIONS } from "../../config/roles";
import { userAPI, handleApiError } from "../../services/api";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    role: "student",
    status: "active",
    password: ""
  });
  const [formErrors, setFormErrors] = useState({});

  // Load users from API
  const fetchUsers = async (page = 1, search = "", role = "all", status = "all") => {
    try {
      setLoading(true);
      setError("");
      
      const params = {
        page,
        limit: pagination.limit,
        ...(search && { search }),
        ...(role !== "all" && { role }),
        ...(status !== "all" && { status })
      };

      const response = await userAPI.getUsers(params);
      
      if (response.success) {
        setUsers(response.data.users || response.data || []);
        setPagination(prev => ({
          ...prev,
          page: response.data.pagination?.page || page,
          total: response.data.pagination?.total || response.data.length || 0,
          totalPages: response.data.pagination?.totalPages || Math.ceil((response.data.length || 0) / prev.limit)
        }));
      } else {
        setError(response.message || "Failed to fetch users");
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(handleApiError(error));
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Form validation
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    
    if (!formData.mobile.trim()) {
      errors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      errors.mobile = "Mobile number must be 10 digits";
    }
    
    if (!editingUser && !formData.password.trim()) {
      errors.password = "Password is required";
    } else if (!editingUser && formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    
    if (!formData.role) {
      errors.role = "Role is required";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setActionLoading(true);
      setError("");
      setSuccess("");

      console.log("=== User Update Debug ===");
      console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api");
      console.log("Editing user:", editingUser ? "Update" : "Create");
      console.log("Form data:", formData);

      let response;
      if (editingUser) {
        const updateData = { ...formData };
        delete updateData.password; // Don't send password in update
        console.log("Update data:", updateData);
        console.log("User ID:", editingUser._id);
        
        response = await userAPI.updateUser(editingUser._id, updateData);
      } else {
        response = await userAPI.createUser(formData);
      }

      console.log("API Response:", response);

      if (response.success) {
        setSuccess(editingUser ? "User updated successfully!" : "User created successfully!");
        handleCloseModal();
        fetchUsers(pagination.page, searchTerm, filterRole, filterStatus);
      } else {
        setError(response.message || "Operation failed");
      }
    } catch (error) {
      console.error("=== User Update Error Details ===");
      console.error("Full error:", error);
      console.error("Error message:", error.message);
      console.error("Error code:", error.code);
      console.error("Error response:", error.response);
      console.error("Error request:", error.request);
      
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Network error - no response received");
        console.error("Request details:", error.request);
      }
      
      setError(handleApiError(error));
    } finally {
      setActionLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingUser(null);
    setFormData({
      name: "",
      email: "",
      mobile: "",
      role: "student",
      status: "active",
      password: ""
    });
    setFormErrors({});
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      mobile: user.mobile || user.phone || "",
      role: user.role || "student",
      status: user.status || "active",
      password: ""
    });
    setShowAddModal(true);
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      setActionLoading(true);
      const response = await userAPI.deleteUser(userId);

      if (response.success) {
        setSuccess("User deleted successfully!");
        fetchUsers(pagination.page, searchTerm, filterRole, filterStatus);
      } else {
        setError(response.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      setError(handleApiError(error));
    } finally {
      setActionLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchUsers(1, searchTerm, filterRole, filterStatus);
  };

  const handleFilterChange = (type, value) => {
    if (type === "role") {
      setFilterRole(value);
    } else if (type === "status") {
      setFilterStatus(value);
    }
    
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchUsers(1, searchTerm, type === "role" ? value : filterRole, type === "status" ? value : filterStatus);
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    fetchUsers(newPage, searchTerm, filterRole, filterStatus);
  };

  const getStatusBadge = (status) => {
    const isActive = status === "active";
    return (
      <span style={{
        padding: "4px 8px",
        borderRadius: "12px",
        fontSize: "12px",
        fontWeight: "500",
        color: isActive ? "#155724" : "#721c24",
        backgroundColor: isActive ? "#d4edda" : "#f8d7da",
        border: `1px solid ${isActive ? "#c3e6cb" : "#f5c6cb"}`
      }}>
        {status || "active"}
      </span>
    );
  };

  const getRoleBadge = (role) => {
    const colors = {
      "super admin": { bg: "#d4edda", color: "#155724", border: "#c3e6cb" },
      "admin": { bg: "#d1ecf1", color: "#0c5460", border: "#bee5eb" },
      "junior admin": { bg: "#fff3cd", color: "#856404", border: "#ffeaa7" },
      "instructor": { bg: "#f8d7da", color: "#721c24", border: "#f5c6cb" },
      "student": { bg: "#e2e3e5", color: "#383d41", border: "#d6d8db" }
    };

    const style = colors[role] || colors.student;

    return (
      <span style={{
        padding: "4px 8px",
        borderRadius: "12px",
        fontSize: "12px",
        fontWeight: "500",
        color: style.color,
        backgroundColor: style.bg,
        border: `1px solid ${style.border}`,
        textTransform: "capitalize"
      }}>
        {role || "student"}
      </span>
    );
  };

  if (loading) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "400px",
        fontSize: "18px"
      }}>
        <i className="fa fa-spinner fa-spin" style={{ marginRight: "10px" }}></i>
        Loading users...
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: "30px" 
      }}>
        <h2 style={{ color: "#333", margin: 0 }}>User Management</h2>
        
        <PermissionRender permission={PERMISSIONS.MANAGE_USERS}>
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              background: "#17a2b8",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <i className="fa fa-plus"></i>
            Add New User
          </button>
        </PermissionRender>
      </div>

      {error && (
        <div style={{
          background: "#f8d7da",
          color: "#721c24",
          padding: "12px",
          borderRadius: "5px",
          marginBottom: "20px",
          border: "1px solid #f5c6cb"
        }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{
          background: "#d4edda",
          color: "#155724",
          padding: "12px",
          borderRadius: "5px",
          marginBottom: "20px",
          border: "1px solid #c3e6cb"
        }}>
          {success}
        </div>
      )}

      {/* Search and Filters */}
      <div style={{ 
        background: "#f8f9fa", 
        padding: "20px", 
        borderRadius: "8px", 
        marginBottom: "20px" 
      }}>
        <form onSubmit={handleSearch} style={{ display: "flex", gap: "15px", alignItems: "end", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: "200px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "#555" }}>
              Search Users
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, email, or mobile..."
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "14px"
              }}
            />
          </div>
          
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "#555" }}>
              Role
            </label>
            <select
              value={filterRole}
              onChange={(e) => handleFilterChange("role", e.target.value)}
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "14px"
              }}
            >
              <option value="all">All Roles</option>
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
              <option value="admin">Admin</option>
              <option value="junior admin">Junior Admin</option>
              <option value="super admin">Super Admin</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "#555" }}>
              Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "14px"
              }}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          <button
            type="submit"
            style={{
              background: "#17a2b8",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "14px"
            }}
          >
            <i className="fa fa-search"></i> Search
          </button>
        </form>
      </div>

      {/* Users Table */}
      <div style={{ 
        background: "white", 
        borderRadius: "8px", 
        overflow: "hidden",
        border: "1px solid #ddd"
      }}>
        {users.length === 0 ? (
          <div style={{ 
            padding: "40px", 
            textAlign: "center", 
            color: "#666",
            fontSize: "16px"
          }}>
            <i className="fa fa-users" style={{ fontSize: "48px", marginBottom: "15px", display: "block" }}></i>
            {searchTerm || filterRole !== "all" || filterStatus !== "all" 
              ? "No users found matching your criteria." 
              : "No users found. Add your first user to get started."
            }
          </div>
        ) : (
          <>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ background: "#f8f9fa" }}>
                <tr>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Avatar</th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #ddd" }}>User Details</th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Contact</th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Role</th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Status</th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Joined</th>
                  <th style={{ padding: "15px", textAlign: "center", borderBottom: "1px solid #ddd" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id || index} style={{ borderBottom: "1px solid #f1f1f1" }}>
                    <td style={{ padding: "15px" }}>
                      <img
                        src={user.profileImage || user.avatar || "https://via.placeholder.com/40x40/17a2b8/ffffff?text=U"}
                        alt="Avatar"
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          objectFit: "cover"
                        }}
                      />
                    </td>
                    <td style={{ padding: "15px" }}>
                      <div>
                        <div style={{ fontWeight: "500", color: "#333", marginBottom: "2px" }}>
                          {user.name || "N/A"}
                        </div>
                        <div style={{ fontSize: "13px", color: "#666" }}>
                          {user.email || "N/A"}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "15px", fontSize: "14px", color: "#666" }}>
                      {user.mobile || user.phone || "N/A"}
                    </td>
                    <td style={{ padding: "15px" }}>
                      {getRoleBadge(user.role)}
                    </td>
                    <td style={{ padding: "15px" }}>
                      {getStatusBadge(user.status)}
                    </td>
                    <td style={{ padding: "15px", fontSize: "14px", color: "#666" }}>
                      {user.createdAt 
                        ? new Date(user.createdAt).toLocaleDateString() 
                        : "N/A"
                      }
                    </td>
                    <td style={{ padding: "15px", textAlign: "center" }}>
                      <PermissionRender permission={PERMISSIONS.MANAGE_USERS}>
                        <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                          <button
                            onClick={() => handleEditUser(user)}
                            disabled={actionLoading}
                            style={{
                              background: "#17a2b8",
                              color: "white",
                              border: "none",
                              padding: "6px 12px",
                              borderRadius: "4px",
                              cursor: actionLoading ? "not-allowed" : "pointer",
                              fontSize: "12px"
                            }}
                            title="Edit User"
                          >
                            <i className="fa fa-edit"></i>
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            disabled={actionLoading}
                            style={{
                              background: "#dc3545",
                              color: "white",
                              border: "none",
                              padding: "6px 12px",
                              borderRadius: "4px",
                              cursor: actionLoading ? "not-allowed" : "pointer",
                              fontSize: "12px"
                            }}
                            title="Delete User"
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>
                      </PermissionRender>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div style={{ 
              padding: "20px", 
              borderTop: "1px solid #f1f1f1",
              display: "flex", 
              justifyContent: "space-between",
              alignItems: "center",
              background: "#f8f9fa"
            }}>
              <div style={{ fontSize: "14px", color: "#666" }}>
                Showing {((pagination.page - 1) * pagination.limit) + 1} to{" "}
                {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
                {pagination.total} users
              </div>
              
              <div style={{ display: "flex", gap: "5px" }}>
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  style={{
                    padding: "8px 12px",
                    border: "1px solid #ddd",
                    background: pagination.page === 1 ? "#f8f9fa" : "white",
                    color: pagination.page === 1 ? "#6c757d" : "#17a2b8",
                    borderRadius: "4px",
                    cursor: pagination.page === 1 ? "not-allowed" : "pointer",
                    fontSize: "14px"
                  }}
                >
                  Previous
                </button>
                
                {[...Array(pagination.totalPages)].map((_, index) => {
                  const pageNum = index + 1;
                  const isCurrentPage = pageNum === pagination.page;
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      style={{
                        padding: "8px 12px",
                        border: "1px solid #ddd",
                        background: isCurrentPage ? "#17a2b8" : "white",
                        color: isCurrentPage ? "white" : "#17a2b8",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "14px"
                      }}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                  style={{
                    padding: "8px 12px",
                    border: "1px solid #ddd",
                    background: pagination.page === pagination.totalPages ? "#f8f9fa" : "white",
                    color: pagination.page === pagination.totalPages ? "#6c757d" : "#17a2b8",
                    borderRadius: "4px",
                    cursor: pagination.page === pagination.totalPages ? "not-allowed" : "pointer",
                    fontSize: "14px"
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Add/Edit User Modal */}
      {showAddModal && (
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
            width: '90%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, color: '#333' }}>
                {editingUser ? 'Edit User' : 'Add New User'}
              </h3>
              <button
                onClick={handleCloseModal}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: formErrors.name ? '1px solid #dc3545' : '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '14px'
                    }}
                  />
                  {formErrors.name && (
                    <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                      {formErrors.name}
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: formErrors.email ? '1px solid #dc3545' : '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '14px'
                    }}
                  />
                  {formErrors.email && (
                    <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                      {formErrors.email}
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="10-digit mobile number"
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: formErrors.mobile ? '1px solid #dc3545' : '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '14px'
                    }}
                  />
                  {formErrors.mobile && (
                    <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                      {formErrors.mobile}
                    </div>
                  )}
                </div>

                {!editingUser && (
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                      Password *
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Minimum 6 characters"
                      required
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: formErrors.password ? '1px solid #dc3545' : '1px solid #ddd',
                        borderRadius: '5px',
                        fontSize: '14px'
                      }}
                    />
                    {formErrors.password && (
                      <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                        {formErrors.password}
                      </div>
                    )}
                  </div>
                )}

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                    Role *
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
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
                    <option value="admin">Admin</option>
                    <option value="junior admin">Junior Admin</option>
                    <option value="super admin">Super Admin</option>
                  </select>
                  {formErrors.role && (
                    <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                      {formErrors.role}
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '14px'
                    }}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                <button
                  type="submit"
                  disabled={actionLoading}
                  style={{
                    background: actionLoading ? '#6c757d' : '#17a2b8',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '5px',
                    cursor: actionLoading ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  {actionLoading && <i className="fa fa-spinner fa-spin"></i>}
                  {actionLoading ? 'Processing...' : (editingUser ? 'Update User' : 'Add User')}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={actionLoading}
                  style={{
                    background: '#6c757d',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '5px',
                    cursor: actionLoading ? 'not-allowed' : 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;