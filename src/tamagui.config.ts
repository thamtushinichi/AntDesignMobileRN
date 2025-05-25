// src/tamagui.config.ts
import { createTamagui } from 'tamagui'
import { createFont } from '@tamagui/font-inter'
import { shorthands } from '@tamagui/shorthands'
import { themes, tokens } from '@tamagui/themes'
import { createAnimations } from '@tamagui/animations-react-native'
import { fontFamily, interFontFaces } from './config/fonts'

// Define our custom colors with better color system
const colors = {
  primary: {
    50: '#E6F7FF',
    100: '#BAE7FF',
    200: '#91D5FF',
    300: '#69C0FF',
    400: '#40A9FF',
    500: '#0CB5EB', // Primary color
    600: '#1890FF',
    700: '#096DD9',
    800: '#0050B3',
    900: '#003A8C',
  },
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
  semantic: {
    success: '#52C41A',
    warning: '#FAAD14',
    error: '#FF4D4F',
    info: '#1890FF',
  }
}

// Enhanced custom tokens with proper sizing system
const customTokens = {
  ...tokens,
  color: {
    ...tokens.color,
    // Primary colors
    primary: colors.primary[500],
    primaryHover: colors.primary[600],
    primaryActive: colors.primary[700],
    primaryLight: colors.primary[100],
    primaryDark: colors.primary[800],

    // Semantic colors
    success: colors.semantic.success,
    warning: colors.semantic.warning,
    error: colors.semantic.error,
    info: colors.semantic.info,

    // Neutral colors
    textPrimary: colors.gray[900],
    textSecondary: colors.gray[600],
    textMuted: colors.gray[500],
    textDisabled: colors.gray[400],

    border: colors.gray[300],
    borderLight: colors.gray[200],
    borderDark: colors.gray[400],

    background: '#FFFFFF',
    backgroundSecondary: colors.gray[50],
    backgroundTertiary: colors.gray[100],
  },
  space: {
    ...tokens.space,
    0: 0,
    1: 4,    // 4px
    2: 8,    // 8px
    3: 12,   // 12px
    4: 16,   // 16px
    5: 20,   // 20px
    6: 24,   // 24px
    7: 28,   // 28px
    8: 32,   // 32px
    9: 36,   // 36px
    10: 40,  // 40px
    12: 48,  // 48px
    16: 64,  // 64px
    20: 80,  // 80px
    24: 96,  // 96px
    // Semantic spacing
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
  },
  radius: {
    ...tokens.radius,
    0: 0,
    1: 2,
    2: 4,
    3: 6,
    4: 8,
    5: 12,
    6: 16,
    7: 20,
    8: 24,
    // Semantic radius
    xs: 2,
    sm: 4,
    md: 6,
    lg: 8,
    xl: 12,
    xxl: 16,
    round: 999,
    full: 9999,
  },
  size: {
    ...tokens.size,
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    11: 44,
    12: 48,
    14: 56,
    16: 64,
    20: 80,
    24: 96,
    28: 112,
    32: 128,
    36: 144,
    40: 160,
    44: 176,
    48: 192,
    52: 208,
    56: 224,
    60: 240,
    64: 256,
    72: 288,
    80: 320,
    96: 384,
    // Semantic sizes
    xxs: 12,
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 40,
    xxl: 48,
  },
  zIndex: {
    ...tokens.zIndex,
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    10: 10,
    20: 20,
    30: 30,
    40: 40,
    50: 50,
    // Semantic z-index
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    toast: 1600,
    tooltip: 1700,
  }
}

