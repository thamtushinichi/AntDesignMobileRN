// src/config/fonts.ts

// Font family names - React Native sử dụng tên file không có extension
export const fontFamily = {
  inter: {
    light: 'Inter_18pt-Light',
    regular: 'Inter_18pt-Regular',
    medium: 'Inter_18pt-Medium',
    semiBold: 'Inter_18pt-SemiBold',
    bold: 'Inter_18pt-Bold',
    extraBold: 'Inter_18pt-ExtraBold',
    black: 'Inter_18pt-Black',
  },
};

// Font weights mapping
export const fontWeights = {
  300: fontFamily.inter.light,
  400: fontFamily.inter.regular,
  500: fontFamily.inter.medium,
  600: fontFamily.inter.semiBold,
  700: fontFamily.inter.bold,
  800: fontFamily.inter.extraBold,
  900: fontFamily.inter.black,
} as const;

// Helper function to get font family by weight
export const getFontFamily = (weight: keyof typeof fontWeights = 400) => {
  return fontWeights[weight] || fontFamily.inter.regular;
};
