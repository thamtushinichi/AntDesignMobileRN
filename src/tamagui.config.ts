// src/tamagui.config.ts
import { createTamagui } from 'tamagui'
import { shorthands } from '@tamagui/shorthands'
import { themes, tokens } from '@tamagui/themes'
import { createAnimations } from '@tamagui/animations-react-native'
import { fontFamily } from './config/fonts'

// Define our custom colors
const primaryColor = "#0CB5EB"
const primaryColorDark = "#008FC0"
const primaryColorLight = "#50D0FF"

// Create custom themes
const customThemes = {
  ...themes,
  light: {
    ...themes.light,
    background: '#FFFFFF',
    color: '#121638',
    primary: primaryColor,
    primaryDark: primaryColorDark,
    primaryLight: primaryColorLight,
    secondary: '#F2F5FF',
    borderColor: '#E1E5F2',
    card: '#FFFFFF',
    error: '#E52968',
    success: '#23A845',
    warning: '#ED9107',
    info: '#13c2c2',
    textMuted: '#8D96B9',
    textLight: '#4A5889',
  },
  dark: {
    ...themes.dark,
    background: '#0A0D24',
    color: '#F9FBFF',
    primary: primaryColor,
    primaryDark: primaryColorDark,
    primaryLight: primaryColorLight,
    secondary: '#121638',
    borderColor: '#323865',
    card: '#182046',
    error: '#FF4081',
    success: '#30C456',
    warning: '#FFA726',
    info: '#40C4FF',
    textMuted: '#A0ACDA',
    textLight: '#6A7096',
  }
}

// Custom tokens
const customTokens = {
  ...tokens,
  space: {
    ...tokens.space,
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  radius: {
    ...tokens.radius,
    xs: 2,
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    xxl: 32,
    round: 999,
  },
  size: {
    ...tokens.size,
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  }
}

// Create Inter font configuration
const createInterFont = () => ({
  family: fontFamily.inter.regular, // Sử dụng font regular làm default
  size: {
    1: 12,
    2: 14,
    3: 15,
    4: 16,
    5: 18,
    6: 20,
    7: 24,
    8: 28,
    9: 32,
    10: 44,
    11: 55,
    12: 62,
    13: 72,
    14: 92,
    15: 114,
    16: 134,
  },
  transform: {
    1: 'uppercase',
    2: 'none',
  },
  weight: {
    1: '300',    // Light
    2: '400',    // Regular
    3: '500',    // Medium
    4: '600',    // SemiBold
    5: '700',    // Bold
    6: '800',    // ExtraBold
    7: '900',    // Black
  },
  color: {
    1: '$color',
    2: '$textMuted',
  },
  letterSpacing: {
    1: 0,
    2: -0.5,
  },
  lineHeight: {
    1: 1.2,
    2: 1.4,
    3: 1.6,
  },
  // Map font weights to actual font files từ config
  face: {
    300: { normal: fontFamily.inter.light },
    400: { normal: fontFamily.inter.regular },
    500: { normal: fontFamily.inter.medium },
    600: { normal: fontFamily.inter.semiBold },
    700: { normal: fontFamily.inter.bold },
    800: { normal: fontFamily.inter.extraBold },
    900: { normal: fontFamily.inter.black },
  },
})

const interFont = createInterFont()

const fonts = {
  heading: interFont,
  body: interFont,
}

// Create animations
const animations = createAnimations({
  fast: {
    type: 'spring',
    damping: 20,
    mass: 1.2,
    stiffness: 250,
  },
  medium: {
    type: 'spring',
    damping: 10,
    mass: 0.9,
    stiffness: 100,
  },
  slow: {
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
})

// Create the Tamagui config
const tamaguiConfig = createTamagui({
  animations,
  defaultTheme: 'light',
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
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
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  },
})

export type AppConfig = typeof tamaguiConfig
export default tamaguiConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}
