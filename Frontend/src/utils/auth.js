// Authentication utility functions
export const AuthUtils = {
  // Check if user is logged in
  isAuthenticated: () => {
    try {
      const userInfo = localStorage.getItem('userInfo');
      if (!userInfo) return false;
      
      const user = JSON.parse(userInfo);
      return !!(user && user.token && user._id);
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  },

  // Get current user info
  getCurrentUser: () => {
    try {
      const userInfo = localStorage.getItem('userInfo');
      if (!userInfo) return null;
      
      return JSON.parse(userInfo);
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  // Get user role
  getUserRole: () => {
    const user = AuthUtils.getCurrentUser();
    return user?.role || null;
  },

  // Check if user is admin
  isAdmin: () => {
    const role = AuthUtils.getUserRole();
    return role === 'admin';
  },

  // Get user name for display
  getUserName: () => {
    const user = AuthUtils.getCurrentUser();
    return user?.name || user?.email || 'User';
  },

  // Clear authentication data (logout)
  clearAuth: () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('isAdmin'); // Remove any admin flags
  },

  // Check if token is expired (basic check)
  isTokenExpired: () => {
    const user = AuthUtils.getCurrentUser();
    if (!user || !user.token) return true;

    // Handle demo tokens (they don't expire)
    if (user.token.startsWith('demo-token-')) {
      return false;
    }

    try {
      // Basic JWT token expiration check
      const tokenParts = user.token.split('.');
      if (tokenParts.length !== 3) return true;

      const payload = JSON.parse(atob(tokenParts[1]));
      const currentTime = Date.now() / 1000;
      
      return payload.exp && payload.exp < currentTime;
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true;
    }
  },

  // Validate authentication (check existence and expiration)
  isValidAuth: () => {
    return AuthUtils.isAuthenticated() && !AuthUtils.isTokenExpired();
  }
};

// Hook for using authentication in React components
import { useState, useEffect, useCallback, useRef } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => AuthUtils.isValidAuth());
  const [user, setUser] = useState(() => AuthUtils.isValidAuth() ? AuthUtils.getCurrentUser() : null);
  const [loading, setLoading] = useState(false);
  const checkingRef = useRef(false);

  const checkAuth = useCallback(() => {
    if (checkingRef.current) return; // Prevent concurrent checks
    
    try {
      checkingRef.current = true;
      const authStatus = AuthUtils.isValidAuth();
      const currentUser = AuthUtils.getCurrentUser();
      
      setIsAuthenticated(authStatus);
      setUser(authStatus ? currentUser : null);
      setLoading(false);
    } catch (error) {
      console.error('Error in checkAuth:', error);
      setIsAuthenticated(false);
      setUser(null);
      setLoading(false);
    } finally {
      checkingRef.current = false;
    }
  }, []);

  useEffect(() => {
    // Listen for storage changes (login/logout in other tabs)
    const handleStorageChange = (e) => {
      if (e.key === 'userInfo') {
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [checkAuth]);

  const login = useCallback((userData) => {
    localStorage.setItem('userInfo', JSON.stringify(userData));
    checkAuth();
  }, [checkAuth]);

  const logout = useCallback(() => {
    AuthUtils.clearAuth();
    checkAuth();
  }, [checkAuth]);

  return {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    refreshAuth: checkAuth
  };
};

export default AuthUtils;