import api from './api';

type LoginResponse = {
  user: {
    id: string;
    username: string;
    email: string;
  };
  token: string;
};

type RegisterResponse = LoginResponse;

const authService = {
  /**
   * Login a user
   * @param email User email
   * @param password User password
   */
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      // For development without a backend, simulate a successful login
      if (process.env.NODE_ENV === 'development') {
        return {
          user: {
            id: '1',
            username: 'testuser',
            email: email,
          },
          token: 'fake-jwt-token',
        };
      }

      return await api.post<LoginResponse>('/auth/login', {
        email,
        password,
      });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  /**
   * Register a new user
   * @param username Username
   * @param email Email address
   * @param password Password
   */
  register: async (
    username: string,
    email: string,
    password: string,
  ): Promise<RegisterResponse> => {
    try {
      // For development without a backend, simulate a successful registration
      if (process.env.NODE_ENV === 'development') {
        return {
          user: {
            id: '1',
            username,
            email,
          },
          token: 'fake-jwt-token',
        };
      }

      return await api.post<RegisterResponse>('/auth/register', {
        username,
        email,
        password,
      });
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  /**
   * Logout the current user
   */
  logout: async (): Promise<void> => {
    try {
      // For development, just return
      if (process.env.NODE_ENV === 'development') {
        return;
      }

      await api.post('/auth/logout', {});
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },
};

export default authService;
