/**
 * Tamagui React Native App
 *
 * @format
 */

import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { useThemeStore, useSyncSystemTheme, selectIsDarkMode } from './src/store/zustand';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TamaguiProvider, Theme } from 'tamagui';
import config from './src/tamagui.config';
import { ToastProvider, toastService } from './src/components/ui';

// Themed App component that uses the theme store
const ThemedApp = () => {
  // Use the theme from Zustand store
  const isDarkMode = useThemeStore(selectIsDarkMode);

  // Sync system theme changes
  useSyncSystemTheme();

  // Ref for toast provider to be used by toast service
  const setToastProviderRef = (provider: any) => {
    toastService.setProvider(provider);
  };

  return (
    <Theme name={isDarkMode ? 'dark' : 'light'}>
      <ToastProvider ref={setToastProviderRef} position="top">
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ToastProvider>
    </Theme>
  );
};

function App(): React.JSX.Element {
  // Set TAMAGUI_TARGET environment variable for optimization
  useEffect(() => {
    process.env.TAMAGUI_TARGET = 'native';
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider style={styles.container}>
        <TamaguiProvider config={config}>
          <ThemedApp />
        </TamaguiProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
