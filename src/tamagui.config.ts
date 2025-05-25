// src/tamagui.config.ts - 100% Compatible Version
import {createTamagui} from 'tamagui'
import {shorthands} from '@tamagui/shorthands'
import {themes, tokens} from '@tamagui/themes'
import {createAnimations} from '@tamagui/animations-react-native'
import {Platform} from 'react-native'

// Color system
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

// Compatible tokens with proper defaults
const customTokens = {
  ...tokens,
  color: {
    ...tokens.color,
    primary: colors.primary[500],
    primaryHover: colors.primary[600],
    primaryActive: colors.primary[700],
    primaryLight: colors.primary[100],
    primaryDark: colors.primary[800],

    success: colors.semantic.success,
    warning: colors.semantic.warning,
    error: colors.semantic.error,
    info: colors.semantic.info,

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
    true: 16, // Required default
    0: 0, 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 7: 28, 8: 32,
    9: 36, 10: 40, 12: 48, 16: 64, 20: 80, 24: 96,
    xxs: 2, xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48, xxxl: 64,
  },
  size: {
    ...tokens.size,
    true: 16, // Required default
    0: 0, 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 7: 28, 8: 32,
    9: 36, 10: 40, 11: 44, 12: 48, 14: 56, 16: 64, 20: 80, 24: 96,
    xxs: 12, xs: 16, sm: 20, md: 24, lg: 32, xl: 40, xxl: 48,
  },
  radius: {
    ...tokens.radius,
    true: 4, // Required default
    0: 0, 1: 2, 2: 4, 3: 6, 4: 8, 5: 12, 6: 16, 7: 20, 8: 24,
    xs: 2, sm: 4, md: 6, lg: 8, xl: 12, xxl: 16, round: 999, full: 9999,
  },
  zIndex: {
    ...tokens.zIndex,
    true: 0, // Required default
    0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 10: 10, 20: 20, 30: 30,
    base: 0, dropdown: 1000, sticky: 1100, overlay: 1300, modal: 1400,
    popover: 1500, toast: 1600, tooltip: 1700,
  }
}

// Font configuration - Start with system fonts for compatibility
const createCompatibleFont = (customFontName?: string) => {
  // Determine font family based on platform and availability
  const getFontFamily = (weight: string) => {
    if (customFontName && Platform.OS === 'ios') {
      return customFontName;
    }
    if (customFontName && Platform.OS === 'android') {
      return customFontName;
    }
    // Fallback to system fonts
    return Platform.select({
      ios: 'System',
      android: 'sans-serif',
      default: 'System'
    });
  };

  return {
    family: {
      // Map font weights to actual font families
      100: getFontFamily('thin'),
      200: getFontFamily('extraLight'),
      300: getFontFamily('light'),
      400: getFontFamily('regular'),
      500: getFontFamily('medium'),
      600: getFontFamily('semiBold'),
      700: getFontFamily('bold'),
      800: getFontFamily('extraBold'),
      900: getFontFamily('black'),

      // Required for compatibility
      true: getFontFamily('regular'),
    },
    size: {
      // Numeric scale
      1: 11, 2: 12, 3: 13, 4: 14, 5: 16, 6: 18, 7: 20, 8: 24,
      9: 30, 10: 36, 11: 48, 12: 60, 13: 72, 14: 96, 15: 128, 16: 144,

      // Required default
      true: 14,

      // Token-based sizes
      xs: 11, sm: 12, md: 14, lg: 16, xl: 18, '2xl': 20, '3xl': 24,
      '4xl': 30, '5xl': 36, '6xl': 48, '7xl': 60, '8xl': 72, '9xl': 96,
    },
    weight: {
      // Numeric weights
      1: '100', 2: '200', 3: '300', 4: '400', 5: '500',
      6: '600', 7: '700', 8: '800', 9: '900',

      // Required default
      true: '400',

      // Named weights
      thin: '100', extraLight: '200', light: '300', normal: '400',
      regular: '400', medium: '500', semiBold: '600', bold: '700',
      extraBold: '800', black: '900',
    },
    letterSpacing: {
      1: -0.025, 2: 0, 3: 0.025, 4: 0.05, 5: 0.1,
      true: 0, // Required default
      tight: -0.025, normal: 0, wide: 0.025, wider: 0.05, widest: 0.1,
    },
    lineHeight: {
      1: 1, 2: 1.25, 3: 1.375, 4: 1.5, 5: 1.625, 6: 2,
      true: 1.5, // Required default
      none: 1, tight: 1.25, snug: 1.375, normal: 1.5, relaxed: 1.625, loose: 2,
    },
    transform: {
      0: 'none', 1: 'uppercase', 2: 'lowercase', 3: 'capitalize',
      true: 'none', // Required default
    },

    // CRITICAL: Face mapping for Android font weights
    ...(Platform.OS === 'android' && customFontName && {
      face: {
        400: {normal: customFontName},
        500: {normal: customFontName},
        600: {normal: customFontName},
        700: {normal: customFontName},
      }
    }),
  };
};

