// Role-based access control configuration
export const ROLES = {
  SUPER_ADMIN: 'super admin',
  JUNIOR_ADMIN: 'junior admin',
  INSTRUCTOR: 'instructor',
  STUDENT: 'student'
};

// Permission definitions
export const PERMISSIONS = {
  // Dashboard permissions
  VIEW_DASHBOARD: 'view_dashboard',
  VIEW_ANALYTICS: 'view_analytics',
  
  // User management permissions
  VIEW_USERS: 'view_users',
  CREATE_USERS: 'create_users',
  EDIT_USERS: 'edit_users',
  DELETE_USERS: 'delete_users',
  MANAGE_USER_ROLES: 'manage_user_roles',
  
  // Course management permissions
  VIEW_COURSES: 'view_courses',
  CREATE_COURSES: 'create_courses',
  EDIT_COURSES: 'edit_courses',
  DELETE_COURSES: 'delete_courses',
  PUBLISH_COURSES: 'publish_courses',
  
  // Event management permissions
  VIEW_EVENTS: 'view_events',
  CREATE_EVENTS: 'create_events',
  EDIT_EVENTS: 'edit_events',
  DELETE_EVENTS: 'delete_events',
  
  // Content management permissions
  VIEW_CONTENT: 'view_content',
  CREATE_CONTENT: 'create_content',
  EDIT_CONTENT: 'edit_content',
  DELETE_CONTENT: 'delete_content',
  PUBLISH_CONTENT: 'publish_content',
  
  // Order management permissions
  VIEW_ORDERS: 'view_orders',
  MANAGE_ORDERS: 'manage_orders',
  VIEW_REVENUE: 'view_revenue',
  
  // Settings permissions
  VIEW_SETTINGS: 'view_settings',
  EDIT_SETTINGS: 'edit_settings',
  
  // Profile permissions
  VIEW_PROFILE: 'view_profile',
  EDIT_PROFILE: 'edit_profile'
};

// Role permissions mapping
export const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: [
    // Full access to everything
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.CREATE_USERS,
    PERMISSIONS.EDIT_USERS,
    PERMISSIONS.DELETE_USERS,
    PERMISSIONS.MANAGE_USER_ROLES,
    PERMISSIONS.VIEW_COURSES,
    PERMISSIONS.CREATE_COURSES,
    PERMISSIONS.EDIT_COURSES,
    PERMISSIONS.DELETE_COURSES,
    PERMISSIONS.PUBLISH_COURSES,
    PERMISSIONS.VIEW_EVENTS,
    PERMISSIONS.CREATE_EVENTS,
    PERMISSIONS.EDIT_EVENTS,
    PERMISSIONS.DELETE_EVENTS,
    PERMISSIONS.VIEW_CONTENT,
    PERMISSIONS.CREATE_CONTENT,
    PERMISSIONS.EDIT_CONTENT,
    PERMISSIONS.DELETE_CONTENT,
    PERMISSIONS.PUBLISH_CONTENT,
    PERMISSIONS.VIEW_ORDERS,
    PERMISSIONS.MANAGE_ORDERS,
    PERMISSIONS.VIEW_REVENUE,
    PERMISSIONS.VIEW_SETTINGS,
    PERMISSIONS.EDIT_SETTINGS,
    PERMISSIONS.VIEW_PROFILE,
    PERMISSIONS.EDIT_PROFILE
  ],
  
  [ROLES.JUNIOR_ADMIN]: [
    // Limited admin access
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.CREATE_USERS,
    PERMISSIONS.EDIT_USERS,
    PERMISSIONS.VIEW_COURSES,
    PERMISSIONS.CREATE_COURSES,
    PERMISSIONS.EDIT_COURSES,
    PERMISSIONS.PUBLISH_COURSES,
    PERMISSIONS.VIEW_EVENTS,
    PERMISSIONS.CREATE_EVENTS,
    PERMISSIONS.EDIT_EVENTS,
    PERMISSIONS.VIEW_CONTENT,
    PERMISSIONS.CREATE_CONTENT,
    PERMISSIONS.EDIT_CONTENT,
    PERMISSIONS.PUBLISH_CONTENT,
    PERMISSIONS.VIEW_ORDERS,
    PERMISSIONS.MANAGE_ORDERS,
    PERMISSIONS.VIEW_PROFILE,
    PERMISSIONS.EDIT_PROFILE
  ],
  
  [ROLES.INSTRUCTOR]: [
    // Course and content management
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_COURSES,
    PERMISSIONS.CREATE_COURSES,
    PERMISSIONS.EDIT_COURSES,
    PERMISSIONS.PUBLISH_COURSES,
    PERMISSIONS.VIEW_CONTENT,
    PERMISSIONS.CREATE_CONTENT,
    PERMISSIONS.EDIT_CONTENT,
    PERMISSIONS.PUBLISH_CONTENT,
    PERMISSIONS.VIEW_PROFILE,
    PERMISSIONS.EDIT_PROFILE
  ],
  
  [ROLES.STUDENT]: [
    // Limited access
    PERMISSIONS.VIEW_PROFILE,
    PERMISSIONS.EDIT_PROFILE
  ]
};

