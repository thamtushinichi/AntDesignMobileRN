/**
 * Design tokens - based on Ant Design's design system
 * These tokens are the foundation of the theme system
 */

// Color palette (based on Ant Design)
export const palette = {
  // Primary colors
  blue: {
    1: '#e6f7ff',
    2: '#bae7ff',
    3: '#91d5ff',
    4: '#69c0ff',
    5: '#40a9ff',
    6: '#1890ff', // Primary color
    7: '#096dd9',
    8: '#0050b3',
    9: '#003a8c',
    10: '#002766',
  },

  // Neutral colors
  gray: {
    1: '#ffffff',
    2: '#fafafa',
    3: '#f5f5f5',
    4: '#f0f0f0',
    5: '#d9d9d9',
    6: '#bfbfbf',
    7: '#8c8c8c',
    8: '#595959',
    9: '#434343',
    10: '#262626',
    11: '#1f1f1f',
    12: '#141414',
    13: '#000000',
  },

  // Status colors
  green: {
    1: '#f6ffed',
    2: '#d9f7be',
    3: '#b7eb8f',
    4: '#95de64',
    5: '#73d13d',
    6: '#52c41a', // Success color
    7: '#389e0d',
    8: '#237804',
    9: '#135200',
    10: '#092b00',
  },

  red: {
    1: '#fff1f0',
    2: '#ffccc7',
    3: '#ffa39e',
    4: '#ff7875',
    5: '#ff4d4f',
    6: '#f5222d', // Error color
    7: '#cf1322',
    8: '#a8071a',
    9: '#820014',
    10: '#5c0011',
  },

  yellow: {
    1: '#fffbe6',
    2: '#fff1b8',
    3: '#ffe58f',
    4: '#ffd666',
    5: '#ffc53d',
    6: '#faad14', // Warning color
    7: '#d48806',
    8: '#ad6800',
    9: '#874d00',
    10: '#613400',
  },

  cyan: {
    1: '#e6fffb',
    2: '#b5f5ec',
    3: '#87e8de',
    4: '#5cdbd3',
    5: '#36cfc9',
    6: '#13c2c2', // Info color
    7: '#08979c',
    8: '#006d75',
    9: '#00474f',
    10: '#002329',
  },
};

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

// Shadows
export const shadows = {
  none: {
    shadowColor: palette.gray[13],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  xs: {
    shadowColor: palette.gray[13],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  s: {
    shadowColor: palette.gray[13],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  m: {
    shadowColor: palette.gray[13],
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  l: {
    shadowColor: palette.gray[13],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },
  xl: {
    shadowColor: palette.gray[13],
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 12,
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
