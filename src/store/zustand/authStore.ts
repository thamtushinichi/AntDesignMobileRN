import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authService from '../../services/authService';
import toastService from '../../services/toastService';

// Type definitions
interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

// Create auth store with persistence - use native Zustand API instead of the factory
export const useAuthStore = create<AuthState>()(
  persist(
    immer((set) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions directly implemented in the store creation
      login: async (email: string, password: string) => {
        set(state => {
          state.isLoading = true;
          state.error = null;
        });

        try {
          const result = await authService.login(email, password);
          set(state => {
            state.user = result.user;
            state.isAuthenticated = true;
            state.isLoading = false;
          });
          toastService.success('Login successful!');
          return true;
        } catch (error) {
          const errorMessage = error instanceof Error
            ? error.message
            : 'Login failed. Please check your credentials and try again.';

          set(state => {
            state.error = errorMessage;
            state.isLoading = false;
          });
          toastService.error(errorMessage);
          return false;
        }
      },

      register: async (username: string, email: string, password: string) => {
        set(state => {
          state.isLoading = true;
          state.error = null;
        });

        try {
          const result = await authService.register(username, email, password);
          set(state => {
            state.user = result.user;
            state.isAuthenticated = true;
            state.isLoading = false;
          });
          toastService.success('Registration successful!');
          return true;
        } catch (error) {
          const errorMessage = error instanceof Error
            ? error.message
            : 'Registration failed. Please try again later.';

          set(state => {
            state.error = errorMessage;
            state.isLoading = false;
          });
          toastService.error(errorMessage);
          return false;
        }
      },

      logout: async () => {
        set(state => {
          state.isLoading = true;
        });

        try {
          await authService.logout();
          set(state => {
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
          });
          toastService.success('Logged out successfully');
        } catch (error) {
          console.error('Logout error:', error);
          set(state => {
            state.isLoading = false;
          });
          toastService.error('Logout failed');
        }
      },

      setUser: (user: User | null) => set(state => {
        state.user = user;
        state.isAuthenticated = !!user;
      }),

      setLoading: (loading: boolean) => set(state => {
        state.isLoading = loading;
      }),

      setError: (error: string | null) => set(state => {
        state.error = error;
      }),

      clearError: () => set(state => {
        state.error = null;
      }),
    })),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Selectors
export const selectIsAuthenticated = (state: AuthState) => state.isAuthenticated;
export const selectUser = (state: AuthState) => state.user;
export const selectAuthLoading = (state: AuthState) => state.isLoading;
export const selectAuthError = (state: AuthState) => state.error;
