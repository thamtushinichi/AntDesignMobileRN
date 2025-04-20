import React, {createContext, useContext, useState, ReactNode} from 'react';
import {useColorScheme} from 'react-native';
import colors from '../../theme/colors';

export type ThemeType = 'light' | 'dark' | 'system';

type ThemeContextType = {
  theme: ThemeType;
  isDarkMode: boolean;
  colors: typeof colors.light;
  setTheme: (theme: ThemeType) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({children}: {children: ReactNode}) => {
  const colorScheme = useColorScheme();
  const [themeType, setThemeType] = useState<ThemeType>('system');

  const isDarkMode =
    themeType === 'system'
      ? colorScheme === 'dark'
      : themeType === 'dark';

  const themeColors = isDarkMode ? colors.dark : colors.light;

  const setTheme = (theme: ThemeType) => {
    setThemeType(theme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: themeType,
        isDarkMode,
        colors: themeColors,
        setTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
