// src/tamagui.advanced.ts
/**
 * Advanced Tamagui configuration and utilities
 *
 * This file contains advanced utilities, helpers, and configurations for Tamagui
 * including color manipulation, responsive design helpers, and theme utilities.
 */

import { getTokens, getVariable, getVariableValue, useTheme, createFont } from 'tamagui'
import { createAnimations } from '@tamagui/animations-react-native'
import { Appearance, useColorScheme } from 'react-native'
import { useMemo } from 'react'
import config from './tamagui.config'

// Export the default config
export default config
export type TamaguiConfig = typeof config

/**
 * Color palette with semantic naming
 */
export const palette = {
  // Primary palette
  primary: {
    50: '#E6F7FF',
    100: '#BAE7FF',
    200: '#91D5FF',
    300: '#69C0FF',
    400: '#40A9FF',
    500: '#0CB5EB',
    600: '#1890FF',
    700: '#096DD9',
    800: '#0050B3',
    900: '#003A8C',
  },

  // Gray palette
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#F0F0F0',
    300: '#D9D9D9',
    400: '#BFBFBF',
    500: '#8C8C8C',
    600: '#595959',
    700: '#434343',
    800: '#262626',
    900: '#141414',
  },

  // Semantic colors
  success: {
    50: '#F6FFED',
    100: '#D9F7BE',
    200: '#B7EB8F',
    300: '#95DE64',
    400: '#73D13D',
    500: '#52C41A',
    600: '#389E0D',
    700: '#237804',
    800: '#135200',
    900: '#092B00',
  },

  warning: {
    50: '#FFFBE6',
    100: '#FFF1B8',
    200: '#FFE58F',
    300: '#FFD666',
    400: '#FFC53D',
    500: '#FAAD14',
    600: '#D48806',
    700: '#AD6800',
    800: '#874D00',
    900: '#613400',
  },

  error: {
    50: '#FFF2F0',
    100: '#FFCCC7',
    200: '#FFA39E',
    300: '#FF7875',
    400: '#FF4D4F',
    500: '#F5222D',
    600: '#CF1322',
    700: '#A8071A',
    800: '#820014',
    900: '#5C0011',
  },

  info: {
    50: '#E6F7FF',
    100: '#BAE7FF',
    200: '#91D5FF',
    300: '#69C0FF',
    400: '#40A9FF',
    500: '#1890FF',
    600: '#096DD9',
    700: '#0050B3',
    800: '#003A8C',
    900: '#002766',
  },
} as const

/**
 * Shadow presets for consistent elevation
 */
export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
  '2xl': {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 20,
  },
} as const

/**
 * Primary color constant for consistency
 */
export const primaryColor = '#0CB5EB'

/**
 * Helper to access a design token value directly
 * @param tokenPath The path to the token (e.g. 'color.primary')
 * @returns The token value
 */
export function getTokenValue(tokenPath: string): any {
  const tokens = getTokens()
  const parts = tokenPath.split('.')

  let current: any = tokens
  for (const part of parts) {
    if (!current[part]) {
      console.warn(`Token part "${part}" not found in path "${tokenPath}"`)
      return undefined
    }
    current = current[part]
  }

  // If it's a variable reference, resolve it
  if (typeof current === 'object' && current?.val !== undefined) {
    return getVariableValue(current)
  }

  return current
}

/**
 * Get a Tamagui variable with fallback
 * @param variable The variable to get
 * @param fallback Fallback value if variable is not found
 * @returns The variable value or fallback
 */
export function getVar(variable: any, fallback: string): string {
  if (!variable) return fallback

  try {
    return getVariableValue(variable) || fallback
  } catch (error) {
    console.warn('Failed to get variable value:', error)
    return fallback
  }
}

/**
 * Create a color with alpha transparency
 * @param color Base color (hex, rgb, or rgba)
 * @param alpha Alpha value (0-1)
 * @returns Color with alpha
 */
