/**
 * Design tokens - based on Ant Design's design system
 * These tokens are the foundation of the theme system
 */

// Spacing tokens
export const spacing = {
  xxs: 2,
  xs: 4,
  s: 8,
  m: 12,
  l: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
  xxxxl: 64,
};

// Border radius
export const borderRadius = {
  none: 0,
  xs: 2,
  s: 4,
  m: 6,
  l: 8,
  xl: 12,
  xxl: 16,
  round: 999,
};

// Typography
export const typography = {
  fontSizes: {
    xs: 10,
    s: 12,
    m: 14,
    l: 16,
    xl: 18,
    xxl: 20,
    xxxl: 24,
    heading1: 28,
    heading2: 24,
    heading3: 20,
    heading4: 18,
    heading5: 16,
  },
  fontWeights: {
    thin: '100',
    extraLight: '200',
    light: '300',
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
    extraBold: '800',
    black: '900',
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    loose: 1.8,
  },
  letterSpacings: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
  },
};

// Animation durations
export const timing = {
  quick: 150,
  normal: 300,
  slow: 450,
};

// Z-index
export const zIndex = {
  base: 0,
  raised: 1,
  dropdown: 1000,
  sticky: 1100,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  toast: 1600,
};

// Opacity
export const opacity = {
  none: 0,
  low: 0.2,
  medium: 0.5,
  high: 0.8,
  full: 1,
};
