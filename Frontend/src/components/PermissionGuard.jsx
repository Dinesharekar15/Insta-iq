import React from 'react';
import { Navigate } from 'react-router-dom';
import { hasPermission, hasAllPermissions, hasAnyPermission } from '../config/roles';

// Component to guard routes based on permissions
export const PermissionGuard = ({ 
  children, 
  requiredPermissions = [], 
  userRole, 
  fallback = null,
  redirectTo = '/login' 
}) => {
  // If no permissions required, allow access
  if (!requiredPermissions || requiredPermissions.length === 0) {
    return children;
  }

  // Check if user has all required permissions
  const hasAccess = hasAllPermissions(userRole, requiredPermissions);
  
  if (!hasAccess) {
    if (fallback) {
      return fallback;
    }
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

// Component to conditionally render UI elements based on permissions
export const PermissionRender = ({ 
  children, 
  requiredPermissions = [], 
  userRole, 
  fallback = null,
  requireAll = true 
}) => {
  // If no permissions required, render children
  if (!requiredPermissions || requiredPermissions.length === 0) {
    return children;
  }

  // Check permissions based on requireAll flag
  const hasAccess = requireAll 
    ? hasAllPermissions(userRole, requiredPermissions)
    : hasAnyPermission(userRole, requiredPermissions);
  
  if (!hasAccess) {
    return fallback;
  }

  return children;
};

// Hook to check permissions
export const usePermissions = (userRole) => {
  return {
    hasPermission: (permission) => hasPermission(userRole, permission),
    hasAnyPermission: (permissions) => hasAnyPermission(userRole, permissions),
    hasAllPermissions: (permissions) => hasAllPermissions(userRole, permissions)
  };
};

// Higher-order component for permission-based route protection
export const withPermission = (WrappedComponent, requiredPermissions = []) => {
  return function PermissionWrappedComponent(props) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const userRole = userInfo.role;

    const hasAccess = hasAllPermissions(userRole, requiredPermissions);
    
    if (!hasAccess) {
      return <Navigate to="/login" replace />;
    }

    return <WrappedComponent {...props} />;
  };
};
