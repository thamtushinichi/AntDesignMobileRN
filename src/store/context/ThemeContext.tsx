import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme, Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors, { ThemeColors } from '../../theme/colors';
import { spacing, borderRadius, typography, shadows, timing, zIndex, opacity } from '../../theme/tokens';

export type ThemeType = 'light' | 'dark' | 'system';

export type Theme = {
  colors: ThemeColors;
  spacing: typeof spacing;
  borderRadius: typeof borderRadius;
  typography: typeof typography;
  shadows: typeof shadows;
  timing: typeof timing;
  zIndex: typeof zIndex;
  opacity: typeof opacity;
};

type ThemeContextType = {
  theme: Theme;
  themeType: ThemeType;
  isDarkMode: boolean;
  setThemeType: (theme: ThemeType) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme storage key
const THEME_STORAGE_KEY = '@theme_preference';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const colorScheme = useColorScheme();
  const [themeType, setThemeType] = useState<ThemeType>('system');
  const [isInitialized, setIsInitialized] = useState(false);

  // Determine if dark mode is active
  const isDarkMode =
    themeType === 'system'
      ? colorScheme === 'dark'
      : themeType === 'dark';

  // Generate the full theme object
  const theme: Theme = {
    colors: isDarkMode ? colors.dark : colors.light,
    spacing,
    borderRadius,
    typography,
    shadows,
    timing,
    zIndex,
    opacity,
  };

  // Load the saved theme preference
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme) {
          setThemeType(savedTheme as ThemeType);
        }
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to load theme preference:', error);
        setIsInitialized(true);
      }
    };

    loadThemePreference();
  }, []);

  // Listen for system theme changes when in 'system' mode
  useEffect(() => {
    if (themeType === 'system') {
      const subscription = Appearance.addChangeListener(() => {
        // This will trigger a re-render with the new theme
      });

      return () => {
        subscription.remove();
      };
    }
  }, [themeType]);

  // Save theme preference when it changes
  const updateThemeType = async (newThemeType: ThemeType) => {
    setThemeType(newThemeType);
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newThemeType);
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  // Toggle between light and dark theme
  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    updateThemeType(newTheme);
  };

  if (!isInitialized) {
    // Return null or a loading indicator until theme is initialized
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeType,
        isDarkMode,
        setThemeType: updateThemeType,
        toggleTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
