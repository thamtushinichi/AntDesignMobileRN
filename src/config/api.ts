// src/config/api.ts
// Base URL for the API
export const API_URL = 'https://api.example.com';

// API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  CURRENT_USER: '/auth/me',

  // User endpoints
  USERS: '/users',
  USER_PROFILE: '/users/profile',

  // Other endpoints
  PRODUCTS: '/products',
  CATEGORIES: '/categories',
  ORDERS: '/orders',
};

// API version
export const API_VERSION = 'v1';

// Request timeout in milliseconds
export const REQUEST_TIMEOUT = 30000;
