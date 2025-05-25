// src/tamagui.config.ts
import { createTamagui } from 'tamagui'
import { createInterFont } from '@tamagui/font-inter'
import { shorthands } from '@tamagui/shorthands'
import { themes, tokens } from '@tamagui/themes'
import { createAnimations } from '@tamagui/animations-react-native'

// Define our custom colors
const primaryColor = "#0CB5EB"
const primaryColorDark = "#008FC0"
const primaryColorLight = "#50D0FF"

// Create custom themes extending Tamagui's base themes
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

// Customize tokens if needed
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

// Setup fonts
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
  }
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

// Export the config and types
export type AppConfig = typeof tamaguiConfig
export default tamaguiConfig

// Fix the theme type declaration
declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}