// Menu items configuration based on roles
export const MENU_ITEMS = {
  [ROLES.SUPER_ADMIN]: [
    { path: "/admin", icon: "fas fa-tachometer-alt", label: "Dashboard", permission: PERMISSIONS.VIEW_DASHBOARD },
    { path: "/admin/users", icon: "fas fa-users", label: "User Management", permission: PERMISSIONS.VIEW_USERS },
    { path: "/admin/roles", icon: "fas fa-user-shield", label: "Role Management", permission: PERMISSIONS.MANAGE_USER_ROLES },
    { path: "/admin/courses", icon: "fas fa-book", label: "Course Management", permission: PERMISSIONS.VIEW_COURSES },
    { path: "/admin/events", icon: "fas fa-calendar-alt", label: "Event Management", permission: PERMISSIONS.VIEW_EVENTS },
    { path: "/admin/testimonials", icon: "fas fa-comments", label: "Testimonials", permission: PERMISSIONS.VIEW_CONTENT },
    { path: "/admin/orders", icon: "fas fa-shopping-cart", label: "Order Management", permission: PERMISSIONS.VIEW_ORDERS },
    { path: "/admin/settings", icon: "fas fa-cog", label: "Settings", permission: PERMISSIONS.VIEW_SETTINGS },
    { path: "/admin/profile", icon: "fas fa-user", label: "Profile", permission: PERMISSIONS.VIEW_PROFILE }
  ],
  
  [ROLES.JUNIOR_ADMIN]: [
    { path: "/admin", icon: "fas fa-tachometer-alt", label: "Dashboard", permission: PERMISSIONS.VIEW_DASHBOARD },
    { path: "/admin/users", icon: "fas fa-users", label: "User Management", permission: PERMISSIONS.VIEW_USERS },
    { path: "/admin/courses", icon: "fas fa-book", label: "Course Management", permission: PERMISSIONS.VIEW_COURSES },
    { path: "/admin/events", icon: "fas fa-calendar-alt", label: "Event Management", permission: PERMISSIONS.VIEW_EVENTS },
    { path: "/admin/testimonials", icon: "fas fa-comments", label: "Testimonials", permission: PERMISSIONS.VIEW_CONTENT },
    { path: "/admin/orders", icon: "fas fa-shopping-cart", label: "Order Management", permission: PERMISSIONS.VIEW_ORDERS },
    { path: "/admin/profile", icon: "fas fa-user", label: "Profile", permission: PERMISSIONS.VIEW_PROFILE }
  ],
  
  [ROLES.INSTRUCTOR]: [
    { path: "/admin", icon: "fas fa-tachometer-alt", label: "Dashboard", permission: PERMISSIONS.VIEW_DASHBOARD },
    { path: "/admin/courses", icon: "fas fa-book", label: "Course Management", permission: PERMISSIONS.VIEW_COURSES },
    { path: "/admin/testimonials", icon: "fas fa-comments", label: "Content Management", permission: PERMISSIONS.VIEW_CONTENT },
    { path: "/admin/profile", icon: "fas fa-user", label: "Profile", permission: PERMISSIONS.VIEW_PROFILE }
  ],
  
  [ROLES.STUDENT]: [
    { path: "/profile", icon: "fas fa-user", label: "Profile", permission: PERMISSIONS.VIEW_PROFILE }
  ]
};

// Helper functions
export const hasPermission = (userRole, permission) => {
  if (!userRole || !permission) return false;
  return ROLE_PERMISSIONS[userRole]?.includes(permission) || false;
};

export const hasAnyPermission = (userRole, permissions) => {
  if (!userRole || !permissions) return false;
  return permissions.some(permission => hasPermission(userRole, permission));
};

export const hasAllPermissions = (userRole, permissions) => {
  if (!userRole || !permissions) return false;
  return permissions.every(permission => hasPermission(userRole, permission));
};

export const getMenuItemsForRole = (userRole) => {
  return MENU_ITEMS[userRole] || [];
};

export const canAccessRoute = (userRole, requiredPermissions) => {
  if (!userRole || !requiredPermissions) return false;
  return hasAllPermissions(userRole, requiredPermissions);
};
