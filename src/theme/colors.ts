import { palette } from './tokens';

export type ThemeColors = {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  success: string;
  successLight: string;
  successDark: string;
  warning: string;
  warningLight: string;
  warningDark: string;
  error: string;
  errorLight: string;
  errorDark: string;
  info: string;
  infoLight: string;
  infoDark: string;
  background: string;
  backgroundSecondary: string;
  backgroundTertiary: string;
  card: string;
  cardSecondary: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  textInverted: string;
  border: string;
  borderLight: string;
  borderSecondary: string;
  notification: string;
  placeholder: string;
  disabled: string;
  divider: string;
  focus: string;
  overlay: string;
};

const lightColors: ThemeColors = {
  // Primary colors
  primary: palette.blue[6],
  primaryLight: palette.blue[5],
  primaryDark: palette.blue[7],

  // Secondary colors
  secondary: palette.cyan[6],
  secondaryLight: palette.cyan[5],
  secondaryDark: palette.cyan[7],

  // Status colors
  success: palette.green[6],
  successLight: palette.green[5],
  successDark: palette.green[7],

  warning: palette.yellow[6],
  warningLight: palette.yellow[5],
  warningDark: palette.yellow[7],

  error: palette.red[6],
  errorLight: palette.red[5],
  errorDark: palette.red[7],

  info: palette.cyan[6],
  infoLight: palette.cyan[5],
  infoDark: palette.cyan[7],

  // Background
  background: palette.gray[1],
  backgroundSecondary: palette.gray[2],
  backgroundTertiary: palette.gray[3],

  // Surface
  card: palette.gray[1],
  cardSecondary: palette.gray[2],

  // Text
  text: palette.gray[13],
  textSecondary: palette.gray[8],
  textTertiary: palette.gray[7],
  textInverted: palette.gray[1],

  // Border
  border: palette.gray[5],
  borderLight: palette.gray[4],
  borderSecondary: palette.gray[6],

  // Others
  notification: palette.blue[6],
  placeholder: palette.gray[6],
  disabled: palette.gray[5],
  divider: palette.gray[4],
  focus: palette.blue[3],
  overlay: 'rgba(0, 0, 0, 0.5)',
};

const darkColors: ThemeColors = {
  // Primary colors
  primary: palette.blue[5],
  primaryLight: palette.blue[4],
  primaryDark: palette.blue[6],

  // Secondary colors
  secondary: palette.cyan[5],
  secondaryLight: palette.cyan[4],
  secondaryDark: palette.cyan[6],

  // Status colors
  success: palette.green[5],
  successLight: palette.green[4],
  successDark: palette.green[6],

  warning: palette.yellow[5],
  warningLight: palette.yellow[4],
  warningDark: palette.yellow[6],

  error: palette.red[5],
  errorLight: palette.red[4],
  errorDark: palette.red[6],

  info: palette.cyan[5],
  infoLight: palette.cyan[4],
  infoDark: palette.cyan[6],

  // Background
  background: palette.gray[12],
  backgroundSecondary: palette.gray[11],
  backgroundTertiary: palette.gray[10],

  // Surface
  card: palette.gray[11],
  cardSecondary: palette.gray[10],

  // Text
  text: palette.gray[1],
  textSecondary: palette.gray[3],
  textTertiary: palette.gray[5],
  textInverted: palette.gray[13],

  // Border
  border: palette.gray[9],
  borderLight: palette.gray[8],
  borderSecondary: palette.gray[7],

  // Others
  notification: palette.blue[5],
  placeholder: palette.gray[7],
  disabled: palette.gray[8],
  divider: palette.gray[9],
  focus: palette.blue[6],
  overlay: 'rgba(0, 0, 0, 0.7)',
};

const colors = {
  light: lightColors,
  dark: darkColors,
};

export default colors;
