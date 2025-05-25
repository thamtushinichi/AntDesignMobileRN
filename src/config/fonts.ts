// src/config/fonts.ts

// Font family mapping for React Native
export const fontFamily = {
  inter: {
    // Sử dụng tên file chính xác từ Inter font
    thin: 'Inter-Thin',
    extraLight: 'Inter-ExtraLight',
    light: 'Inter-Light',
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semiBold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
    extraBold: 'Inter-ExtraBold',
    black: 'Inter-Black',
  },
};

// Font weights mapping với tên file thực tế
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
} as const;

// Helper function để get font family theo weight
export const getFontFamily = (weight: keyof typeof fontWeights = 400) => {
  return fontWeights[weight] || fontFamily.inter.regular;
};

// Export cho Tamagui config
export const interFontFaces = {
  100: { normal: fontFamily.inter.thin },
  200: { normal: fontFamily.inter.extraLight },
  300: { normal: fontFamily.inter.light },
  400: { normal: fontFamily.inter.regular },
  500: { normal: fontFamily.inter.medium },
  600: { normal: fontFamily.inter.semiBold },
  700: { normal: fontFamily.inter.bold },
  800: { normal: fontFamily.inter.extraBold },
  900: { normal: fontFamily.inter.black },
};
