import AsyncStorage from '@react-native-async-storage/async-storage';

// Base API URL - replace with your own API endpoint
const API_URL = 'https://api.example.com';

interface RequestOptions extends RequestInit {
  token?: string;
  params?: Record<string, string>;
}

/**
 * API client for making HTTP requests
 */
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem('token');
    } catch (error) {
      console.error('Error getting token from storage', error);
      return null;
    }
  }

  async request<T>(
    endpoint: string,
    options: RequestOptions = {},
  ): Promise<T> {
    const {
      method = 'GET',
      params,
      token: customToken,
      headers = {},
      body,
      ...otherOptions
    } = options;

    // Build URL with query parameters
    const url = new URL(`${this.baseUrl}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    // Get token from storage or use provided token
    const token = customToken || (await this.getToken());

    // Build headers
    const requestHeaders: HeadersInit = {
      'Content-Type': 'application/json',
      ...headers,
    };

    if (token) {
      requestHeaders.Authorization = `Bearer ${token}`;
    }

    // Fetch options
    const fetchOptions: RequestInit = {
      method,
      headers: requestHeaders,
      ...otherOptions,
    };

    // Add body for non-GET requests
    if (method !== 'GET' && body) {
      fetchOptions.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url.toString(), fetchOptions);
      const data = await response.json();

      if (!response.ok) {
        throw {
          status: response.status,
          message: data.message || 'An error occurred',
          errors: data.errors,
        };
      }

      return data as T;
    } catch (error) {
      console.error('API request failed', error);
      throw error;
    }
  }

  // Convenience methods
  async get<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(endpoint, {...options, method: 'GET'});
  }

  async post<T>(
    endpoint: string,
    data: any,
    options: RequestOptions = {},
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data,
    });
  }

  async put<T>(
    endpoint: string,
    data: any,
    options: RequestOptions = {},
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data,
    });
  }

  async delete<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(endpoint, {...options, method: 'DELETE'});
  }
}

export default new ApiClient(API_URL);
