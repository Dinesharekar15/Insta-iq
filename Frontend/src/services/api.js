import axios from 'axios';

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token to all requests
api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      try {
        const user = JSON.parse(userInfo);
        if (user.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      } catch (error) {
        console.error('Error parsing user info:', error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear auth data and redirect to login
      localStorage.removeItem('userInfo');
      localStorage.removeItem('isAdmin');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// User Management API endpoints
export const userAPI = {
  // Get all users with optional filters and pagination
  getUsers: async (params = {}) => {
    const response = await api.get('/admin/users', { params });
    return response.data;
  },

  // Get single user by ID
  getUserById: async (userId) => {
    const response = await api.get(`/admin/users/${userId}`);
    return response.data;
  },

  // Create new user
  createUser: async (userData) => {
    const response = await api.post('/admin/users', userData);
    return response.data;
  },

  // Update existing user
  updateUser: async (userId, userData) => {
    const response = await api.put(`/admin/users/${userId}`, userData);
    return response.data;
  },

  // Delete user
  deleteUser: async (userId) => {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
  },

  // Update user status (active/inactive)
  updateUserStatus: async (userId, status) => {
    const response = await api.patch(`/admin/users/${userId}/status`, { status });
    return response.data;
  },

  // Update user role
  updateUserRole: async (userId, role) => {
    const response = await api.patch(`/admin/users/${userId}/role`, { role });
    return response.data;
  },

  // Search users
  searchUsers: async (query) => {
    const response = await api.get(`/admin/users/search`, {
      params: { q: query }
    });
    return response.data;
  },

  // Get user statistics
  getUserStats: async () => {
    const response = await api.get('/admin/users/stats');
    return response.data;
  },

  // Bulk operations
  bulkUpdateUsers: async (userIds, updates) => {
    const response = await api.patch('/admin/users/bulk', {
      userIds,
      updates
    });
    return response.data;
  },

  // Export users data
  exportUsers: async (filters = {}) => {
    const response = await api.get('/admin/users/export', {
      params: filters,
      responseType: 'blob'
    });
    return response.data;
  }
};

// Course Management API endpoints
export const courseAPI = {
  getCourses: async (params = {}) => {
    const response = await api.get('/admin/courses', { params });
    return response.data;
  },

  getCourseById: async (courseId) => {
    const response = await api.get(`/admin/courses/${courseId}`);
    return response.data;
  },

  createCourse: async (courseData) => {
    const response = await api.post('/admin/courses', courseData);
    return response.data;
  },

  updateCourse: async (courseId, courseData) => {
    const response = await api.put(`/admin/courses/${courseId}`, courseData);
    return response.data;
  },

  deleteCourse: async (courseId) => {
    const response = await api.delete(`/admin/courses/${courseId}`);
    return response.data;
  },

  // FormData methods for file upload
  createCourseWithImage: async (formData) => {
    const response = await api.post('/admin/courses', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  updateCourseWithImage: async (courseId, formData) => {
    const response = await api.put(`/admin/courses/${courseId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};

// Event Management API endpoints
export const eventAPI = {
  getEvents: async (params = {}) => {
    const response = await api.get('/admin/events', { params });
    return response.data;
  },

  getEventById: async (eventId) => {
    const response = await api.get(`/admin/events/${eventId}`);
    return response.data;
  },

  createEvent: async (eventData) => {
    const response = await api.post('/admin/events', eventData);
    return response.data;
  },

  updateEvent: async (eventId, eventData) => {
    const response = await api.put(`/admin/events/${eventId}`, eventData);
    return response.data;
  },

  deleteEvent: async (eventId) => {
    const response = await api.delete(`/admin/events/${eventId}`);
    return response.data;
  }
};

// Contact/Inquiry Management API endpoints
export const contactAPI = {
  getContacts: async (params = {}) => {
    const response = await api.get('/admin/contacts', { params });
    return response.data;
  },

  updateContactStatus: async (contactId, status) => {
    const response = await api.patch(`/admin/contacts/${contactId}/status`, { status });
    return response.data;
  },

  deleteContact: async (contactId) => {
    const response = await api.delete(`/admin/contacts/${contactId}`);
    return response.data;
  }
};

// Blog Management API endpoints
export const blogAPI = {
  getBlogs: async (params = {}) => {
    const response = await api.get('/admin/blogs', { params });
    return response.data;
  },

  getBlogById: async (blogId) => {
    const response = await api.get(`/admin/blogs/${blogId}`);
    return response.data;
  },

  createBlog: async (blogData) => {
    const response = await api.post('/admin/blogs', blogData);
    return response.data;
  },

  updateBlog: async (blogId, blogData) => {
    const response = await api.put(`/admin/blogs/${blogId}`, blogData);
    return response.data;
  },

  deleteBlog: async (blogId) => {
    const response = await api.delete(`/admin/blogs/${blogId}`);
    return response.data;
  }
};

// Dashboard/Analytics API endpoints
export const analyticsAPI = {
  getDashboardStats: async () => {
    const response = await api.get('/admin/dashboard/stats');
    return response.data;
  },

  getRevenueData: async (period = 'month') => {
    const response = await api.get(`/admin/dashboard/revenue`, {
      params: { period }
    });
    return response.data;
  },

  getUserGrowth: async (period = 'month') => {
    const response = await api.get(`/admin/dashboard/user-growth`, {
      params: { period }
    });
    return response.data;
  },

  getCourseEnrollments: async (period = 'month') => {
    const response = await api.get(`/admin/dashboard/enrollments`, {
      params: { period }
    });
    return response.data;
  }
};

// File upload utility
export const uploadAPI = {
  uploadFile: async (file, type = 'image') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const response = await api.post('/admin/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  uploadMultiple: async (files, type = 'image') => {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files`, file);
    });
    formData.append('type', type);

    const response = await api.post('/admin/upload/multiple', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};

// Helper function to handle API errors
export const handleApiError = (error) => {
  console.error('=== API Error Handler ===');
  console.error('Full error object:', error);
  
  let message = 'An unexpected error occurred';
  
  if (error.response) {
    // Server responded with error status
    console.error('Server responded with error status:', error.response.status);
    console.error('Error response data:', error.response.data);
    
    if (error.response.data?.message) {
      message = error.response.data.message;
    } else if (error.response.status === 400) {
      message = 'Bad request - Please check your input data';
    } else if (error.response.status === 401) {
      message = 'Authentication failed - Please log in again';
    } else if (error.response.status === 403) {
      message = 'Permission denied - You don\'t have access to this resource';
    } else if (error.response.status === 404) {
      message = 'Resource not found';
    } else if (error.response.status === 500) {
      message = 'Server error - Please try again later';
    } else {
      message = `Server error (${error.response.status})`;
    }
  } else if (error.request) {
    // Network error - no response received
    console.error('Network error - no response received:', error.request);
    message = `Network error: Cannot connect to server at ${API_BASE_URL}. Please check if the backend is running.`;
  } else if (error.code === 'NETWORK_ERROR') {
    message = 'Network connection failed - Please check your internet connection';
  } else if (error.message) {
    message = error.message;
  }
  
  console.error('Final error message:', message);
  return message;
};

// Export the configured axios instance for custom requests
export default api;