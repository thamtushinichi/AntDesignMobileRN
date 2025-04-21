import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useColorScheme, Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { spacing, borderRadius, typography, shadows, timing, zIndex, opacity } from '../../theme/tokens';
import createAntDesignTheme from '../../theme/antDesignTheme';
import { Theme as AntTheme } from '@ant-design/react-native/lib/style';

// Theme type definitions
export type ThemeType = 'light' | 'dark' | 'system';

export type Theme = {
  // Include other styling tokens
  spacing: typeof spacing;
  borderRadius: typeof borderRadius;
  typography: typeof typography;
  shadows: typeof shadows;
  timing: typeof timing;
  zIndex: typeof zIndex;
  opacity: typeof opacity;
  // The Ant Design theme is now our color source
  antColors: Partial<AntTheme>;
};

// Context interface
type ThemeContextType = {
  theme: Theme;
  themeType: ThemeType;
  isDarkMode: boolean;
  setThemeType: (theme: ThemeType) => void;
  toggleTheme: () => void;
  antTheme: Partial<AntTheme>; // Full Ant Design theme
};

// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme storage key
const THEME_STORAGE_KEY = '@theme_preference';

/**
 * Theme Provider Component
 */
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // System color scheme
  const colorScheme = useColorScheme();

  // Theme state
  const [themeType, setThemeType] = useState<ThemeType>('system');
  const [isInitialized, setIsInitialized] = useState(false);

  // Determine if dark mode is active
  const isDarkMode =
    themeType === 'system'
      ? colorScheme === 'dark'
      : themeType === 'dark';

  // Generate Ant Design theme
  const antTheme = createAntDesignTheme(isDarkMode);

  // Generate the full theme object
  const theme: Theme = {
    spacing,
    borderRadius,
    typography,
    shadows,
    timing,
    zIndex,
    opacity,
    antColors: antTheme, // Use the Ant Design theme for colors
  };

  // Load the saved theme preference
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme) {
          setThemeType(savedTheme as ThemeType);
        }
      } catch (error) {
        console.error('Failed to load theme preference:', error);
      } finally {
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
  const updateThemeType = useCallback(async (newThemeType: ThemeType) => {
    setThemeType(newThemeType);
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newThemeType);
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  }, []);

  // Toggle between light and dark theme
  const toggleTheme = useCallback(() => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    updateThemeType(newTheme);
  }, [isDarkMode, updateThemeType]);

  // Show loading state while initializing
  if (!isInitialized) {
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
        antTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook to use the theme context
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