export function withAlpha(color: string, alpha: number): string {
  // Clamp alpha between 0 and 1
  alpha = Math.max(0, Math.min(1, alpha))

  // Handle hex colors
  if (color.startsWith('#')) {
    const hex = color.slice(1)
    const r = parseInt(hex.slice(0, 2), 16)
    const g = parseInt(hex.slice(2, 4), 16)
    const b = parseInt(hex.slice(4, 6), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  // Handle rgb colors
  if (color.startsWith('rgb(')) {
    const rgb = color.slice(4, -1).split(',').map(c => c.trim())
    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`
  }

  // Handle rgba colors - replace alpha
  if (color.startsWith('rgba(')) {
    const rgba = color.slice(5, -1).split(',').map(c => c.trim())
    return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${alpha})`
  }

  // Handle named colors - return as is for now
  console.warn(`Cannot add alpha to color: ${color}`)
  return color
}

/**
 * Convert hex color to RGB object
 * @param hex Hex color string
 * @returns RGB color as {r, g, b}
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  // Remove # if present
  hex = hex.replace('#', '')

  // Convert 3-digit hex to 6-digit
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }

  if (hex.length !== 6) {
    console.warn(`Invalid hex color: ${hex}`)
    return null
  }

  // Parse hex values
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  return { r, g, b }
}

/**
 * Determine if a color is light or dark
 * @param color Color to check (hex format)
 * @returns True if color is light, false if dark
 */
export function isLightColor(color: string): boolean {
  const rgb = hexToRgb(color)
  if (!rgb) return false

  // Calculate the brightness using YIQ formula
  // https://www.w3.org/TR/AERT/#color-contrast
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
  return brightness >= 128
}

/**
 * Get the appropriate text color for a background
 * @param backgroundColor Background color
 * @returns White or black based on background
 */
export function getTextColorForBackground(backgroundColor: string): string {
  return isLightColor(backgroundColor) ? '#000000' : '#FFFFFF'
}

/**
 * Get a specific theme from Tamagui
 * @param themeName The name of the theme to get
 * @returns The theme object
 */
export function getTheme(themeName: string) {
  const themes = config.themes
  const theme = themes?.[themeName]

  if (!theme) {
    console.warn(`Theme "${themeName}" not found`)
  }

  return theme
}

/**
 * Get a color variable from a theme
 * @param colorName The name of the color to get
 * @param themeName Optional theme name (defaults to 'light')
 * @returns The color value
 */
export function getThemeColor(colorName: string, themeName: string = 'light'): string {
  const theme = getTheme(themeName)
  if (!theme) return ''

  const color = theme[colorName]

  if (!color) {
    console.warn(`Color "${colorName}" not found in theme "${themeName}"`)
    return ''
  }

  // If it's a variable reference, resolve it
  if (typeof color === 'object' && color?.val !== undefined) {
    return getVariableValue(color)
  }

  return color as string
}

/**
 * Hook to get the current theme colors with TypeScript support
 * @returns Object with theme colors and utilities
 */
export function useThemeColors() {
  const theme = useTheme()

  return useMemo(() => ({
    // Primary colors
    primary: getVar(theme.primary, primaryColor),
    primaryHover: getVar(theme.primaryHover, palette.primary[600]),
    primaryPress: getVar(theme.primaryPress, palette.primary[700]),

    // Background colors
    background: getVar(theme.background, '#FFFFFF'),
    backgroundHover: getVar(theme.backgroundHover, palette.gray[50]),
    backgroundPress: getVar(theme.backgroundPress, palette.gray[100]),

    // Text colors
    color: getVar(theme.color, palette.gray[900]),
    textPrimary: getVar(theme.textPrimary, palette.gray[900]),
    textSecondary: getVar(theme.textSecondary, palette.gray[600]),
    textMuted: getVar(theme.textMuted, palette.gray[500]),

    // Border colors
    borderColor: getVar(theme.borderColor, palette.gray[300]),
    borderColorHover: getVar(theme.borderColorHover, palette.gray[400]),

    // Semantic colors
    success: getVar(theme.success, palette.success[500]),
    warning: getVar(theme.warning, palette.warning[500]),
    error: getVar(theme.error, palette.error[500]),
    info: getVar(theme.info, palette.info[500]),

    // Card colors
    card: getVar(theme.card, '#FFFFFF'),
    cardHover: getVar(theme.cardHover, palette.gray[50]),

    // Shadow colors
    shadowColor: getVar(theme.shadowColor, 'rgba(0,0,0,0.1)'),
    shadowColorStrong: getVar(theme.shadowColorStrong, 'rgba(0,0,0,0.2)'),

    // Utility functions
    withAlpha: (color: string, alpha: number) => withAlpha(getVar(theme[color] || color, color), alpha),
    isLight: (color: string) => isLightColor(getVar(theme[color] || color, color)),
    getTextColor: (bgColor: string) => getTextColorForBackground(getVar(theme[bgColor] || bgColor, bgColor)),
  }), [theme])
}

/**
 * Hook to get system preference and current theme information
 * @returns Object with system and current theme preferences
 */
export function useThemePreference() {
  const systemColorScheme = useColorScheme()

  return useMemo(() => ({
    systemPrefersDark: systemColorScheme === 'dark',
    systemColorScheme,
    isDarkMode: systemColorScheme === 'dark',
  }), [systemColorScheme])
}

/**
 * Create platform-specific shadow styles
 * @param elevation Shadow elevation preset or custom elevation (1-24)
 * @param color Shadow color (optional)
 * @returns Platform-specific shadow styles
 */
export function getShadow(
  elevation: keyof typeof shadows | number = 'md',
  color: string = '#000000'
) {
  // If it's a preset shadow
  if (typeof elevation === 'string' && shadows[elevation]) {
    return {
      ...shadows[elevation],
      shadowColor: color,
    }
  }

  // If it's a custom elevation number
  if (typeof elevation === 'number') {
    const clampedElevation = Math.max(0, Math.min(24, elevation))

    return {
      shadowColor: color,
      shadowOffset: {
        width: 0,
        height: Math.ceil(clampedElevation / 2),
      },
      shadowOpacity: Math.min(0.3, clampedElevation * 0.015),
      shadowRadius: Math.ceil(clampedElevation / 2),
      elevation: clampedElevation,
    }
  }

  // Fallback to medium shadow
  return shadows.md
}

/**
 * Create a custom animation configuration
 * @param name Animation name
 * @param config Animation configuration
 * @returns The animation object
 */
export function createCustomAnimation(name: string, config: any) {
  return createAnimations({
    [name]: config,
  })
}

/**
 * Create a custom font family configuration
 * @param fontFamily Font family name
 * @param options Font options
 * @returns The font object
 */
export function createCustomFont(fontFamily: string, options: any) {
  return createFont({
    family: fontFamily,
    ...options,
  })
}

/**
 * Responsive design utilities
 */
export const responsive = {
  /**
   * Get responsive values based on screen size
   * @param values Object with breakpoint keys and values
   * @param currentBreakpoint Current breakpoint
   * @returns The appropriate value for the current breakpoint
   */
  getValue: <T>(
    values: Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl', T>>,
    currentBreakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  ): T | undefined => {
    const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const
    const currentIndex = breakpoints.indexOf(currentBreakpoint)

    // Find the closest smaller or equal breakpoint that has a value
    for (let i = currentIndex; i >= 0; i--) {
      const bp = breakpoints[i]
      if (values[bp] !== undefined) {
        return values[bp]
      }
    }

    return undefined
  },

  /**
   * Create responsive styles object
   * @param values Values for different breakpoints
   * @returns Tamagui responsive style object
   */
  style: <T>(values: Partial<Record<'$xs' | '$sm' | '$md' | '$lg' | '$xl' | '$xxl', T>>) => values,

  /**
   * Breakpoint values for manual responsive logic
   */
  breakpoints: {
    xs: 0,
    sm: 660,
    md: 800,
    lg: 1020,
    xl: 1280,
    xxl: 1600,
  },
}

/**
 * Typography scale utilities
 */
export const typography = {
  /**
   * Font size scale
   */
  fontSize: {
    xs: 11,
    sm: 12,
    base: 14,
    lg: 16,
    xl: 18,
    '2xl': 20,
    '3xl': 24,
    '4xl': 30,
    '5xl': 36,
    '6xl': 48,
    '7xl': 60,
    '8xl': 72,
    '9xl': 96,
  },

  /**
   * Line height scale
   */
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  /**
   * Letter spacing scale
   */
  letterSpacing: {
    tighter: -0.05,
    tight: -0.025,
    normal: 0,
    wide: 0.025,
    wider: 0.05,
    widest: 0.1,
  },

  /**
   * Font weight mapping
   */
  fontWeight: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
}

/**
 * Spacing utilities
 */
export const spacing = {
  /**
   * Base spacing unit (4px)
   */
  unit: 4,

  /**
   * Spacing scale
   */
  scale: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    12: 48,
    16: 64,
    20: 80,
    24: 96,
    32: 128,
    40: 160,
    48: 192,
    56: 224,
    64: 256,
  },

  /**
   * Semantic spacing
   */
  semantic: {
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
  },
}

/**
 * Application constants
 */
export const appConstants = {
  colors: {
    primary: primaryColor,
    primaryDark: palette.primary[700],
    primaryLight: palette.primary[300],
    success: palette.success[500],
    warning: palette.warning[500],
    error: palette.error[500],
    info: palette.info[500],
  },

  borderRadius: {
    none: 0,
    sm: 4,
    md: 6,
    lg: 8,
    xl: 12,
    full: 9999,
  },

  zIndex: {
    dropdown: 1000,
    sticky: 1100,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    toast: 1600,
    tooltip: 1700,
  },
}

/**
 * Theme validation utilities
 */
export const themeUtils = {
  /**
   * Validate if a theme color exists
   * @param colorName Color name to validate
   * @param themeName Theme name (optional)
   * @returns Boolean indicating if color exists
   */
  hasColor: (colorName: string, themeName?: string): boolean => {
    try {
      const color = getThemeColor(colorName, themeName)
      return !!color
    } catch {
      return false
    }
  },

  /**
   * Get all available theme colors
   * @param themeName Theme name (optional)
   * @returns Array of color names
   */
  getAvailableColors: (themeName: string = 'light'): string[] => {
    const theme = getTheme(themeName)
    return theme ? Object.keys(theme) : []
  },

  /**
   * Create a color variant with different opacity
   * @param colorName Base color name
   * @param opacity Opacity value (0-1)
   * @param themeName Theme name (optional)
   * @returns Color with opacity
   */
  createColorVariant: (
    colorName: string,
    opacity: number,
    themeName?: string
  ): string => {
    const color = getThemeColor(colorName, themeName)
    return withAlpha(color, opacity)
  },
}

/**
 * Performance utilities for Tamagui
 */
export const performance = {
  /**
   * Memoized theme hook for better performance
   * @returns Memoized theme object
   */
  useMemoizedTheme: () => {
    const theme = useTheme()
    return useMemo(() => theme, [theme])
  },

  /**
   * Get static color values to avoid re-renders
   * @param colorName Color name
   * @param themeName Theme name (optional)
   * @returns Static color value
   */
  getStaticColor: (colorName: string, themeName?: string): string => {
    return getThemeColor(colorName, themeName)
  },
}

// Export everything
export {
  getTokenValue,
  getVar,
  withAlpha,
  hexToRgb,
  isLightColor,
  getTextColorForBackground,
  getTheme,
  getThemeColor,
  useThemeColors,
  useThemePreference,
  getShadow,
  createCustomAnimation,
  createCustomFont,
  responsive,
  typography,
  spacing,
  appConstants,
  themeUtils,
  performance,
}