// Enhanced font configuration with proper Inter setup
const createInterFont = () => ({
  family: {
    100: fontFamily.inter.thin,
    200: fontFamily.inter.extraLight,
    300: fontFamily.inter.light,
    400: fontFamily.inter.regular,
    500: fontFamily.inter.medium,
    600: fontFamily.inter.semiBold,
    700: fontFamily.inter.bold,
    800: fontFamily.inter.extraBold,
    900: fontFamily.inter.black,
  },
  size: {
    1: 11,   // xs
    2: 12,   // sm
    3: 13,   //
    4: 14,   // base
    5: 16,   // lg
    6: 18,   // xl
    7: 20,   // 2xl
    8: 24,   // 3xl
    9: 30,   // 4xl
    10: 36,  // 5xl
    11: 48,  // 6xl
    12: 60,  // 7xl
    13: 72,  // 8xl
    14: 96,  // 9xl
    15: 128, // 10xl
    16: 144, // 11xl
  },
  transform: {
    0: 'none',
    1: 'uppercase',
    2: 'lowercase',
    3: 'capitalize',
  },
  weight: {
    1: '100', // thin
    2: '200', // extraLight
    3: '300', // light
    4: '400', // regular
    5: '500', // medium
    6: '600', // semiBold
    7: '700', // bold
    8: '800', // extraBold
    9: '900', // black
  },
  color: {
    0: 'transparent',
    1: '$color',
    2: '$textSecondary',
    3: '$textMuted',
    4: '$textDisabled',
    5: '$primary',
    6: '$success',
    7: '$warning',
    8: '$error',
    9: '$info',
  },
  letterSpacing: {
    0: 0,
    1: 0.025,  // 0.025em - tight
    2: -0.025, // -0.025em - tighter
    3: 0.05,   // 0.05em - wide
    4: 0.1,    // 0.1em - wider
  },
  lineHeight: {
    1: 1,      // none
    2: 1.25,   // tight
    3: 1.375,  // snug
    4: 1.5,    // normal
    5: 1.625,  // relaxed
    6: 2,      // loose
  },
  // Map font weights to actual font files for React Native
  face: interFontFaces,
})

// Create fonts
const interFont = createInterFont()
const fonts = {
  heading: interFont,
  body: interFont,
  mono: interFont, // You can replace with a monospace font if needed
}

// Enhanced themes with proper color system
const customThemes = {
  light: {
    ...themes.light,
    // Background colors
    background: '#FFFFFF',
    backgroundHover: colors.gray[50],
    backgroundPress: colors.gray[100],
    backgroundFocus: colors.gray[50],
    backgroundStrong: colors.gray[900],
    backgroundTransparent: 'rgba(255,255,255,0)',

    // Content colors
    color: colors.gray[900],
    colorHover: colors.gray[800],
    colorPress: colors.gray[700],
    colorFocus: colors.gray[800],
    colorTransparent: 'rgba(0,0,0,0)',

    // Border colors
    borderColor: colors.gray[300],
    borderColorHover: colors.gray[400],
    borderColorPress: colors.gray[500],
    borderColorFocus: colors.primary[500],

    // Primary colors
    primary: colors.primary[500],
    primaryHover: colors.primary[600],
    primaryPress: colors.primary[700],
    primaryFocus: colors.primary[500],

    // Secondary colors
    secondary: colors.gray[100],
    secondaryHover: colors.gray[200],
    secondaryPress: colors.gray[300],
    secondaryFocus: colors.gray[100],

    // Semantic colors
    success: colors.semantic.success,
    successHover: '#73D13D',
    successPress: '#389E0D',

    warning: colors.semantic.warning,
    warningHover: '#FFC53D',
    warningPress: '#D48806',

    error: colors.semantic.error,
    errorHover: '#FF7875',
    errorPress: '#D9363E',

    info: colors.semantic.info,
    infoHover: '#40A9FF',
    infoPress: '#096DD9',

    // Text colors
    textPrimary: colors.gray[900],
    textSecondary: colors.gray[600],
    textMuted: colors.gray[500],
    textDisabled: colors.gray[400],
    textLight: colors.gray[400],

    // Card and surface colors
    card: '#FFFFFF',
    cardHover: colors.gray[50],

    // Shadow colors
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowColorStrong: 'rgba(0,0,0,0.2)',
  },
  dark: {
    ...themes.dark,
    // Background colors
    background: '#000000',
    backgroundHover: colors.gray[800],
    backgroundPress: colors.gray[700],
    backgroundFocus: colors.gray[800],
    backgroundStrong: colors.gray[100],
    backgroundTransparent: 'rgba(0,0,0,0)',

    // Content colors
    color: colors.gray[100],
    colorHover: colors.gray[200],
    colorPress: colors.gray[300],
    colorFocus: colors.gray[200],
    colorTransparent: 'rgba(255,255,255,0)',

    // Border colors
    borderColor: colors.gray[700],
    borderColorHover: colors.gray[600],
    borderColorPress: colors.gray[500],
    borderColorFocus: colors.primary[500],

    // Primary colors
    primary: colors.primary[400],
    primaryHover: colors.primary[300],
    primaryPress: colors.primary[500],
    primaryFocus: colors.primary[400],

    // Secondary colors
    secondary: colors.gray[800],
    secondaryHover: colors.gray[700],
    secondaryPress: colors.gray[600],
    secondaryFocus: colors.gray[800],

    // Semantic colors
    success: '#73D13D',
    successHover: '#95DE64',
    successPress: '#52C41A',

    warning: '#FFC53D',
    warningHover: '#FFD666',
    warningPress: '#FAAD14',

    error: '#FF7875',
    errorHover: '#FFA39E',
    errorPress: '#FF4D4F',

    info: '#40A9FF',
    infoHover: '#69C0FF',
    infoPress: '#1890FF',

    // Text colors
    textPrimary: colors.gray[100],
    textSecondary: colors.gray[400],
    textMuted: colors.gray[500],
    textDisabled: colors.gray[600],
    textLight: colors.gray[600],

    // Card and surface colors
    card: colors.gray[900],
    cardHover: colors.gray[800],

    // Shadow colors
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowColorStrong: 'rgba(0,0,0,0.5)',
  }
}