// Create fonts - Start with system fonts for guaranteed compatibility
const fonts = {
  // Use system fonts initially - these will always work
  heading: createCompatibleFont(),
  body: createCompatibleFont(),
  mono: createCompatibleFont(),
};

// Enhanced themes
const customThemes = {
  light: {
    ...themes.light,
    background: '#FFFFFF',
    backgroundHover: colors.gray[50],
    backgroundPress: colors.gray[100],
    backgroundFocus: colors.gray[50],
    backgroundStrong: colors.gray[900],
    backgroundTransparent: 'rgba(255,255,255,0)',

    color: colors.gray[900],
    colorHover: colors.gray[800],
    colorPress: colors.gray[700],
    colorFocus: colors.gray[800],
    colorTransparent: 'rgba(0,0,0,0)',

    borderColor: colors.gray[300],
    borderColorHover: colors.gray[400],
    borderColorPress: colors.gray[500],
    borderColorFocus: colors.primary[500],

    primary: colors.primary[500],
    primaryHover: colors.primary[600],
    primaryPress: colors.primary[700],
    primaryFocus: colors.primary[500],

    secondary: colors.gray[100],
    secondaryHover: colors.gray[200],
    secondaryPress: colors.gray[300],
    secondaryFocus: colors.gray[100],

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

    textPrimary: colors.gray[900],
    textSecondary: colors.gray[600],
    textMuted: colors.gray[500],
    textDisabled: colors.gray[400],
    textLight: colors.gray[400],

    card: '#FFFFFF',
    cardHover: colors.gray[50],

    shadowColor: 'rgba(0,0,0,0.1)',
    shadowColorStrong: 'rgba(0,0,0,0.2)',
  },
  dark: {
    ...themes.dark,
    background: '#000000',
    backgroundHover: colors.gray[800],
    backgroundPress: colors.gray[700],
    backgroundFocus: colors.gray[800],
    backgroundStrong: colors.gray[100],
    backgroundTransparent: 'rgba(0,0,0,0)',

    color: colors.gray[100],
    colorHover: colors.gray[200],
    colorPress: colors.gray[300],
    colorFocus: colors.gray[200],
    colorTransparent: 'rgba(255,255,255,0)',

    borderColor: colors.gray[700],
    borderColorHover: colors.gray[600],
    borderColorPress: colors.gray[500],
    borderColorFocus: colors.primary[500],

    primary: colors.primary[400],
    primaryHover: colors.primary[300],
    primaryPress: colors.primary[500],
    primaryFocus: colors.primary[400],

    secondary: colors.gray[800],
    secondaryHover: colors.gray[700],
    secondaryPress: colors.gray[600],
    secondaryFocus: colors.gray[800],

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

    textPrimary: colors.gray[100],
    textSecondary: colors.gray[400],
    textMuted: colors.gray[500],
    textDisabled: colors.gray[600],
    textLight: colors.gray[600],

    card: colors.gray[900],
    cardHover: colors.gray[800],

    shadowColor: 'rgba(0,0,0,0.3)',
    shadowColorStrong: 'rgba(0,0,0,0.5)',
  }
}

// Animations
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
})

// Create Tamagui config - Fully compatible
const tamaguiConfig = createTamagui({
  animations,
  defaultTheme: 'light',
  shouldAddPrefersColorThemes: false, // Disable for RN compatibility
  themeClassNameOnRoot: false, // Required for React Native
  shorthands,
  fonts,
  themes: customThemes,
  tokens: customTokens,
  media: {
    xs: {maxWidth: 660},
    sm: {maxWidth: 800},
    md: {maxWidth: 1020},
    lg: {maxWidth: 1280},
    xl: {maxWidth: 1420},
    xxl: {maxWidth: 1600},
    gtXs: {minWidth: 661},
    gtSm: {minWidth: 801},
    gtMd: {minWidth: 1021},
    gtLg: {minWidth: 1281},
    gtXl: {minWidth: 1421},
    short: {maxHeight: 820},
    tall: {minHeight: 821},
    hoverNone: {hover: 'none'},
    pointerCoarse: {pointer: 'coarse'},
  },
  settings: {
    allowedStyleValues: 'somewhat-strict',
    autocompleteSpecificTokens: 'except-special',
    fastSchemeChange: true,
  },
})

export type AppConfig = typeof tamaguiConfig
export default tamaguiConfig

// Tamagui types
declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {
  }
}

// Export utility function to upgrade to custom fonts later
export function upgradeToCustomFonts(fontName: string) {
  console.log(`
🎉 Ready to upgrade to custom fonts!

To use ${fontName} fonts:
1. Ensure font files are properly linked
2. Update font config with: createCompatibleFont('${fontName}')
3. Test on both iOS and Android
4. Verify font weights work correctly

Current setup uses system fonts for maximum compatibility.
  `);
}
