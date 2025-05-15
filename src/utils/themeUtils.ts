// src/utils/themeUtils.ts
import { useTheme } from 'tamagui';
import { useColorScheme } from 'react-native';
import { useThemeStore, selectIsDarkMode } from '../store/zustand';
import { withAlpha, getThemeColor, primaryColor } from '../tamagui.advanced';

/**
 * Get a color with transparency
 * @param color Base color
 * @param opacity Opacity value (0-1)
 * @returns Color with opacity
 */
export const getColorWithOpacity = (color: string, opacity: number) => {
  return withAlpha(color, opacity);
};

/**
 * Convert hex color to RGB format
 * @param hex Hex color string
 * @returns RGB color as {r, g, b}
 */
export const hexToRgb = (hex: string) => {
  // Remove # if present
  hex = hex.replace('#', '');

  // Convert 3-digit hex to 6-digit
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  // Parse hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return { r, g, b };
};

/**
 * Determine if a color is light or dark
 * @param color Color to check
 * @returns True if color is light, false if dark
 */
export const isLightColor = (color: string) => {
  const { r, g, b } = hexToRgb(color);

  // Calculate the brightness according to YIQ formula
  // https://www.w3.org/TR/AERT/#color-contrast
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness >= 128;
};

/**
 * Get the appropriate text color for a background
 * @param backgroundColor Background color
 * @returns White or black based on background
 */
export const getTextColorForBackground = (backgroundColor: string) => {
  return isLightColor(backgroundColor) ? '#000000' : '#FFFFFF';
};

/**
 * Hook to get the current theme colors
 * @returns Object with theme colors
 */
export const useThemeColors = () => {
  const theme = useTheme();
  const isDarkMode = useThemeStore(selectIsDarkMode);

  return {
    primary: theme.primary.val as string,
    background: theme.background.val as string,
    text: theme.color.val as string,
    border: theme.borderColor.val as string,
    card: theme.card.val as string,
    success: theme.success.val as string,
    error: theme.error.val as string,
    warning: theme.warning.val as string,
    info: theme.info.val as string,
    isDarkMode,
  };
};

/**
 * Hook to get system preference and current theme
 * @returns Object with system and current theme preferences
 */
export const useThemePreference = () => {
  const systemColorScheme = useColorScheme();
  const themeType = useThemeStore(state => state.themeType);
  const isDarkMode = useThemeStore(selectIsDarkMode);

  return {
    systemPrefersDark: systemColorScheme === 'dark',
    themeType,
    isDarkMode,
  };
};

/**
 * Get platform-specific shadow styles
 * @param elevation Shadow elevation (1-24)
 * @param color Shadow color (optional)
 * @returns Platform-specific shadow styles
 */
export const getShadow = (elevation: number = 4, color: string = 'rgba(0, 0, 0, 0.2)') => {
  return {
    shadowColor: color,
    shadowOffset: {
      width: 0,
      height: elevation / 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: elevation / 2,
    elevation,
  };
};

/**
 * Application color constants
 */
export const appColors = {
  primary: primaryColor,
  primaryDark: '#008FC0',
  primaryLight: '#50D0FF',
  success: '#23A845',
  error: '#E52968',
  warning: '#ED9107',
  info: '#13c2c2',
};

export default {
  getColorWithOpacity,
  hexToRgb,
  isLightColor,
  getTextColorForBackground,
  useThemeColors,
  useThemePreference,
  getShadow,
  appColors,
};
