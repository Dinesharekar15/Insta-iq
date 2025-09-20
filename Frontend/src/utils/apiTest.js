// API Connection Test utility
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

// Test API connection
export const testConnection = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL.replace('/api', '')}/`);
    console.log('✅ Backend connection successful:', response.data);
    return { success: true, message: response.data };
  } catch (error) {
    console.error('❌ Backend connection failed:', error.message);
    return { success: false, error: error.message };
  }
};

// Test auth endpoints
export const testAuthEndpoints = async () => {
  const results = {
    register: false,
    login: false,
    sendOtp: false,
    verifyOtp: false
  };

  try {
    // Test registration endpoint (should fail without data - that's expected)
    await axios.post(`${API_BASE_URL}/auth/register`, {});
  } catch (error) {
    if (error.response && error.response.status === 400) {
      results.register = true; // Endpoint exists and validates input
    }
  }

  try {
    // Test login endpoint (should fail without data - that's expected)
    await axios.post(`${API_BASE_URL}/auth/login`, {});
  } catch (error) {
    if (error.response && error.response.status === 400) {
      results.login = true; // Endpoint exists and validates input
    }
  }

  try {
    // Test OTP endpoints (should fail without data - that's expected)
    await axios.post(`${API_BASE_URL}/auth/send-otp`, {});
  } catch (error) {
    if (error.response && error.response.status === 400) {
      results.sendOtp = true; // Endpoint exists and validates input
    }
  }

  try {
    await axios.post(`${API_BASE_URL}/auth/verify-otp`, {});
  } catch (error) {
    if (error.response && error.response.status === 400) {
      results.verifyOtp = true; // Endpoint exists and validates input
    }
  }

  return results;
};

export default { testConnection, testAuthEndpoints };