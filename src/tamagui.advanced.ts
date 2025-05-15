// src/tamagui.advanced.ts
/**
 * Advanced Tamagui configuration file
 *
 * This file contains more advanced options and helpers for working with Tamagui
 * It can be imported by components that need access to these features
 */

import { getTokens, createFont, getVariable, getVariableValue } from 'tamagui';
import { createAnimations } from '@tamagui/animations-react-native';
import { themes as tamaguiThemes } from '@tamagui/themes';

import config from './tamagui.config';

/**
 * Helper to access a design token value directly
 * @param tokenPath The path to the token (e.g. 'color.primary')
 * @returns The token value
 *
 * @example
 * const primaryColor = getTokenValue('color.primary');
 */
export function getTokenValue(tokenPath: string) {
  const tokens = getTokens();
  const parts = tokenPath.split('.');

  // Navigate through token object
  let current = tokens;
  for (const part of parts) {
    if (!current[part]) {
      console.warn(`Token part "${part}" not found in path "${tokenPath}"`);
      return undefined;
    }
    current = current[part];
  }

  // If it's a variable reference, resolve it
  if (typeof current === 'object' && current.val) {
    return getVariableValue(current);
  }

  return current;
}

/**
 * Helper to create a custom animation
 * @param name Animation name
 * @param config Animation configuration
 * @returns The animation object
 *
 * @example
 * const bounceAnimation = createCustomAnimation('bounce', {
 *   type: 'spring',
 *   damping: 10,
 *   mass: 0.9,
 *   stiffness: 100,
 * });
 */
export function createCustomAnimation(name: string, config: any) {
  return createAnimations({
    [name]: config,
  });
}

/**
 * Helper to create a custom font family
 * @param fontFamily Font family name
 * @param options Font options
 * @returns The font object
 *
 * @example
 * const montserratFont = createCustomFont('Montserrat', {
 *   family: 'Montserrat',
 *   size: {
 *     // font sizes
 *   },
 *   weight: {
 *     // font weights
 *   },
 * });
 */
export function createCustomFont(fontFamily: string, options: any) {
  return createFont({
    family: fontFamily,
    ...options,
  });
}

/**
 * Get a specific theme from Tamagui
 * @param themeName The name of the theme to get
 * @returns The theme object
 *
 * @example
 * const darkTheme = getTheme('dark');
 */
export function getTheme(themeName: string) {
  // Get theme from Tamagui themes or from our config
  const theme = config.themes?.[themeName] || tamaguiThemes[themeName];
  if (!theme) {
    console.warn(`Theme "${themeName}" not found`);
  }
  return theme;
}

/**
 * Get a color variable from a theme
 * @param colorName The name of the color to get
 * @param themeName Optional theme name (defaults to 'light')
 * @returns The color value
 *
 * @example
 * const primaryColor = getThemeColor('primary', 'dark');
 */
export function getThemeColor(colorName: string, themeName: string = 'light') {
  const theme = getTheme(themeName);
  if (!theme) return '';

  const color = theme[colorName];

  if (!color) {
    console.warn(`Color "${colorName}" not found in theme "${themeName}"`);
    return '';
  }

  // If it's a variable reference, resolve it
  if (typeof color === 'object' && color.val) {
    return getVariableValue(color);
  }

  return color;
}

/**
 * Get a Tamagui variable with fallback
 * @param variable The variable to get
 * @param fallback Fallback value if variable is not found
 * @returns The variable value or fallback
 *
 * @example
 * const value = getVar(theme.primary, '#0CB5EB');
 */
export function getVar(variable: any, fallback: string) {
  if (!variable) return fallback;

  try {
    return getVariableValue(variable) || fallback;
  } catch (error) {
    return fallback;
  }
}

/**
 * Create a color with alpha transparency
 * @param color Base color
 * @param alpha Alpha value (0-1)
 * @returns Color with alpha
 *
 * @example
 * const transparentPrimary = withAlpha('#0CB5EB', 0.5);
 */
export function withAlpha(color: string, alpha: number) {
  // Handle hex colors
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // Handle rgb colors
  if (color.startsWith('rgb(')) {
    const rgb = color.slice(4, -1).split(',').map(c => c.trim());
    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
  }

  // Handle rgba colors
  if (color.startsWith('rgba(')) {
    const rgba = color.slice(5, -1).split(',').map(c => c.trim());
    return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${alpha})`;
  }

  // Return original color if we can't parse it
  return color;
}

/**
 * Primary color used throughout the application
 * Can be used for consistency in places where theme variables are not accessible
 */
export const primaryColor = '#0CB5EB';

/**
 * Helper for Media Queries
 * @param query The query to match
 * @param theme The theme context
 * @returns Boolean indicating if query matches
 *
 * @example
 * const isMobile = useMediaQuery('sm');
 */
export function useMediaQuery(query: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl') {
  // Define the queries based on your Tamagui config
  const queries = {
    xs: '@media (max-width: 660px)',
    sm: '@media (max-width: 800px)',
    md: '@media (max-width: 1020px)',
    lg: '@media (max-width: 1280px)',
    xl: '@media (max-width: 1420px)',
    xxl: '@media (max-width: 1600px)',
  };

  // Use Tamagui's useMedia hook when available
  // For now, return a placeholder for demonstration
  return false;
}

// Export the default config as well
export default config;
