const fontSizes = {
  tiny: 10,
  small: 12,
  regular: 14,
  medium: 16,
  large: 18,
  xlarge: 20,
  xxlarge: 24,
  xxxlarge: 30,
};

const fontWeights = {
  thin: '100' as const,
  ultraLight: '200' as const,
  light: '300' as const,
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  heavy: '800' as const,
  black: '900' as const,
};

const fonts = {
  sizes: fontSizes,
  weights: fontWeights,
};

export default fonts;
