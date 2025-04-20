// src/config/theme.ts
import { lightTheme, darkTheme } from '../theme';

// Default theme
export const DEFAULT_THEME = 'light';

// Available themes
export const THEMES = {
  light: lightTheme,
  dark: darkTheme,
};

// Animation configs
export const ANIMATION_CONFIG = {
  duration: 300, // default animation duration in ms
  easing: 'ease-in-out', // default easing function
};

// App constants
export const APP_CONSTANTS = {
  APP_NAME: 'AntDesignMobileRN',
  STORAGE_KEYS: {
    THEME: 'theme',
    USER: 'user',
    AUTH_TOKEN: 'authToken',
  },
};
