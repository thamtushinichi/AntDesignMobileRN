// src/config/fonts.ts

/**
 * Font configuration for the application
 *
 * This file contains font family mappings for React Native and Tamagui.
 * Make sure the font files are properly linked in your project.
 */

// Font family mapping for React Native (must match font file names)
export const fontFamily = {
  inter: {
    // Using the exact font file names from your Inter fonts
    // The font names should match the actual file names without extension
    thin: 'Inter_18pt-Thin',
    extraLight: 'Inter_18pt-ExtraLight',
    light: 'Inter_18pt-Light',
    regular: 'Inter_18pt-Regular',
    medium: 'Inter_18pt-Medium',
    semiBold: 'Inter_18pt-SemiBold',
    bold: 'Inter_18pt-Bold',
    extraBold: 'Inter_18pt-ExtraBold',
    black: 'Inter_18pt-Black',
  },

  // Fallback system fonts
  system: {
    ios: 'System',
    android: 'Roboto',
  },

  // Default font family
  default: 'Inter_18pt-Regular',
} as const

// Font weights mapping with actual font families
export const fontWeights = {
  100: fontFamily.inter.thin,
  200: fontFamily.inter.extraLight,
  300: fontFamily.inter.light,
  400: fontFamily.inter.regular,
  500: fontFamily.inter.medium,
  600: fontFamily.inter.semiBold,
  700: fontFamily.inter.bold,
  800: fontFamily.inter.extraBold,
  900: fontFamily.inter.black,
} as const

// Type for font weight keys
export type FontWeight = keyof typeof fontWeights

/**
 * Helper function to get font family by weight
 * @param weight Font weight (100-900)
 * @returns Font family name
 */
export const getFontFamily = (weight: FontWeight = 400): string => {
  return fontWeights[weight] || fontFamily.inter.regular
}

/**
 * Font faces configuration for Tamagui
 * This maps font weights to the actual font files
 */
export const interFontFaces = {
  100: {
    normal: fontFamily.inter.thin,
    italic: fontFamily.inter.thin, // Use same font for italic if no italic variant
  },
  200: {
    normal: fontFamily.inter.extraLight,
    italic: fontFamily.inter.extraLight,
  },
  300: {
    normal: fontFamily.inter.light,
    italic: fontFamily.inter.light,
  },
  400: {
    normal: fontFamily.inter.regular,
    italic: fontFamily.inter.regular,
  },
  500: {
    normal: fontFamily.inter.medium,
    italic: fontFamily.inter.medium,
  },
  600: {
    normal: fontFamily.inter.semiBold,
    italic: fontFamily.inter.semiBold,
  },
  700: {
    normal: fontFamily.inter.bold,
    italic: fontFamily.inter.bold,
  },
  800: {
    normal: fontFamily.inter.extraBold,
    italic: fontFamily.inter.extraBold,
  },
  900: {
    normal: fontFamily.inter.black,
    italic: fontFamily.inter.black,
  },
} as const

/**
 * Font size scale following design system principles
 */
export const fontSize = {
  xs: 11,
  sm: 12,
  base: 14,
  md: 14,
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

  // Semantic font sizes
  caption: 11,
  body: 14,
  subheading: 16,
  heading: 20,
  title: 24,
  display: 32,
} as const

/**
 * Line height scale
 */
export const lineHeight = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,

  // Semantic line heights
  caption: 1.3,
  body: 1.5,
  heading: 1.2,
} as const

/**
 * Letter spacing scale
 */
export const letterSpacing = {
  tighter: -0.05,
  tight: -0.025,
  normal: 0,
  wide: 0.025,
  wider: 0.05,
  widest: 0.1,
} as const

/**
 * Typography presets for common use cases
 */
export const typographyPresets = {
  // Display text
  display: {
    fontSize: fontSize['6xl'],
    fontFamily: fontFamily.inter.bold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },

  // Page titles
  title: {
    fontSize: fontSize['4xl'],
    fontFamily: fontFamily.inter.semiBold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.normal,
  },

  // Section headings
  heading: {
    fontSize: fontSize['2xl'],
    fontFamily: fontFamily.inter.semiBold,
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.normal,
  },

  // Subheadings
  subheading: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.inter.medium,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },

  // Body text
  body: {
    fontSize: fontSize.base,
    fontFamily: fontFamily.inter.regular,
    lineHeight: lineHeight.relaxed,
    letterSpacing: letterSpacing.normal,
  },

  // Small body text
  bodySmall: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.inter.regular,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },

  // Caption text
  caption: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.inter.regular,
    lineHeight: lineHeight.caption,
    letterSpacing: letterSpacing.wide,
  },

  // Button text
  button: {
    fontSize: fontSize.base,
    fontFamily: fontFamily.inter.medium,
    lineHeight: lineHeight.none,
    letterSpacing: letterSpacing.normal,
  },

  // Label text
  label: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.inter.medium,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
} as const

/**
 * Helper function to get typography preset
 * @param preset Preset name
 * @returns Typography style object
 */
export const getTypographyPreset = (preset: keyof typeof typographyPresets) => {
  return typographyPresets[preset]
}

/**
 * Text style variants for different contexts
 */
export const textVariants = {
  // Primary text
  primary: {
    color: '$textPrimary',
  },

  // Secondary text
  secondary: {
    color: '$textSecondary',
  },

  // Muted text
  muted: {
    color: '$textMuted',
  },

  // Disabled text
  disabled: {
    color: '$textDisabled',
  },

  // Error text
  error: {
    color: '$error',
  },

  // Success text
  success: {
    color: '$success',
  },

  // Warning text
  warning: {
    color: '$warning',
  },

  // Info text
  info: {
    color: '$info',
  },

  // Primary color text
  accent: {
    color: '$primary',
  },
} as const

/**
 * Export types for TypeScript support
 */
export type FontFamilyKey = keyof typeof fontFamily.inter
export type FontSizeKey = keyof typeof fontSize
export type LineHeightKey = keyof typeof lineHeight
export type LetterSpacingKey = keyof typeof letterSpacing
export type TypographyPresetKey = keyof typeof typographyPresets
export type TextVariantKey = keyof typeof textVariants

/**
 * Default export with all font utilities
 */
export default {
  fontFamily,
  fontWeights,
  getFontFamily,
  interFontFaces,
  fontSize,
  lineHeight,
  letterSpacing,
  typographyPresets,
  getTypographyPreset,
  textVariants,
}
