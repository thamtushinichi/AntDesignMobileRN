// src/store/zustand/themeStore.ts
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';
import { useEffect } from 'react';

// Type definitions
export type ThemeType = 'light' | 'dark' | 'system';

interface ThemeState {
  // State
  themeType: ThemeType;
  isDarkMode: boolean;

  // Actions
  setThemeType: (themeType: ThemeType) => void;
  toggleTheme: () => void;
}

// Function to determine if dark mode is active
const isDarkModeActive = (themeType: ThemeType, systemColorScheme: string | null | undefined): boolean => {
  return themeType === 'system'
    ? systemColorScheme === 'dark'
    : themeType === 'dark';
};

// Get current system theme
const currentColorScheme = Appearance.getColorScheme();
const initialIsDarkMode = isDarkModeActive('system', currentColorScheme);

// Create theme store with direct initialization
export const useThemeStore = create<ThemeState>()(
  persist(
    immer((set) => ({
      // State
      themeType: 'system' as ThemeType,
      isDarkMode: initialIsDarkMode,

      // Actions
      setThemeType: (themeType: ThemeType) => {
        set((state) => {
          state.themeType = themeType;
          const systemColorScheme = Appearance.getColorScheme();
          state.isDarkMode = isDarkModeActive(themeType, systemColorScheme);
        });
      },

      toggleTheme: () => {
        set((state) => {
          state.themeType = state.isDarkMode ? 'light' : 'dark';
          state.isDarkMode = !state.isDarkMode;
        });
      },
    })),
    {
      name: 'theme-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Hook to synchronize theme with system changes
export const useSyncSystemTheme = () => {
  const themeType = useThemeStore(state => state.themeType);
  const setThemeType = useThemeStore(state => state.setThemeType);

  // When the system color scheme changes and themeType is 'system',
  // we need to update the isDarkMode value
  useEffect(() => {
    if (themeType === 'system') {
      setThemeType('system');
    }
  }, [themeType, setThemeType]);

  // Set up a listener for changes to the system color scheme
  useEffect(() => {
    const subscription = Appearance.addChangeListener(() => {
      if (themeType === 'system') {
        setThemeType('system');
      }
    });

    return () => {
      subscription.remove();
    };
  }, [themeType, setThemeType]);
};

// Selectors
export const selectThemeType = (state: ThemeState) => state.themeType;
export const selectIsDarkMode = (state: ThemeState) => state.isDarkMode;
