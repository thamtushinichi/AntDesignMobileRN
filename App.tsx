/**
 * AntDesignMobileRN App with Zustand
 *
 * @format
 */

import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Provider as AntProvider } from '@ant-design/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import {
  useThemeStore,
  useSyncSystemTheme,
  selectAntTheme,
} from './src/store/zustand';

// Themed App component that uses the theme store
const ThemedApp = () => {
  // Use the theme from Zustand store instead of context
  const antTheme = useThemeStore(selectAntTheme);
// For debugging
  // Sync system theme changes
  useSyncSystemTheme();

  return (
    <AntProvider theme={antTheme}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AntProvider>
  );
};

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaProvider>
        <ThemedApp />
      </SafeAreaProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
