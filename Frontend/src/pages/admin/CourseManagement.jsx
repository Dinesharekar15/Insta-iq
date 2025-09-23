import React, { useState, useEffect } from "react";
import { PermissionRender } from "../../components/PermissionGuard";
import { PERMISSIONS } from "../../config/roles";
import { courseAPI, handleApiError } from "../../services/api";
import ImageUpload from "../../components/ImageUpload";

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterLevel, setFilterLevel] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    category: "aptitude",
    level: "Beginner",
    instructor: "InstaIQ Team",
    imageUrl: "",
    isActive: true,
    details: []
  });
  const [formErrors, setFormErrors] = useState({});
  const [courseDetails, setCourseDetails] = useState([""]);
  const [selectedImage, setSelectedImage] = useState(null);

  // Load courses from API
  const fetchCourses = async (page = 1, search = "", category = "all", level = "all", isActive = "all") => {
    try {
      setLoading(true);
      setError("");
      
      console.log("=== Fetching Courses Debug ===");
      console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api");
      
      // Check authentication
      const userInfo = localStorage.getItem('userInfo');
      console.log("User Info from localStorage:", userInfo ? "Present" : "Missing");
      
      if (!userInfo) {
        setError("Please log in to access course management");
        setCourses([]);
        setLoading(false);
        return;
      }
      
      const parsedUserInfo = JSON.parse(userInfo);
      console.log("User role:", parsedUserInfo?.role);
      console.log("User token present:", !!parsedUserInfo?.token);
      
      const params = {
        page,
        limit: pagination.limit,
        ...(search && { search }),
        ...(category !== "all" && { category }),
        ...(level !== "all" && { level }),
        ...(isActive !== "all" && { isActive })
      };

      console.log("Making API call with params:", params);
      console.log("User token present:", JSON.parse(localStorage.getItem('userInfo') || '{}')?.token ? 'Yes' : 'No');
      
      const response = await courseAPI.getCourses(params);
      
      // Debug log to see the actual response structure
      console.log("API Response received:", response);
      console.log("Response type:", typeof response);
      console.log("Is response null/undefined?", response === null || response === undefined);
      
      // Check if response exists at all
      if (!response) {
        setError("No response received from server");
        setCourses([]);
        return;
      }
      
      if (response && response.success) {
        // Handle the courses array - it might be empty but still valid
        setCourses(Array.isArray(response.courses) ? response.courses : []);
        
        // Update pagination if provided
        if (response.pagination) {
          setPagination(prev => ({
            ...prev,
            page: response.pagination.page || page,
            total: response.pagination.total || 0,
            totalPages: response.pagination.totalPages || 1
          }));
        } else {
          // Fallback pagination calculation
          const coursesArray = Array.isArray(response.courses) ? response.courses : [];
          setPagination(prev => ({
            ...prev,
            page: page,
            total: coursesArray.length,
            totalPages: Math.ceil(coursesArray.length / prev.limit)
          }));
        }
      } else if (response && Array.isArray(response)) {
        // Fallback if response is just an array of courses
        setCourses(response);
        setPagination(prev => ({
          ...prev,
          page: page,
          total: response.length,
          totalPages: Math.ceil(response.length / prev.limit)
        }));
      } else {
        console.error("Unexpected response structure:", response);
        setError(response?.message || "Invalid response from server");
        setCourses([]);
      }
    } catch (error) {
      console.error("=== Error Details ===");
      console.error("Full error object:", error);
      console.error("Error message:", error.message);
      console.error("Error code:", error.code);
      console.error("Error response:", error.response);
      console.error("Error request:", error.request);
      
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
        
        if (error.response.status === 401) {
          setError("Authentication failed. Please log in again.");
          localStorage.removeItem('userInfo');
        } else if (error.response.status === 403) {
          setError("You don't have permission to access course management.");
        } else if (error.response.status === 500) {
          setError("Server error. Please try again later.");
        } else {
          setError(error.response?.data?.message || `Server returned status ${error.response.status}`);
        }
      } else if (error.request) {
        console.error("Network error - no response received");
        setError(`Network error: Cannot connect to backend at ${import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api"}. Please check if the server is running.`);
      } else {
        console.error("Request setup error");
        setError("Request failed: " + error.message);
      }
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Form validation
  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) {
      errors.title = "Title is required";
    }
    
    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }
    
    if (!formData.price && formData.price !== 0) {
      errors.price = "Price is required";
    } else if (isNaN(formData.price) || parseFloat(formData.price) < 0) {
      errors.price = "Price must be a valid number";
    }
    
    if (!formData.duration.trim()) {
      errors.duration = "Duration is required";
    }
    
    if (!formData.category.trim()) {
      errors.category = "Category is required";
    }
    
    if (!formData.imageUrl.trim() && !selectedImage) {
      errors.imageUrl = "Course image is required (upload file or provide URL)";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear field error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleDetailsChange = (index, value) => {
    const newDetails = [...courseDetails];
    newDetails[index] = value;
    setCourseDetails(newDetails);
    setFormData(prev => ({ ...prev, details: newDetails.filter(detail => detail.trim()) }));
  };

  const addDetailField = () => {
    setCourseDetails([...courseDetails, ""]);
  };

  const removeDetailField = (index) => {
    const newDetails = courseDetails.filter((_, i) => i !== index);
    setCourseDetails(newDetails);
    setFormData(prev => ({ ...prev, details: newDetails.filter(detail => detail.trim()) }));
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

      // Create FormData for file upload
      const formDataToSend = new FormData();
      
      // Append form fields
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', parseFloat(formData.price) || 0);
      formDataToSend.append('duration', formData.duration);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('level', formData.level);
      formDataToSend.append('instructor', formData.instructor);
      formDataToSend.append('isActive', formData.isActive);
      
      // Append details array
      const filteredDetails = courseDetails.filter(detail => detail.trim());
      formDataToSend.append('details', JSON.stringify(filteredDetails));

      // Append image file if selected, otherwise use existing imageUrl
      if (selectedImage) {
        formDataToSend.append('image', selectedImage);
      } else if (formData.imageUrl) {
        // For updates without new image, send the existing URL
        formDataToSend.append('imageUrl', formData.imageUrl);
      }

      let response;
      if (editingCourse) {
        response = await courseAPI.updateCourseWithImage(editingCourse._id, formDataToSend);
      } else {
        response = await courseAPI.createCourseWithImage(formDataToSend);
      }

      if (response.success) {
        setSuccess(editingCourse ? "Course updated successfully!" : "Course created successfully!");
        handleCloseModal();
        fetchCourses(pagination.page, searchTerm, filterCategory, filterLevel, filterStatus);
      } else {
        setError(response.message || "Operation failed");
      }
    } catch (error) {
      console.error("Error saving course:", error);
      setError(handleApiError(error));
    } finally {
      setActionLoading(false);
    }
  };

  // Image upload handler
  const handleImageSelect = (file) => {
    setSelectedImage(file);
    // Clear imageUrl when a new file is selected
    setFormData(prev => ({ ...prev, imageUrl: "" }));
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingCourse(null);
    setFormData({
      title: "",
      description: "",
      price: "",
      duration: "",
      category: "aptitude",
      level: "Beginner",
      instructor: "InstaIQ Team",
      imageUrl: "",
      isActive: true,
      details: []
    });
    setCourseDetails([""]);
    setFormErrors({});
    setSelectedImage(null);
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title || "",
      description: course.description || "",
      price: course.price || "",
      duration: course.duration || "",
      category: course.category || "",
      level: course.level || "Beginner",
      instructor: course.instructor || "InstaIQ Team",
      imageUrl: course.imageUrl || "",
      isActive: course.isActive !== undefined ? course.isActive : true,
      details: course.details || []
    });
    setCourseDetails(course.details?.length ? course.details : [""]);
    setShowAddModal(true);
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course? This action cannot be undone.")) {
      return;
    }

    try {
      setActionLoading(true);
      const response = await courseAPI.deleteCourse(courseId);

      if (response.success) {
        setSuccess("Course deleted successfully!");
        fetchCourses(pagination.page, searchTerm, filterCategory, filterLevel, filterStatus);
      } else {
        setError(response.message || "Failed to delete course");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      setError(handleApiError(error));
    } finally {
      setActionLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchCourses(1, searchTerm, filterCategory, filterLevel, filterStatus);
  };

  const handleFilterChange = (type, value) => {
    if (type === "category") {
      setFilterCategory(value);
    } else if (type === "level") {
      setFilterLevel(value);
    } else if (type === "status") {
      setFilterStatus(value);
    }
    
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchCourses(1, searchTerm, 
      type === "category" ? value : filterCategory,
      type === "level" ? value : filterLevel, 
      type === "status" ? value : filterStatus
    );
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    fetchCourses(newPage, searchTerm, filterCategory, filterLevel, filterStatus);
  };

  const getStatusBadge = (isActive) => {
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
        {isActive ? "Active" : "Inactive"}
      </span>
    );
  };

  const getLevelBadge = (level) => {
    const colors = {
      "Beginner": { bg: "#d4edda", color: "#155724", border: "#c3e6cb" },
      "Intermediate": { bg: "#fff3cd", color: "#856404", border: "#ffeaa7" },
      "Advanced": { bg: "#f8d7da", color: "#721c24", border: "#f5c6cb" }
    };

    const style = colors[level] || colors.Beginner;

    return (
      <span style={{
        padding: "4px 8px",
        borderRadius: "12px",
        fontSize: "12px",
        fontWeight: "500",
        color: style.color,
        backgroundColor: style.bg,
        border: `1px solid ${style.border}`
      }}>
        {level || "Beginner"}
      </span>
    );
  };

  const formatPrice = (price) => {
    if (price === 0) return "Free";
    return `₹${price.toLocaleString()}`;
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
        Loading courses...
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
        <h2 style={{ color: "#333", margin: 0 }}>Course Management</h2>
        
        <PermissionRender permission={PERMISSIONS.MANAGE_COURSES}>
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              background: "#28a745",
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
            Add New Course
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
              Search Courses
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, description, instructor, or category..."
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
              Category
            </label>
            <select
              value={filterCategory}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "14px"
              }}
            >
              <option value="all">All Categories</option>
              <option value="aptitude">Aptitude</option>
              <option value="technical">Technical</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "#555" }}>
              Level
            </label>
            <select
              value={filterLevel}
              onChange={(e) => handleFilterChange("level", e.target.value)}
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "14px"
              }}
            >
              <option value="all">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
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
              <option value="true">Active</option>
              <option value="false">Inactive</option>
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

      {/* Courses Table */}
      <div style={{ 
        background: "white", 
        borderRadius: "8px", 
        overflow: "hidden",
        border: "1px solid #ddd"
      }}>
        {courses.length === 0 ? (
          <div style={{ 
            padding: "40px", 
            textAlign: "center", 
            color: "#666",
            fontSize: "16px"
          }}>
            <i className="fa fa-graduation-cap" style={{ fontSize: "48px", marginBottom: "15px", display: "block" }}></i>
            {searchTerm || filterCategory !== "all" || filterLevel !== "all" || filterStatus !== "all"
              ? "No courses found matching your criteria." 
              : "No courses found. Add your first course to get started."
            }
          </div>
        ) : (
          <>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ background: "#f8f9fa" }}>
                <tr>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Course Image</th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Course Details</th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Category & Level</th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Price</th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Status</th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Students</th>
                  <th style={{ padding: "15px", textAlign: "center", borderBottom: "1px solid #ddd" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={course._id || index} style={{ borderBottom: "1px solid #f1f1f1" }}>
                    <td style={{ padding: "15px" }}>
                      <img
                        src={course.imageUrl || "https://via.placeholder.com/80x60/28a745/ffffff?text=Course"}
                        alt="Course"
                        style={{
                          width: "80px",
                          height: "60px",
                          borderRadius: "8px",
                          objectFit: "cover"
                        }}
                      />
                    </td>
                    <td style={{ padding: "15px" }}>
                      <div>
                        <div style={{ fontWeight: "500", color: "#333", marginBottom: "4px" }}>
                          {course.title || "N/A"}
                        </div>
                        <div style={{ fontSize: "13px", color: "#666", marginBottom: "4px" }}>
                          {course.description?.length > 100 
                            ? `${course.description.substring(0, 100)}...` 
                            : course.description || "N/A"
                          }
                        </div>
                        <div style={{ fontSize: "12px", color: "#888" }}>
                          <i className="fa fa-user" style={{ marginRight: "5px" }}></i>
                          {course.instructor || "InstaIQ Team"}
                        </div>
                        <div style={{ fontSize: "12px", color: "#888" }}>
                          <i className="fa fa-clock" style={{ marginRight: "5px" }}></i>
                          {course.duration || "N/A"}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "15px" }}>
                      <div style={{ marginBottom: "8px" }}>
                        <span style={{
                          padding: "4px 8px",
                          borderRadius: "12px",
                          fontSize: "12px",
                          fontWeight: "500",
                          color: "#0c5460",
                          backgroundColor: "#d1ecf1",
                          border: "1px solid #bee5eb"
                        }}>
                          {course.category || "General"}
                        </span>
                      </div>
                      {getLevelBadge(course.level)}
                    </td>
                    <td style={{ padding: "15px", fontSize: "16px", fontWeight: "500", color: "#28a745" }}>
                      {formatPrice(course.price || 0)}
                    </td>
                    <td style={{ padding: "15px" }}>
                      {getStatusBadge(course.isActive)}
                    </td>
                    <td style={{ padding: "15px", fontSize: "14px", color: "#666" }}>
                      <i className="fa fa-users" style={{ marginRight: "5px" }}></i>
                      {course.purchasedBy?.length || 0}
                    </td>
                    <td style={{ padding: "15px", textAlign: "center" }}>
                      <PermissionRender permission={PERMISSIONS.MANAGE_COURSES}>
                        <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                          <button
                            onClick={() => handleEditCourse(course)}
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
                            title="Edit Course"
                          >
                            <i className="fa fa-edit"></i>
                          </button>
                          <button
                            onClick={() => handleDeleteCourse(course._id)}
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
                            title="Delete Course"
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
                {pagination.total} courses
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

      {/* Add/Edit Course Modal */}
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
            maxWidth: '600px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, color: '#333' }}>
                {editingCourse ? 'Edit Course' : 'Add New Course'}
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
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                      Course Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: formErrors.title ? '1px solid #dc3545' : '1px solid #ddd',
                        borderRadius: '5px',
                        fontSize: '14px'
                      }}
                    />
                    {formErrors.title && (
                      <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                        {formErrors.title}
                      </div>
                    )}
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                      Price (₹) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="0 for free course"
                      min="0"
                      step="0.01"
                      required
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: formErrors.price ? '1px solid #dc3545' : '1px solid #ddd',
                        borderRadius: '5px',
                        fontSize: '14px'
                      }}
                    />
                    {formErrors.price && (
                      <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                        {formErrors.price}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: formErrors.description ? '1px solid #dc3545' : '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '14px',
                      resize: 'vertical'
                    }}
                  />
                  {formErrors.description && (
                    <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                      {formErrors.description}
                    </div>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                      Duration *
                    </label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      placeholder="e.g., 4 weeks, 2 hours"
                      required
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: formErrors.duration ? '1px solid #dc3545' : '1px solid #ddd',
                        borderRadius: '5px',
                        fontSize: '14px'
                      }}
                    />
                    {formErrors.duration && (
                      <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                        {formErrors.duration}
                      </div>
                    )}
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: formErrors.category ? '1px solid #dc3545' : '1px solid #ddd',
                        borderRadius: '5px',
                        fontSize: '14px'
                      }}
                    >
                      <option value="">Select Category</option>
                      <option value="aptitude">Aptitude</option>
                      <option value="technical">Technical</option>
                    </select>
                    {formErrors.category && (
                      <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                        {formErrors.category}
                      </div>
                    )}
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                      Level *
                    </label>
                    <select
                      name="level"
                      value={formData.level}
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
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '15px', alignItems: 'end' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                      Instructor
                    </label>
                    <input
                      type="text"
                      name="instructor"
                      value={formData.instructor}
                      onChange={handleInputChange}
                      placeholder="Instructor name"
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
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleInputChange}
                      />
                      Course is Active
                    </label>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                    Course Image *
                  </label>
                  <div style={{ marginBottom: '15px' }}>
                    <ImageUpload
                      onImageSelect={handleImageSelect}
                      currentImage={formData.imageUrl}
                      placeholder="Upload Course Image"
                    />
                    
                    {/* Alternative: URL input for existing images */}
                    {!selectedImage && (
                      <div style={{ marginTop: '10px' }}>
                        <input
                          type="url"
                          name="imageUrl"
                          value={formData.imageUrl}
                          onChange={handleInputChange}
                          placeholder="Or paste image URL"
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: formErrors.imageUrl ? '1px solid #dc3545' : '1px solid #ddd',
                            borderRadius: '5px',
                            fontSize: '14px'
                          }}
                        />
                      </div>
                    )}
                  </div>
                  {formErrors.imageUrl && (
                    <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                      {formErrors.imageUrl}
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                    Course Details/Features
                  </label>
                  {courseDetails.map((detail, index) => (
                    <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                      <input
                        type="text"
                        value={detail}
                        onChange={(e) => handleDetailsChange(index, e.target.value)}
                        placeholder={`Feature ${index + 1}`}
                        style={{
                          flex: 1,
                          padding: '8px',
                          border: '1px solid #ddd',
                          borderRadius: '5px',
                          fontSize: '14px'
                        }}
                      />
                      {courseDetails.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeDetailField(index)}
                          style={{
                            background: '#dc3545',
                            color: 'white',
                            border: 'none',
                            padding: '8px 12px',
                            borderRadius: '5px',
                            cursor: 'pointer'
                          }}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addDetailField}
                    style={{
                      background: '#6c757d',
                      color: 'white',
                      border: 'none',
                      padding: '8px 12px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    <i className="fa fa-plus" style={{ marginRight: '5px' }}></i>
                    Add Feature
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                <button
                  type="submit"
                  disabled={actionLoading}
                  style={{
                    background: actionLoading ? '#6c757d' : '#28a745',
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
                  {actionLoading ? 'Processing...' : (editingCourse ? 'Update Course' : 'Create Course')}
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

export default CourseManagement;