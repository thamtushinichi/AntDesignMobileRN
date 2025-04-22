import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Appearance, useColorScheme} from 'react-native';
import {useEffect} from 'react';
import createAntDesignTheme from '../../theme/antDesignTheme';
import {borderRadius, opacity, shadows, spacing, timing, typography, zIndex} from '../../theme';
import {Theme as AntTheme} from '@ant-design/react-native/lib/style';

// Type definitions
export type ThemeType = 'light' | 'dark' | 'system';

export type Theme = {
  spacing: typeof spacing;
  borderRadius: typeof borderRadius;
  typography: typeof typography;
  shadows: typeof shadows;
  timing: typeof timing;
  zIndex: typeof zIndex;
  opacity: typeof opacity;
  antColors: Partial<AntTheme>;
};

// Function to determine if dark mode is active
const isDarkModeActive = (themeType: ThemeType, systemColorScheme: string | null | undefined): boolean => {
  return themeType === 'system'
    ? systemColorScheme === 'dark'
    : themeType === 'dark';
};

// Get current system theme
const currentColorScheme = Appearance.getColorScheme();
const initialIsDarkMode = isDarkModeActive('system', currentColorScheme);
const initialAntTheme = createAntDesignTheme(initialIsDarkMode);

// Create theme store with direct initialization (avoid createInitialState function)
export const useThemeStore = create(
  persist(
    immer((set) => ({
      // State
      themeType: 'system' as ThemeType,
      isDarkMode: initialIsDarkMode,
      antTheme: initialAntTheme,
      theme: {
        spacing,
        borderRadius,
        typography,
        shadows,
        timing,
        zIndex,
        opacity,
        antColors: initialAntTheme,
      } as Theme,

      // Actions
      setThemeType: (themeType: ThemeType) => {
        set((state: {
          themeType: string;
          isDarkMode: boolean;
          antTheme: Partial<AntTheme>;
          theme: { antColors: any; };
        }) => {
          state.themeType = themeType;
          const systemColorScheme = Appearance.getColorScheme();
          state.isDarkMode = isDarkModeActive(themeType, systemColorScheme);
          state.antTheme = createAntDesignTheme(state.isDarkMode);
          state.theme.antColors = state.antTheme;
        });
      },

      toggleTheme: () => {
        set((state: {
          isDarkMode: boolean;
          themeType: string;
          antTheme: Partial<AntTheme>;
          theme: { antColors: any; };
        }) => {
          state.themeType = state.isDarkMode ? 'light' : 'dark';
          state.isDarkMode = !state.isDarkMode;
          state.antTheme = createAntDesignTheme(!state.isDarkMode);
          state.theme.antColors = state.antTheme;
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
  // @ts-ignore
  const themeType = useThemeStore(state => state.themeType);
  // @ts-ignore
  const setThemeType = useThemeStore(state => state.setThemeType);

  // Get the system color scheme
  const colorScheme = useColorScheme();

  useEffect(() => {
    // When the system color scheme changes and themeType is 'system',
    // we need to update the isDarkMode value
    if (themeType === 'system') {
      setThemeType('system');
    }
  }, [colorScheme, themeType, setThemeType]);

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
export const selectThemeType = (state: any) => state.themeType;
export const selectIsDarkMode = (state: any) => state.isDarkMode;
export const selectTheme = (state: any) => state.theme;
export const selectAntTheme = (state: any) => state.antTheme;