// Enhanced animations with more options
const animations = createAnimations({
  bouncy: {
    type: 'spring',
    damping: 10,
    mass: 0.9,
    stiffness: 100,
  },
  lazy: {
    type: 'spring',
    damping: 20,
    stiffness: 60,
  },
  quick: {
    type: 'spring',
    damping: 20,
    mass: 1.2,
    stiffness: 250,
  },
  quicker: {
    type: 'spring',
    damping: 20,
    mass: 1,
    stiffness: 300,
  },
  medium: {
    type: 'spring',
    damping: 15,
    mass: 1,
    stiffness: 120,
  },
  slow: {
    type: 'spring',
    damping: 20,
    stiffness: 60,
  },
  // Timing-based animations
  fast: {
    type: 'timing',
    duration: 200,
  },
  normal: {
    type: 'timing',
    duration: 300,
  },
  slower: {
    type: 'timing',
    duration: 500,
  },
})

// Create the Tamagui config
const tamaguiConfig = createTamagui({
  animations,
  defaultTheme: 'light',
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: false, // Set to false for React Native
  shorthands,
  fonts,
  themes: customThemes,
  tokens: customTokens,
  media: {
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    gtXl: { minWidth: 1420 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
    // Additional responsive breakpoints
    mobile: { maxWidth: 768 },
    tablet: { minWidth: 769, maxWidth: 1024 },
    desktop: { minWidth: 1025 },
  },
  // Settings for React Native
  settings: {
    allowedStyleValues: 'somewhat-strict-web', // or 'strict' for more strict checking
    autocompleteSpecificTokens: 'except-special',
    fastSchemeChange: true,
  },
})

export type AppConfig = typeof tamaguiConfig
export default tamaguiConfig

// Extend Tamagui types
declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}

  // Add custom theme tokens for better TypeScript support
  interface ThemeTokens {
    // Background colors
    backgroundHover: string
    backgroundPress: string
    backgroundFocus: string
    backgroundStrong: string
    backgroundTransparent: string

    // Content colors
    colorHover: string
    colorPress: string
    colorFocus: string
    colorTransparent: string

    // Border colors
    borderColorHover: string
    borderColorPress: string
    borderColorFocus: string

    // Primary variations
    primaryHover: string
    primaryPress: string
    primaryFocus: string

    // Secondary variations
    secondaryHover: string
    secondaryPress: string
    secondaryFocus: string

    // Semantic color variations
    successHover: string
    successPress: string
    warningHover: string
    warningPress: string
    errorHover: string
    errorPress: string
    infoHover: string
    infoPress: string

    // Text colors
    textPrimary: string
    textSecondary: string
    textMuted: string
    textDisabled: string
    textLight: string

    // Card colors
    cardHover: string

    // Shadow colors
    shadowColorStrong: string
  }
}
