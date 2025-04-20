// src/types/api.ts

// Generic API Response
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  success: boolean;
}

// Pagination metadata
export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  perPage: number;
}

// Paginated API Response
export interface PaginatedApiResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta;
}

// Error Response
export interface ErrorResponse {
  message: string;
  errors?: {
    [key: string]: string[];
  };
  status: number;
}

// Auth Types
export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
  expiresIn?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  inStock: boolean;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category: string;
  inStock?: boolean;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  category?: string;
  inStock?: boolean;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// Order Types
export interface Order {
  id: string;
  userId: string;
  products: OrderProduct[];
  status: OrderStatus;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  shippingAddress: Address;
  createdAt: string;
  updatedAt: string;
}

export interface OrderProduct {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  PAYPAL = 'paypal',
  CASH = 'cash',
  BANK_TRANSFER = 'bank_transfer',
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface CreateOrderRequest {
  products: {
    productId: string;
    quantity: number;
  }[];
  paymentMethod: PaymentMethod;
  shippingAddress: Address;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
}

export enum NotificationType {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}
