// Application constants
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  REFRESH_TOKEN: 'refresh_token',
} as const;

export const ROUTES = {
  // Public
  HOME: '/',
  PROJECTS: '/projects',
  SKILLS: '/skills',
  EXPERIENCE: '/experience',
  
  // Admin
  ADMIN_LOGIN: '/admin/login',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_PROFILE: '/admin/profile',
  ADMIN_PROJECTS: '/admin/projects',
  ADMIN_SKILLS: '/admin/skills',
} as const;

export const API_ERRORS = {
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
  NOT_FOUND: 'Not Found',
  SERVER_ERROR: 'Internal Server Error',
} as const;
